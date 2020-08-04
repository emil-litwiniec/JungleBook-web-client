<template>
	<transition-group name="fade-group" tag="div" class="exposition exposition--small-tile">
		<div class="tile" v-for="plant in plants" :key="uniqueKey(plant.id)">
			<div class="tile__image">
				<img :src="imgPath" alt="Plant image" />
			</div>
			<div class="tile__content">
				<div class="tile__stats">
					<div class="tile__alerts"></div>
					<div class="tile__days">
						<div>
							<span>Last watered:</span>
							<span class="big">{{daysSince(plant.days_since_last_watering)}}</span>
						</div>
						<div>
							<span>Last dewed:</span>
							<span class="big">{{daysSince(plant.days_since_last_dew)}}</span>
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
import LineSeparator from "@/components/misc/LineSeperator.vue";

@Component({
	name: "SmallTileExposition",
	components: {
		ProfileIcon,
		LineSeparator,
	},
})
export default class SmallTileExposition extends Vue {
	@Prop({ default: [] }) readonly plants!: Plant[];

	get imgPath() {
		return require("@/assets/img/mock-plant-2.jpg");
	}

	daysSince(days: number | null) {
		switch (days) {
			case null:
				return "n/a";
			case 1:
				return "1 day";
			default:
				return `${days} days`;
		}
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

	uniqueKey() {
		return uuidv4();
	}
}
</script>
