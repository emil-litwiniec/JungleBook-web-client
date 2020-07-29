<template>
	<div class="list-view-icon">
		<svg width="33" height="18" viewBox="0 0 33 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="4" width="29" height="2" rx="1" :fill="color" />
			<rect x="4" y="4" width="29" height="2" rx="1" :fill="color" />
			<rect x="4" y="8" width="29" height="2" rx="1" :fill="color" />
			<rect x="4" y="12" width="29" height="2" rx="1" :fill="color" />
			<rect x="4" y="16" width="29" height="2" rx="1" :fill="color" />
			<rect width="3" height="2" rx="1" transform="matrix(-1 0 0 1 3 0)" :fill="color" />
			<rect width="3" height="2" rx="1" transform="matrix(-1 0 0 1 3 4)" :fill="color" />
			<rect width="3" height="2" rx="1" transform="matrix(-1 0 0 1 3 8)" :fill="color" />
			<rect width="3" height="2" rx="1" transform="matrix(-1 0 0 1 3 12)" :fill="color" />
			<rect width="3" height="2" rx="1" transform="matrix(-1 0 0 1 3 16)" :fill="color" />
		</svg>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "ListViewIcon",
})
export default class ListViewIcon extends Vue {
	@Prop({ default: "#f3f3f3" }) readonly color!: string;
}
</script>
