<template>
	<svg
		style="enable-background:new 0 0 32 32;"
		version="1.1"
		viewBox="0 0 32 32"
		xml:space="preserve"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		class="drop-icon"
		ref="icon"
	>
		<path
			d="M16.7070313,2.2929688c-0.390625-0.390625-1.0234375-0.390625-1.4140625,0C14.9135742,2.6723633,6,11.6816406,6,20    c0,5.5141602,4.4858398,10,10,10c5.5136719,0,10-4.4858398,10-10C26,11.6816406,17.0869141,2.6723633,16.7070313,2.2929688z     M16,28c-4.4111328,0-8-3.5888672-8-8c0-6.2075195,5.9248047-13.2612305,8.0004883-15.5410156    C18.0761719,6.7368164,24,13.7836914,24,20C24,24.4111328,20.4111328,28,16,28z"
			:fill="color"
		/>
		<path
			d="M16,24c-2.2055664,0-4-1.8105469-4-4.0356445c0-0.5522461-0.4477539-1-1-1s-1,0.4477539-1,1    C10,23.2924805,12.6914063,26,16,26c0.5522461,0,1-0.4477539,1-1S16.5522461,24,16,24z"
			:fill="color"
		/>
	</svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { blink } from "@/utils/animations";

@Component({
	name: "DropIcon",
})
export default class DropIcon extends Vue {
	@Prop({ default: "#f3f3f3" }) readonly color!: string;
	@Ref('icon') readonly icon!: HTMLElement;

	mounted() {
		blink(this.icon, 0.2);
	}


}
</script>
