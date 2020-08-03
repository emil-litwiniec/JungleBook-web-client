<template>
	<div class="list-tile-exposition"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import settings, { DashboardViews } from "@/store/modules/settings";

@Component({
	name: "ListTileExposition",
})
export default class ListTileExposition extends Vue {}
</script>