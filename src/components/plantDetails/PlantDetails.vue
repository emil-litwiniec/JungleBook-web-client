<template>
	<section class="plant-details">
		<editable-image :edit-mode="editMode" :img-path="imgPath" class="plant-details__image" />
		<div class="plant-details__info">
			<div class="info__header">
				<editable-component
					:edit-mode="editMode"
					:custom-v-model.sync="plantData.name"
					tag="h2"
					class="info__name"
					custom-class="info"
					input-mode="input"
					input-placeholder="Enter Plant Name"
				/>
				<editable-component
					:edit-mode="editMode"
					:custom-v-model.sync="plantData.scientific_name"
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
								:range-values="tempratureData"
								@updatedValues="handleTemperatureUpdate"
								class="info__input"
							/>
							<span v-else class="info__display">{{tempratureData[0]}} - {{tempratureData[1]}} °C</span>
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
						:custom-v-model.sync="plantData.description"
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
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";
import EditableComponent from "@/components/plantDetails/EditableComponent.vue";
import { formatDays } from "@/utils/format";
import DropdownSelection, {
	Option,
} from "@/components/common/dropdownSelection/DropdownSelection.vue";

import FullLightIcon from "@/components/misc/icons/FullLightIcon.vue";
import PartialLightIcon from "@/components/misc/icons/PartialLightIcon.vue";
import ShadyLightIcon from "@/components/misc/icons/ShadyLightIcon.vue";
import RangeSliderComponent from "@/components/common/rangeSlider/RangeSliderComponent.vue";
import EditableImage from "@/components/common/editableImage/EditableImage.vue";

const emptyPlantDetails = {
	name: "",
	scientific_name: "",
	details: "",
};

// TODO: move constants to separate file
const positionOptions = [
	{
		name: "full",
		label: "Full Sun",
		id: 0,
	},
	{
		name: "partial",
		label: "Partial Sun",
		id: 1,
	},
	{
		name: "shady",
		label: "Shady",
		id: 2,
	},
];

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
	plantData: any = emptyPlantDetails;
	positionOptions = positionOptions;
	selectedOptionId = 0;
	formatDays = formatDays;
	tempratureData: number[] = [0, 35];

	created() {
		const currentRoute = this.$router.currentRoute;
		this.isAddPlantMode = currentRoute.name === "addPlant";
		this.populatePlantData();

		settings.SET_EDIT_MODE(this.isAddPlantMode);
	}

	populatePlantData() {
		if (this.isAddPlantMode) {
			this.plantData = emptyPlantDetails;
		} else {
			const plantId = Number(this.$router.currentRoute.params.plantId);
			this.plantData = user.plantById(plantId);
		}
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

	handleDropdownSelect(optionId: number) {
		this.selectedOptionId = optionId;
	}

	handleTemperatureUpdate(values: number[]) {
		this.tempratureData = values;
	}
}
</script>
