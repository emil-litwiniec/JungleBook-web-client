<template>
	<div class="view-selection">
		<small-tile-view-icon
			class="view-selection__icon"
			:class="{'active': activeView === dashboardViews.SMALL_TILE }"
			@click.native="setSmallTile"
			color="#C4C4C4"
		/>
		<line-separator />
		<big-tile-view-icon
			class="view-selection__icon"
			:class="{'active': activeView === dashboardViews.BIG_TILE }"
			@click.native="setBigTile"
			color="#C4C4C4"
		/>
		<line-separator />
		<list-view-icon
			class="view-selection__icon"
			:class="{'active': activeView === dashboardViews.LIST }"
			@click.native="setList"
			color="#C4C4C4"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import SmallTileViewIcon from "@/components/misc/icons/SmallTileViewIcon.vue";
import BigTileViewIcon from "@/components/misc/icons/BigTileViewIcon.vue";
import ListViewIcon from "@/components/misc/icons/ListViewIcon.vue";
import settings, { DashboardViews } from "@/store/modules/settings";
import LineSeparator from "@/components/misc/LineSeperator.vue";

@Component({
	name: "ViewSelection",
	components: {
		SmallTileViewIcon,
		BigTileViewIcon,
		ListViewIcon,
		LineSeparator
	},
})
export default class ViewSelection extends Vue {
	dashboardViews = DashboardViews;

	get activeView() {
		return settings.dashboardViewMode;
	}

	setSmallTile() {
		settings.SET_DASHBOARD_VIEW_MODE(this.dashboardViews.SMALL_TILE);
	}

	setBigTile() {
		settings.SET_DASHBOARD_VIEW_MODE(this.dashboardViews.BIG_TILE);
	}

	setList() {
		settings.SET_DASHBOARD_VIEW_MODE(this.dashboardViews.LIST);
	}
}
</script>
