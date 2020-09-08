<template>
	<div class="image-display">
		<img :src="imgPath" alt="Plant image" />
		<div v-if="!isEditMode" class="image-display__menu big-tile__menu">
			<button class="big-tile__button-block" @click="handleButtonDew">
				<div class="big-tile__button-container">
					<span>Dew</span>
					<profile-icon color="#000000" />
				</div>
			</button>
			<line-separator :is-horizontal="true" />
			<button class="big-tile__button-block" @click="handleButtonWater">
				<div class="big-tile__button-container">
					<span>Water</span>
					<profile-icon color="#000000" />
				</div>
			</button>
			<line-separator :is-horizontal="true" />
			<button class="big-tile__button-block" @click="handleButtonFertilize">
				<div class="big-tile__button-container">
					<span>Fertilize</span>
					<profile-icon color="#000000" />
				</div>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import settings from "@/store/modules/settings";
import user, { PlantActionType } from "@/store/modules/user";
import { Loader } from "@/components/types";
import ProfileIcon from "@/components/misc/icons/ProfileIcon.vue";
import LineSeparator from "@/components/misc/LineSeperator.vue";

@Component({
	name: "ImageDisplay",
	components: {
		ProfileIcon,
		LineSeparator,
	},
})
export default class ImageDisplay extends Vue {
	@Prop() imgPath!: string;
	@Prop() plantId!: number;

	handleButtonDew() {
		user.actionPlant({
			data: { plant_ids: [this.plantId] },
			plantActionType: PlantActionType.DEW,
		});
	}

	handleButtonWater() {
		console.log(this.plantId);
		user.actionPlant({
			data: { plant_ids: [this.plantId] },
			plantActionType: PlantActionType.WATER,
		});
	}

	handleButtonFertilize() {
		console.log("handleFertilize");
	}

	get isEditMode() {
		return settings.isEditMode;
	}
}
</script>
