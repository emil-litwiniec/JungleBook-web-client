<template>
	<section class="plant-details">
		<editable-image
			:img-path="imgPath"
			:plant-id="plantData.id"
			class="plant-details__image"
			@on-image-uploaded="onImageUploaded"
		/>
		<div class="plant-details__info">
			<div class="info__header">
				<editable-component
					:edit-mode="editMode"
					:custom-v-model.sync="plantFormData.name"
					tag="h2"
					class="info__name"
					custom-class="info"
					input-mode="input"
					input-placeholder="Enter Plant Name"
				/>
				<editable-component
					:edit-mode="editMode"
					:custom-v-model.sync="plantFormData.scientific_name"
					tag="h3"
					class="info__scientific-name"
					custom-class="info"
					input-mode="input"
					input-placeholder="Enter Scientific Name"
				/>
			</div>
			<div class="plant-details__content">
				<div class="plant-details__stats-container">
					<div class="info__stats">
						<div class="info__position">
							<component
								:is="`${selectedOption.name}-light-icon`"
								class="info__icon"
							/>
							<dropdown-selection
								v-if="editMode"
								class="info__input"
								@on-select="handleDropdownSelect"
								:options="positionOptions"
								:selectedOption="selectedOption"
							/>
							<span v-else class="info__display">{{
								selectedOption.label
							}}</span>
						</div>
						<div class="info__temperature">
							<full-light-icon class="info__icon" />
							<range-slider
								v-if="editMode"
								:range-values="plantFormData.temperature"
								@updatedValues="handleTemperatureUpdate"
								class="info__input"
								ref="rangeSliderComponent"
							/>
							<span v-else class="info__display"
								>{{ plantFormData.temperature[0] }} -
								{{ plantFormData.temperature[1] }} °C</span
							>
						</div>
					</div>
					<div class="info__days">
						<div class="relative">
							<span>Last watered:</span>
							<span class="days-big">{{
								formatDays(plantData.days_since_last_watering)
							}}</span>
							<div
								v-if="shouldBeWatered"
								class="info__danger-icon"
							>
								<drop-icon color="#eb4a4a" />
							</div>
						</div>
						<div>
							<span>Last dewed:</span>
							<span class="days-big">{{
								formatDays(plantData.days_since_last_dew)
							}}</span>
						</div>
						<div>
							<span>Last fertilized:</span>
							<span class="days-big">25 days</span>
						</div>
						<div class="info__water-interval">
							<span>Water interval (days):</span>
							<editable-component
								:edit-mode="editMode"
								:custom-v-model.sync="
									plantFormData.water_interval
								"
								tag="span"
								class="info__water-interval"
								custom-class="info"
								input-mode="input"
								input-type="number"
								input-placeholder="Enter Water Interval"
							/>
						</div>
					</div>
					<div
						v-show="editMode && !isAddPlantMode"
						class="plant-details__delete-btn"
					>
						<button
							class="button-primary button-primary--transparent"
							@click="handleDelete"
						>
							<!-- <span>Delete</span> -->
							<delete-icon color="red" />
						</button>
					</div>
				</div>
				<div class="plant-details__description">
					<editable-component
						:edit-mode="editMode"
						:custom-v-model.sync="plantFormData.description"
						input-placeholder="Enter Plant Description"
						:text-area="true"
						tag="p"
						class="description"
						custom-class="description"
						input-mode="textarea"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";
import modal from "@/store/modules/modal";

import EditableComponent from "@/components/plantDetails/EditableComponent.vue";
import DropdownSelection from "@/components/common/dropdownSelection/DropdownSelection.vue";

import FullLightIcon from "@/components/misc/icons/FullLightIcon.vue";
import PartialLightIcon from "@/components/misc/icons/PartialLightIcon.vue";
import ShadyLightIcon from "@/components/misc/icons/ShadyLightIcon.vue";
import DropIcon from "@/components/misc/icons/DropIcon.vue";
import DeleteIcon from "@/components/misc/icons/DeleteIcon.vue";

import RangeSliderComponent from "@/components/common/rangeSlider/RangeSliderComponent.vue";
import EditableImage from "@/components/common/editableImage/EditableImage.vue";

import { isEmpty } from "@/utils/utils";
import EventBus, { BusEvents } from "@/utils/EventBus";
import { formatDays, imageStoragePath } from "@/utils/format";
import { positionOptions, emptyPlantFormData } from "@/utils/constants";
import { PlantFormData, Option } from "@/components/types.ts";
import { RangeSlider } from "../common/rangeSlider/rangeSlider";

@Component({
	name: "PlantDetails",
	components: {
		EditableComponent,
		DropdownSelection,
		FullLightIcon,
		PartialLightIcon,
		ShadyLightIcon,
		DropIcon,
		DeleteIcon,
		RangeSlider: RangeSliderComponent,
		EditableImage,
	},
})
export default class PlantDetails extends Vue {
	isAddPlantMode = true;
	positionOptions = positionOptions;
	formatDays = formatDays;
	plantData: any | {} = {};
	plantFormData: PlantFormData = emptyPlantFormData;
	plantId: number | undefined = undefined;

