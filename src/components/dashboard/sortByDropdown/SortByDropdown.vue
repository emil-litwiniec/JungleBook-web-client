<template>
	<div class="sort-by-dropdown">
		<span class="sort-by-dropdown__label">Sort by:</span>
		<div class="dropdown">
			<div class="dropdown__selected">
				<span>{{selectedOption.label}}</span>
			</div>
			<div class="dropdown__select-box">
				<div
					class="dropdown__option"
					v-for="option in sortByOptions"
					:key="option.id"
					@click="handleDropdownSelect(option.id)"
				>
					<input
						v-if="option.id === selectedOption.id"
						type="radio"
						:id="option.name"
						name="category"
						checked
					/>
					<input v-else type="radio" :id="option.name" name="category" />

					<label :for="option.name">{{option.label}}</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import settings, { SortBy } from "@/store/modules/settings";

interface Option {
	name: string;
	label: string;
	id: SortBy;
}

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
