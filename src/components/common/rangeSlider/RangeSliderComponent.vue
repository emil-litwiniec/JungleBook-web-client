<template>
	<div ref="rangeSliderContainer"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Ref, Watch } from "vue-property-decorator";
import { RangeSlider } from "@/components/common/rangeSlider/rangeSlider";

@Component({
	name: "RangeSlider",
})
export default class RangeSliderComponent extends Vue {
	@Prop({ default: [0, 35] }) readonly rangeValues!: number[];
	slider!: RangeSlider | null;
	@Ref("rangeSliderContainer") readonly sliderContainer!: HTMLDivElement;

	mounted() {
		this.slider = new RangeSlider({
			width: 150,
			handlesPositions: [this.rangeValues[0], this.rangeValues[1]],
			range: {
				min: 0,
				max: 35,
			},
			parentContainer: this.sliderContainer,
		});
	}

	get values() {
		if (this.slider) {
			return this.slider.values;
		} else {
			return [0, 35];
		}
	}

	beforeDestroy() {
		if (this.slider) {
			this.$emit("updatedValues", this.slider.values);
			this.slider = null;
		}
	}
}
</script>
