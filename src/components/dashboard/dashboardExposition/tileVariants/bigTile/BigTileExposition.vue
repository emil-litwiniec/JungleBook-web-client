<template>
	<transition-group name="fade-group" tag="div" class="exposition" :class="`exposition--big-tile`">
		<big-tile v-for="plant in mappedPlants" :key="uniqueKey(plant.id)" :plant="plant" />
	</transition-group>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import BigTile from "@/components/dashboard/dashboardExposition/tileVariants/bigTile/BigTile.vue";
import TileExpositionBase from "@/components/dashboard/dashboardExposition/tileVariants/TileExpositionBase";

@Component({
	name: "BigTileExposition",
	components: {
		BigTile,
	},
})
export default class BigTileExposition extends TileExpositionBase {}
</script>
