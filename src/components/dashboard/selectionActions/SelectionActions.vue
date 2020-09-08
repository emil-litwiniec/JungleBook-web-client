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
import modal from "@/store/modules/modal";
import user, { PlantActionType } from "@/store/modules/user";

@Component({
	name: "SelectionActions",
	components: {
		LineSeparator,
	},
})
export default class SelectionActions extends Vue {
	get isSelectionMode() {
		return settings.isSelectionMode;
	}

	get actionText() {
		return this.isSelectionMode ? "selected" : "all";
	}

	get plantIds() {
		return this.isSelectionMode
			? settings.currentlySelected
			: user.allCurrentBookPlantsIds;
	}

	handleSelectionModeSwitch() {
		settings.switchSelectionMode();
	}

	validateSelection() {
		const arePlantsSelected = settings.currentlySelected.length;
		if (this.isSelectionMode && !arePlantsSelected) {
			modal.SHOW_MODAL({
				componentName: "InfoModal",
				message: "No plants selected",
			});
			return false;
		}

		return true;
	}

	handleDew() {
		const isSelectionValid = this.validateSelection();
		if (!isSelectionValid) return;

		modal.SHOW_MODAL({
			componentName: "AcceptActionModal",
			message: `Are you sure you want to dew ${this.actionText} plants?`,
			callbackAction: () => {
				user.actionPlant({
					data: { plant_ids: this.plantIds },
					plantActionType: PlantActionType.DEW,
				});
			},
		});
	}

	handleWater() {
		const isSelectionValid = this.validateSelection();
		if (!isSelectionValid) return;

		modal.SHOW_MODAL({
			componentName: "AcceptActionModal",
			message: `Are you sure you want to water ${this.actionText} plants?`,
			callbackAction: () => {
				user.actionPlant({
					data: { plant_ids: this.plantIds },
					plantActionType: PlantActionType.WATER,
				});
			},
		});
	}
}
</script>
