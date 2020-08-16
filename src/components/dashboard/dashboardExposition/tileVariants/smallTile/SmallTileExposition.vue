<template>
	<transition-group name="fade-group" tag="div" class="exposition" :class="`exposition--small-tile`">
		<small-tile v-for="plant in mappedPlants" :key="uniqueKey(plant.id)" :plant="plant" />
	</transition-group>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import SmallTile from "@/components/dashboard/dashboardExposition/tileVariants/smallTile/SmallTile.vue";
import TileExpositionBase from "@/components/dashboard/dashboardExposition/tileVariants/TileExpositionBase";

@Component({
	name: "SmallTileExposition",
	components: {
		SmallTile,
	},
})
export default class SmallTileExposition extends TileExpositionBase {}
</script>
