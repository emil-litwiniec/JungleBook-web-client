<template>
	<section class="dashboard-exposition">
		<h3>{{currentBook.name}}</h3>
		<h4>{{currentBook.description}}</h4>
		<transition-group
			name="fade-group"
			tag="div"
			class="exposition"
			:class="`exposition--${currentViewComponent}`"
		>
			<component
				:is="currentViewComponent"
				v-for="plant in mappedPlants"
				:key="uniqueKey(plant.id)"
				:plant="plant"
			/>
		</transition-group>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import settings, { DashboardViews } from "@/store/modules/settings";
import user from "@/store/modules/user";
import SmallTile from "@/components/dashboard/dashboardExposition/SmallTile.vue";
const uuidv4 = require("uuid").v4;

@Component({
	name: "DashboardExposition",
	components: {
		SmallTile,
	},
})
export default class DashboardExposition extends Vue {
	get currentBook() {
		return user.currentBook;
	}

	get activeView() {
		return settings.dashboardViewMode;
	}

	get currentViewComponent() {
		switch (this.activeView) {
			case DashboardViews.SMALL_TILE:
				return "small-tile";
			case DashboardViews.BIG_TILE:
				return "big-tile";
			case DashboardViews.LIST:
				return "list";
			default:
				return "small-tile";
		}
	}

	get plants() {
		return user.currentBookPlants;
	}

	get mappedPlants() {
		const mappedPlants = this.plants.map((plant: any) => ({
			...plant,
			type: "regular",
		}));
		mappedPlants.push({ type: "addPlant" });
		return mappedPlants;
	}

	uniqueKey() {
		return uuidv4();
	}
}
</script>
