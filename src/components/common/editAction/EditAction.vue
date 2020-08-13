<template>
	<div class="edit-action">
		<button
			class="edit-action__btn"
			:class="{'active': isSelectionMode}"
			@click="handleSelectionModeSwitch"
		>{{isSelectionMode ? "Save changes" : "Edit plant"}}</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import settings from "@/store/modules/settings";

@Component({
	name: "EditAction",
})
export default class EditAction extends Vue {
	get isSelectionMode() {
		return settings.isEditMode;
	}

	handleSelectionModeSwitch() {
		settings.SET_EDIT_MODE(!settings.isEditMode);
	}
}
</script>
