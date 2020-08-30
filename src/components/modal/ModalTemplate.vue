<template>
	<div class="modal__wrapper">
		<div class="modal__close-area fade-in" @click="handleHideModal" ref="modalCloseAreaElement"></div>
		<div class="modal fade-in" ref="modalElement">
			<slot></slot>
			<button @click="handleHideModal" v-if="showCloseButton">Close</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import modal from "@/store/modules/modal";
import { fadeOut } from "@/utils/animations";

@Component({
	name: "ModalTemplate",
})
export default class ModalTemplate extends Vue {
	@Prop() showCloseButton!: boolean;
	@Ref("modalElement") modalElement!: HTMLElement;
	@Ref("modalCloseAreaElement") modalCloseAreaElement!: HTMLElement;

	public handleHideModal() {
		fadeOut([this.modalElement, this.modalCloseAreaElement]).then(() => {
			modal.HIDE_MODAL();
		});
	}
}
</script>
