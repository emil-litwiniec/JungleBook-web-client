<template>
	<svg class="plus-icon" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect
			x="41"
			y="16.1071"
			width="8.78572"
			height="41"
			rx="4"
			transform="rotate(90 41 16.1071)"
			:fill="color"
		/>
		<rect
			x="24.8931"
			y="41"
			width="8.78572"
			height="41"
			rx="4"
			transform="rotate(-180 24.8931 41)"
			:fill="color"
		/>
	</svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "PlusIcon",
})
export default class PlusIcon extends Vue {
	@Prop({ default: "#f3f3f3" }) readonly color!: string;
}
</script>
