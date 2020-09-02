<template>
	<section class="dashboard-exposition">
		<h3>{{currentBook.name}}</h3>
		<h4>{{currentBook.description}}</h4>
		<transition name="fade" mode="out-in">
			<component :is="`${currentViewComponent}-exposition`" />
		</transition>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import settings, { DashboardViews } from "@/store/modules/settings";
import user from "@/store/modules/user";

import SmallTileExposition from "@/components/dashboard/dashboardExposition/tileVariants/smallTile/SmallTileExposition.vue";
import BigTileExposition from "@/components/dashboard/dashboardExposition/tileVariants/bigTile/BigTileExposition.vue";
import ListTileExposition from "@/components/dashboard/dashboardExposition/tileVariants/listTile/ListTileExposition.vue";
const uuidv4 = require("uuid").v4;

@Component({
	name: "DashboardExposition",
	components: {
		SmallTileExposition,
		BigTileExposition,
		ListTileExposition,
	},
})
export default class DashboardExposition extends Vue {
	get currentBook() {
		if (!user.currentBook) return {};
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
			case DashboardViews.LIST_TILE:
				return "list-tile";
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