	@Ref("rangeSliderComponent")
	readonly rangeSliderComponent!: RangeSliderComponent;

	@Watch("plantFormData", {
		deep: true,
	})
	handlePlantFormDataChange() {
		const isFormValid = this.isFormDataValid;
		if (settings.isPlantDataFormValid === isFormValid) return;
		settings.SET_IS_PLANT_DATA_FORM_VALID(this.isFormDataValid);
	}

	get isFormDataValid(): boolean {
		return !!this.plantFormData.name;
	}

	get imgPath() {
		return this.plantFormData.avatar_image
			? imageStoragePath(this.plantFormData.avatar_image)
			: undefined;
	}

	get editMode() {
		return settings.isEditMode;
	}

	get selectedOption() {
		return this.positionOptions.find((option) => {
			return option.id === this.plantFormData.positionId;
		});
	}

	get shouldBeWatered() {
		return this.plantData.should_be_watered;
	}

	created() {
		this.resetFormData();
		setTimeout(() => {
			EventBus.$on(
				BusEvents.PLANT_FORM_DATA_ERROR,
				this.handlePlantFormDataError
			);

			EventBus.$on(BusEvents.PLANT_FORM_DATA_SAVE, this.saveFormData);
		}, 500);

		const currentRoute = this.$router.currentRoute;
		this.isAddPlantMode = currentRoute.name === "addPlant";

		settings.setEditMode(this.isAddPlantMode);
		settings.SET_IS_PLANT_DATA_FORM_VALID(false);

		const plantId = this.$router.currentRoute.params.plantId;
		this.plantId = plantId ? Number(plantId) : undefined;
		if (this.plantId === undefined) return;

		this.plantData = user.plantById(this.plantId);
		this.updateFormData();
	}

	beforeDestroy() {
		EventBus.$off(
			BusEvents.PLANT_FORM_DATA_ERROR,
			this.handlePlantFormDataError
		);

		EventBus.$off(BusEvents.PLANT_FORM_DATA_SAVE, this.saveFormData);
	}

	resetFormData() {
		this.plantFormData.name = "";
		this.plantFormData.scientific_name = "";
		this.plantFormData.description = "";
		this.plantFormData.temperature = [0, 35];
		this.plantFormData.positionId = 0;
		this.plantFormData.water_interval = "1";
	}

	updateFormData(): void {
		this.plantFormData = {
			name: this.plantData.name || "",
			scientific_name: this.plantData.scientific_name || "",
			description: this.plantData.description || "",
			temperature: this.plantData.plant_info.temperature || [0, 35],
			positionId:
				positionOptions.find(
					(position) =>
						position.name == this.plantData.plant_info.position
				)?.id || 0,
			water_interval: String(this.plantData.water_interval) || "1",
			avatar_image: this.plantData.avatar_image,
		};
	}

	handleDropdownSelect(optionId: number) {
		this.plantFormData.positionId = optionId;
	}

	handleTemperatureUpdate(values: number[]) {
		this.plantFormData.temperature = values;
	}

	handlePlantFormDataError() {
		modal.SHOW_MODAL({
			componentName: "InfoModal",
			message: "Plant's name can't be empty",
		});
	}

	handleDelete() {
		modal.SHOW_MODAL({
			componentName: "AcceptActionModal",
			message: `Are you sure you want to delete plant?`,
			callbackAction: () => {
				if (!this.plantId) return;
				user.deletePlant(this.plantId);
				this.$router.push("/dashboard");
			},
		});
	}

	onImageUploaded(filename: string) {
		this.plantFormData.avatar_image = filename;
	}

	saveFormData() {
		if (!settings.selectedBookId) return;

		this.plantFormData.temperature = this.rangeSliderComponent.values;

		if (this.isAddPlantMode) {
			user.createPlant({
				book_id: settings.selectedBookId,
				name: this.plantFormData.name,
				scientific_name: this.plantFormData.scientific_name,
				description: this.plantFormData.description,
				avatar_image: this.plantFormData.avatar_image || undefined,
				plant_info: {
					temperature: this.plantFormData.temperature,
					position:
						positionOptions[this.plantFormData.positionId].name,
				},
				water_interval: Number(this.plantFormData.water_interval),
			});
			// TODO: show notification after response or error
		} else {
			if (!this.plantId) return;
			user.updatePlant({
				plant_id: this.plantId,
				name: this.plantFormData.name || undefined,
				scientific_name:
					this.plantFormData.scientific_name || undefined,
				description: this.plantFormData.description || undefined,
				avatar_image: this.plantFormData.avatar_image || undefined,
				plant_info: {
					temperature: this.plantFormData.temperature || undefined,
					position: this.plantFormData.positionId
						? positionOptions[this.plantFormData.positionId].name
						: undefined,
				},
				water_interval: Number(this.plantFormData.water_interval),
			});
		}
	}
}
</script>
