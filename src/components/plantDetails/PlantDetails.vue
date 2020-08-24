<template>
	<section class="plant-details">
		<editable-image :img-path="imgPath" :plant-id="plantData.id" class="plant-details__image" />
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
							<component :is="`${selectedOption.name}-light-icon`" class="info__icon" />
							<dropdown-selection
								v-if="editMode"
								class="info__input"
								@on-select="handleDropdownSelect"
								:options="positionOptions"
								:selectedOption="selectedOption"
							/>
							<span v-else class="info__display">{{selectedOption.label}}</span>
						</div>

						<div class="info__temperature">
							<full-light-icon class="info__icon" />
							<range-slider
								v-if="editMode"
								:range-values="temperatureData"
								@updatedValues="handleTemperatureUpdate"
								class="info__input"
							/>
							<span v-else class="info__display">{{temperatureData[0]}} - {{temperatureData[1]}} °C</span>
						</div>
					</div>
					<div class="info__days">
						<div>
							<span>Last watered:</span>
							<span class="days-big">{{formatDays(plantData.days_since_last_watering)}}</span>
						</div>
						<div>
							<span>Last dewed:</span>
							<span class="days-big">{{formatDays(plantData.days_since_last_dew)}}</span>
						</div>
						<div>
							<span>Last fertilized:</span>
							<span class="days-big">25 days</span>
						</div>
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
import EditableComponent from "@/components/plantDetails/EditableComponent.vue";
import { formatDays } from "@/utils/format";
import DropdownSelection from "@/components/common/dropdownSelection/DropdownSelection.vue";

import FullLightIcon from "@/components/misc/icons/FullLightIcon.vue";
import PartialLightIcon from "@/components/misc/icons/PartialLightIcon.vue";
import ShadyLightIcon from "@/components/misc/icons/ShadyLightIcon.vue";
import RangeSliderComponent from "@/components/common/rangeSlider/RangeSliderComponent.vue";
import EditableImage from "@/components/common/editableImage/EditableImage.vue";

import { isEmpty } from "@/utils/utils";
import EventBus, { BusEvents } from "@/utils/EventBus";
import modal from "@/store/modules/modal";
import { positionOptions, emptyPlantFormData } from "@/utils/constants";
import { PlantFormData, Option } from "@/components/types";

@Component({
	name: "PlantDetails",
	components: {
		EditableComponent,
		DropdownSelection,
		FullLightIcon,
		PartialLightIcon,
		ShadyLightIcon,
		RangeSlider: RangeSliderComponent,
		EditableImage,
	},
})
export default class PlantDetails extends Vue {
	isAddPlantMode = true;
	positionOptions = positionOptions;
	selectedOptionId = 0;
	formatDays = formatDays;
	temperatureData: number[] = [0, 35];
	plantData: any | {} = {};
	plantFormData: PlantFormData = emptyPlantFormData;
	plantId: number | undefined = undefined;

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
		return "https://cdn.gardenista.com/wp-content/uploads/2015/04/fields/bed_monstera_erinboyle_gardenista.jpg";
	}

	get editMode() {
		return settings.isEditMode;
	}

	get selectedOption() {
		return this.positionOptions.find((option) => {
			return option.id === this.selectedOptionId;
		});
	}

	created() {
		setTimeout(() => {
			EventBus.$on(
				BusEvents.PLANT_FORM_DATA_ERROR,
				this.handlePlantFormDataError
			);
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
		if (this.isAddPlantMode) {
			this.resetFormData();
		}

		EventBus.$off(
			BusEvents.PLANT_FORM_DATA_ERROR,
			this.handlePlantFormDataError
		);
	}

	resetFormData() {
		this.plantFormData.name = "";
		this.plantFormData.scientific_name = "";
		this.plantFormData.description = "";
	}

	updateFormData(): void {
		if (isEmpty(this.plantData)) return;
		this.plantFormData = {
			name: this.plantData.name,
			scientific_name: this.plantData.scientific_name,
			description: this.plantData.description,
			temperature: this.plantData.temperature,
			positionId: this.plantData.position,
		};
	}

	handleDropdownSelect(optionId: number) {
		this.selectedOptionId = optionId;
	}

	handleTemperatureUpdate(values: number[]) {
		this.temperatureData = values;
	}

	handlePlantFormDataError() {
		modal.SHOW_MODAL("InvalidFormModal");
	}
}
</script>
