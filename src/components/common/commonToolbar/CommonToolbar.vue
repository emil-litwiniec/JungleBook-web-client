<template>
	<div class="common-toolbar">
		<edit-action v-if="activeComponents.editAction" />
		<view-selection v-if="activeComponents.viewSelection" />
		<selection-actions v-if="activeComponents.selectionActions" />
		<sort-by-dropdown v-if="activeComponents.sortByDropdown" />
		<search-bar v-if="activeComponents.searchBar" style="width: 400px" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ViewSelection from "@/components/dashboard/viewSelection/ViewSelection.vue";
import SelectionActions from "@/components/dashboard/selectionActions/SelectionActions.vue";
import SortByDropdown from "@/components/dashboard/sortByDropdown/SortByDropdown.vue";
import SearchBar from "@/components/dashboard/searchBar/SearchBar.vue";
import EditAction from "@/components/common/editAction/EditAction.vue";

// move to common constants file
const dashboardToolbarSetup = {
	editAction: false,
	viewSelection: true,
	selectionActions: true,
	sortByDropdown: true,
	searchBar: true,
};

const plantDetailsToolbarSetup = {
	editAction: true,
	viewSelection: false,
	selectionActions: false,
	sortByDropdown: false,
	searchBar: true,
};

@Component({
	name: "CommonToolbar",
	components: {
		ViewSelection,
		SelectionActions,
		SortByDropdown,
		SearchBar,
		EditAction,
	},
})
export default class CommonToolbar extends Vue {
	@Prop({ default: "dashboard" }) componentsSetup!:
		| "dashboard"
		| "plantDetails";

	activeComponents = {
		editAction: false,
		viewSelection: false,
		selectionActions: false,
		sortByDropdown: false,
		searchBar: false,
	};

	mounted() {
		switch (this.componentsSetup) {
			case "dashboard":
				this.activeComponents = dashboardToolbarSetup;
				break;
			case "plantDetails":
				this.activeComponents = plantDetailsToolbarSetup;
				break;
		}
	}

	get isDashboard() {
		return this.$router.currentRoute.name === "dashboard";
	}
}
</script>
