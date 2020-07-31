<template>
	<div class="selection-actions">
		<div class="selection-actions__btns">
			<button class="selection-actions__btn" @click="handleDew">Dew {{actionText}}</button>
			<line-separator />
			<button class="selection-actions__btn" @click="handleWater">Water {{actionText}}</button>
		</div>

		<button
			class="selection-actions__btn"
			:class="{'active': isSelectionMode}"
			@click="handleSelectionModeSwitch"
		>{{isSelectionMode ? "Exit selection mode" : "Enter selection mode"}}</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import settings from "@/store/modules/settings";
import LineSeparator from "@/components/misc/LineSeperator.vue";

@Component({
	name: "SelectionActions",
	components: {
		LineSeparator
	}
})
export default class SelectionActions extends Vue {
	get isSelectionMode() {
		return settings.isSelectionMode;
	}

	get actionText() {
		return this.isSelectionMode ? "selected" : "all";
	}

	handleSelectionModeSwitch() {
		settings.SWITCH_SELECTION_MODE();
	}

	handleDew() {
		return;
	}

	handleWater() {
		return;
	}
}
</script>
