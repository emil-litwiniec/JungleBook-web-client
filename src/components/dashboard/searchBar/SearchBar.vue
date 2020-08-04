<template>
	<div class="search-bar">
		<div class="search-bar__wrapper">
			<div class="search-bar__input-container">
				<input v-model="inputValue" type="text" name="search" placeholder="Search plant..." />
				<search-icon />
			</div>
			<div class="search-bar__results-box">
				<div
					v-for="(result, index) in filteredPlants"
					:key="index"
					class="result"
					@click="handleResultClick(result.id)"
				>
					<div class="result__names">
						<h5>{{result.name}}</h5>
						<span>{{result.scientific_name}}</span>
					</div>
					<div class="result__stats">
						<span>
							<span>Last watered:</span> 1 day
						</span>
						<span>
							<span>Last dewed:</span> 1 day
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import user from "@/store/modules/user";
import SearchIcon from "@/components/misc/icons/SearchIcon.vue";
import { Plant } from "@/api/types";

@Component({
	name: "SearchBar",
	components: {
		SearchIcon,
	},
})
export default class SearchBar extends Vue {
	inputValue = "";
	filteredPlants: Plant[] = [];

	@Watch("inputValue")
	handleInputChange(newValue: string, prevValue: string) {
		if (!newValue) {
			this.filteredPlants = [];
		} else {
			this.filteredPlants = this.filterPlants(newValue);
		}
	}

	get plants() {
		return user.plants;
	}

	filterPlants(query: string) {
		const filtered = this.plants.filter((plant) => {
			const regex = new RegExp(query, "gmi");
			return regex.test(plant.name) || regex.test(plant.scientific_name);
		});
		return filtered;
	}

	handleResultClick(plantId: number) {
		this.$router.push(`/plant/${plantId}`);
	}
}
</script>
