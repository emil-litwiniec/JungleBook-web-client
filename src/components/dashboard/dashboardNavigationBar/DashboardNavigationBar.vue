<template>
	<div class="dashboard-navigation-bar">
        <view-selection />
        <selection-actions />
        <sort-by-dropdown />
        <search-bar/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

import ViewSelection from "@/components/dashboard/viewSelection/ViewSelection.vue";
import SelectionActions from "@/components/dashboard/selectionActions/SelectionActions.vue";
import SortByDropdown from "@/components/dashboard/sortByDropdown/SortByDropdown.vue";
import SearchBar from "@/components/dashboard/searchBar/SearchBar.vue";

@Component({
    name: "DashboardNavigationBar",
    components: {
        ViewSelection: ViewSelection,
        SelectionActions: SelectionActions,
        SortByDropdown: SortByDropdown,
        SearchBar: SearchBar
    }
})
export default class DashboardNavigationBar extends Vue {
}
</script>
