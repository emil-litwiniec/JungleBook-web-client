<template>
	<section class="dashboard-exposition">
		<h3>{{currentBook.name}}</h3>
		<h4>{{currentBook.description}}</h4>
		<component :is="currentViewComponent" v-bind="viewProps" />
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import settings, { DashboardViews } from "@/store/modules/settings";
import user from "@/store/modules/user";
import BigTileExposition from "@/components/dashboard/dashboardExposition/expositionVariants/BigTileExposition.vue";
import SmallTileExposition from "@/components/dashboard/dashboardExposition/expositionVariants/SmallTileExposition.vue";
import ListExposition from "@/components/dashboard/dashboardExposition/expositionVariants/ListExposition.vue";

@Component({
	name: "DashboardExposition",
	components: {
		SmallTileExposition,
		BigTileExposition,
		ListExposition,
	},
})
export default class DashboardExposition extends Vue {
	get activeView() {
		return settings.dashboardViewMode;
	}

	get currentBook() {
		return user.currentBook;
	}

	get currentViewComponent() {
		switch (this.activeView) {
			case DashboardViews.SMALL_TILE:
				return "small-tile-exposition";
			case DashboardViews.BIG_TILE:
				return "big-tile-exposition";
			case DashboardViews.LIST:
				return "list-exposition";
			default:
				return "small-tile-exposition";
		}
	}

	get viewProps() {
		return { plants: user.currentBookPlants };
	}
}
</script>
