<template>
	<div class="tile" :class="{'tile-selected':isSelected && isSelectionMode}">
		<template v-if="plant.type === 'regular'">
			<check-box-tile
				:custom-v-model.sync="isSelected"
				:class="{'show':isSelected && isSelectionMode}"
				:style="[ isSelectionMode ? {pointerEvents: 'all'} : {pointerEvents: 'none'}]"
			/>
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
			<div class="tile__menu" v-show="!isSelectionMode">
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
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import ProfileIcon from "@/components/misc/icons/ProfileIcon.vue";
import PlusIcon from "@/components/misc/icons/PlusIcon.vue";
import LineSeparator from "@/components/misc/LineSeperator.vue";

import TileBase from "@/components/dashboard/dashboardExposition/tileVariants/TileBase";

import CheckBoxTile from "@/components/common/checkBoxTile/CheckBoxTile.vue";

@Component({
	name: "SmallTile",
	components: {
		ProfileIcon,
		PlusIcon,
		LineSeparator,
		CheckBoxTile,
	},
})
export default class SmallTile extends TileBase {}
</script>
