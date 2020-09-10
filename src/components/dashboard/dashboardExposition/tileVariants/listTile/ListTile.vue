<template>
	<div>
		<div
			class="list-tile"
			:class="{'margin-top-medium': plant.type === 'addPlant', 'danger': shouldBeWatered}"
		>
			<template v-if="plant.type === 'regular'">
				<div class="list-tile__check-box" :class="{'show': isSelectionMode}">
					<check-box :custom-v-model.sync="isSelected" />
				</div>
				<div class="list-tile__headers">
					<h4>{{plant.name}}</h4>
					<h5>{{plant.scientific_name}}</h5>
				</div>
				<div class="list-tile__content">
					<div v-if="shouldBeWatered" class="list-tile__danger-icon">
						<drop-icon />
					</div>
					<div class="list-tile__stats">
						<div class="list-tile__alerts"></div>
						<div class="list-tile__days">
							<div>
								<span>Last watered:</span>
								<span class="days-big">{{formatDays(plant.days_since_last_watering)}}</span>
							</div>
							<div>
								<span>Last dewed:</span>
								<span class="days-big">{{formatDays(plant.days_since_last_dew)}}</span>
							</div>
						</div>
					</div>

					<div class="list-tile__menu">
						<button class="list-tile__button-block" @click="handleButtonDew(plant.id)">
							<div class="list-tile__button-container">
								<span>Dew</span>
								<profile-icon color="#000000" />
							</div>
						</button>
						<line-separator />
						<button class="list-tile__button-block" @click="handleButtonWater(plant.id)">
							<div class="list-tile__button-container">
								<span>Water</span>
								<profile-icon color="#000000" />
							</div>
						</button>
						<line-separator />
						<button class="list-tile__button-block" @click="handleButtonDetails(plant.id)">
							<div class="list-tile__button-container">
								<span>Details</span>
								<profile-icon color="#000000" />
							</div>
						</button>
					</div>
				</div>
			</template>
			<template v-if="plant.type === 'addPlant'">
				<div
					class="list-tile list-tile--add-plant"
					style="transition: nune !important;"
					@click="handleAddPlant"
					:key="addPlantKey"
				>
					<span>Add new plant</span>
					<plus-icon />
				</div>
			</template>
		</div>
		<line-separator v-if="plant.type === 'regular'" :is-horizontal="true" />
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import ProfileIcon from "@/components/misc/icons/ProfileIcon.vue";
import DropIcon from "@/components/misc/icons/DropIcon.vue";
import PlusIcon from "@/components/misc/icons/PlusIcon.vue";
import LineSeparator from "@/components/misc/LineSeperator.vue";

import TileBase from "@/components/dashboard/dashboardExposition/tileVariants/TileBase";
import CheckBox from "@/components/common/checkBox/CheckBox.vue";

@Component({
	name: "ListTile",
	components: {
		ProfileIcon,
		PlusIcon,
		DropIcon,
		LineSeparator,
		CheckBox,
	},
})
export default class ListTile extends TileBase {}
</script>
