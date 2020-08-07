<template>
	<section class="plant-details">
		<div class="plant-details__image">
			<img v-if="!isAddPlantMode" :src="imgPath" alt="Plant image" />
		</div>
		<div class="plant-details__info">
			<div class="info__header">
				<editable-component
					:edit-mode="editMode"
					:custom-v-model.sync="plantData.name"
					tag="h2"
					input-placeholder="Enter Plant Name"
				/>
				<editable-component
					:edit-mode="editMode"
					:custom-v-model.sync="plantData.scientific_name"
					tag="h3"
					input-placeholder="Enter Scientific Name"
				/>
			</div>
			<div class="info__stats"></div>
			<div class="info__days">
				<div>
					<span>Last watered:</span>
					<span class="big">{{formatDays(plant.days_since_last_watering)}}</span>
				</div>
				<div>
					<span>Last dewed:</span>
					<span class="big">{{formatDays(plant.days_since_last_dew)}}</span>
				</div>
				<div>
					<span>Last fertilized:</span>
					<span class="big">25 days</span>
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
			/>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";
import EditableComponent from "@/components/plantDetails/EditableComponent.vue";
import { formatDays } from "@/utils/format";

const emptyPlantDetails = {
	name: "",
	scientific_name: "",
};

@Component({
	name: "PlantDetails",
	components: {
		EditableComponent,
	},
})
export default class PlantDetails extends Vue {
	isAddPlantMode = true;
	plantData: any = emptyPlantDetails;
	editMode = true;

	formatDays = formatDays;

	created() {
		const currentRoute = this.$router.currentRoute;
		this.isAddPlantMode = currentRoute.name === "addPlant";
		this.populatePlantData();
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
		return require("@/assets/img/mock-plant-2.jpg");
	}
}
</script>
