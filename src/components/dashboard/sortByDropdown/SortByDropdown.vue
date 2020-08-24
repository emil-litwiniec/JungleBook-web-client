<template>
	<div class="sort-by-dropdown">
		<span class="sort-by-dropdown__label">Sort by:</span>
		<dropdown-selection
			@on-select="handleDropdownSelect"
			:options="sortByOptions"
			:selectedOption="selectedOption"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import settings, { SortBy } from "@/store/modules/settings";
import DropdownSelection from "@/components/common/dropdownSelection/DropdownSelection.vue";

import { possibleSortOptions } from "@/utils/constants";
import { SortOptions } from "@/components/types";

@Component({
	name: "SortByDropdown",
	components: {
		DropdownSelection,
	},
})
export default class SortByDropdown extends Vue {
	sortByOptions: SortOptions = possibleSortOptions;
	sortByEnum = SortBy;

	get selectedOption() {
		const selectedOptionId = settings.sortBy;
		return this.sortByOptions[selectedOptionId];
	}

	handleDropdownSelect(optionId: SortBy) {
		settings.SET_SORT_BY(optionId);
	}
}
</script>
