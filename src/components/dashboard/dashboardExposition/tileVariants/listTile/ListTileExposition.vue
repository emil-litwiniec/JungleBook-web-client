<template>
	<transition-group name="fade-group" tag="div" class="exposition" :class="`exposition--list-tile`">
		<list-tile v-for="plant in mappedPlants" :key="uniqueKey(plant.id)" :plant="plant" />
	</transition-group>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import ListTile from "@/components/dashboard/dashboardExposition/tileVariants/listTile/ListTile.vue";
import TileExpositionBase from "@/components/dashboard/dashboardExposition/tileVariants/TileExpositionBase";

@Component({
	name: "ListTileExposition",
	components: {
		ListTile,
	},
})
export default class ListTileExposition extends TileExpositionBase {}
</script>
