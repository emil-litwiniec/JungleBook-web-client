<template>
	<transition-group name="fade-group" tag="div" class="exposition exposition--small-tile">
		<div class="tile" v-for="plant in mappedPlants" :key="uniqueKey(plant.id)">
			<template v-if="plant.type === 'regular'">
				<div class="tile__image">
					<img :src="imgPath" alt="Plant image" />
				</div>
				<div class="tile__content">
					<div class="tile__stats">
						<div class="tile__alerts"></div>
						<div class="tile__days">
							<div>
								<span>Last watered:</span>
								<span class="big">{{formatDays(plant.days_since_last_watering)}}</span>
							</div>
							<div>
								<span>Last dewed:</span>
								<span class="big">{{formatDays(plant.days_since_last_dew)}}</span>
							</div>
						</div>
					</div>
					<div class="tile__headers">
						<h4>{{plant.name}}</h4>
						<h5>{{plant.scientific_name}}</h5>
					</div>
				</div>
				<div class="tile__menu">
					<button class="tile__button-block" @click="handleButtonDew(plant.id)">
						<div class="tile__button-container">
							<span>Dew</span>
							<profile-icon color="#000000" />
						</div>
					</button>
					<line-separator />
					<button class="tile__button-block" @click="handleButtonWater(plant.id)">
						<div class="tile__button-container">
							<span>Water</span>
							<profile-icon color="#000000" />
						</div>
					</button>
					<line-separator />
					<button class="tile__button-block" @click="handleButtonDetails(plant.id)">
						<div class="tile__button-container">
							<span>Details</span>
							<profile-icon color="#000000" />
						</div>
					</button>
				</div>
			</template>
			<template v-if="plant.type === 'addPlant'">
				<div
					class="tile tile--add-plant"
					style="transition: nune !important;"
					@click="handleAddPlant"
					:key="addPlantKey"
				>
					<span>Add new plant</span>
					<plus-icon />
				</div>
			</template>
		</div>
	</transition-group>
</template>

<script lang="ts">
const uuidv4 = require("uuid").v4;
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

import settings, { DashboardViews } from "@/store/modules/settings";
import user, { PlantActionType } from "@/store/modules/user";

import { Plant } from "@/api/types.d.ts";

import ProfileIcon from "@/components/misc/icons/ProfileIcon.vue";
import PlusIcon from "@/components/misc/icons/PlusIcon.vue";
import LineSeparator from "@/components/misc/LineSeperator.vue";

import { formatDays } from "@/utils/format";

@Component({
	name: "SmallTileExposition",
	components: {
		ProfileIcon,
		PlusIcon,
		LineSeparator,
	},
})
export default class SmallTileExposition extends Vue {
	addPlantKey = this.uniqueKey();
	formatDays = formatDays;

	@Prop({ default: [] }) readonly plants!: any[];

	get imgPath() {
		return require("@/assets/img/mock-plant-2.jpg");
	}

	get mappedPlants() {
		const mappedPlants = this.plants.map((plant) => ({
			...plant,
			type: "regular",
		}));
		mappedPlants.push({ type: "addPlant" });
		return mappedPlants;
	}

	beforeUpdate() {
		this.addPlantKey = this.uniqueKey();
	}

	handleButtonDew(plantId: number) {
		user.singleActionPlant({
			data: { plant_id: plantId },
			plantActionType: PlantActionType.DEW,
		}).then(() => {
			user.fetchUserData();
		});
	}

	handleButtonWater(plantId: number) {
		user.singleActionPlant({
			data: { plant_id: plantId },
			plantActionType: PlantActionType.WATER,
		}).then(() => {
			user.fetchUserData();
		});
	}

	handleButtonDetails(plantId: number) {
		this.$router.push(`/plant/${plantId}`);
	}

	handleAddPlant() {
		this.$router.push("plant/add");
	}

	uniqueKey() {
		return uuidv4();
	}
}
</script>
