<template>
	<div class="modal__wrapper">
		<div class="modal__close-area" @click="handleHideModal"></div>
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

	public handleHideModal() {
		fadeOut(this.modalElement).then(() => {
			modal.HIDE_MODAL();
		});
	}
}
</script>
