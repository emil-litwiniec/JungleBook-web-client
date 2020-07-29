<template>
	<div class="big-tile-view-icon">
		<svg width="33" height="20" viewBox="0 0 33 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.5" y="0.5" width="14" height="19" rx="1.5" :stroke="color" />
			<rect x="18.5" y="0.5" width="14" height="19" rx="1.5" :stroke="color" />
		</svg>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "BigTileViewIcon",
})
export default class BigTileViewICon extends Vue {
	@Prop({ default: "#f3f3f3" }) readonly color!: string;
}
</script>
