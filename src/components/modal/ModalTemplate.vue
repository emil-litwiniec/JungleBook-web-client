<template>
	<div class="modal__wrapper">
		<div class="modal__close-area" @click="handleHideModal"></div>
		<div class="modal fade-in" ref="modalElement">
			<slot></slot>
			<button @click="handleHideModal">Close</button>
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
	@Ref("modalElement") modalElement!: HTMLElement;

	handleHideModal() {
		console.log("should close modal");
		fadeOut(this.modalElement).then(() => {
			modal.HIDE_MODAL();
		});
	}
}
</script>
