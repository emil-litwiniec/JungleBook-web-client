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
import DropdownSelection, {
	Option,
} from "@/components/common/dropdownSelection/DropdownSelection.vue";

interface SortOptions {
	[SortBy.A_Z]: Option;
	[SortBy.Z_A]: Option;
	[SortBy.LAST_WATERED]: Option;
	[SortBy.LAST_DEWED]: Option;
}

const possibleOptions = {
	[SortBy.A_Z]: {
		name: "aZ",
		label: "A - Z",
		id: SortBy.A_Z,
	},
	[SortBy.Z_A]: {
		name: "zA",
		label: "Z - A",
		id: SortBy.Z_A,
	},
	[SortBy.LAST_WATERED]: {
		name: "lastWatered",
		label: "Last watered",
		id: SortBy.LAST_WATERED,
	},
	[SortBy.LAST_DEWED]: {
		name: "lastDewed",
		label: "Last dewed",
		id: SortBy.LAST_DEWED,
	},
};

@Component({
	name: "SortByDropdown",
	components: {
		DropdownSelection,
	},
})
export default class SortByDropdown extends Vue {
	sortByOptions: SortOptions = possibleOptions;
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
