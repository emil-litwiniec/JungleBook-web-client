<template>
	<svg
		class="search-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="19"
		height="19"
		viewBox="0 0 19 19"
		fill="none"
	>
		<rect
			x="10.1443"
			y="11.7908"
			width="2.32845"
			height="10.1954"
			rx="1.16423"
			transform="rotate(-45 10.1443 11.7908)"
			:fill="color"
		/>
		<path
			d="M13.2021 7.10103C13.2021 10.4705 10.4705 13.2021 7.10103 13.2021C3.73152 13.2021 1 10.4705 1 7.10103C1 3.73152 3.73152 1 7.10103 1C10.4705 1 13.2021 3.73152 13.2021 7.10103Z"
			:stroke="color"
			stroke-width="2"
		/>
	</svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "SearchIcon",
})
export default class SearchIcon extends Vue {
	@Prop({ default: "#f3f3f3" }) readonly color!: string;
}
</script>
