<template>
	<svg
		class="tick-icon"
		width="15"
		height="16"
		viewBox="0 0 15 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M14.8667 1.49847L6.71235 15.6799L0.26416 8.67739L1.73541 7.32261L6.33723 12.3201L13.1329 0.501526L14.8667 1.49847Z"
			fill="#F3F3F3"
		/>
	</svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "TickIcon",
})
export default class TickIcon extends Vue {
	@Prop({ default: "#f3f3f3" }) readonly color!: string;
}
</script>
