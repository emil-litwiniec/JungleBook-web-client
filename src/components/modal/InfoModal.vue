<template>
	<modal-template ref="modalTemplate" :showCloseButton="false" class="modal--invalid-form">
		<p>{{currentModal.message}}</p>
		<button class="button-primary" @click="handleAffirmativeButton">Ok</button>
	</modal-template>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import ModalTemplate from "@/components/modal/ModalTemplate.vue";
import modal from "@/store/modules/modal";

@Component({
	name: "InfoModal",
	components: {
		ModalTemplate,
	},
})
export default class InfoModal extends Vue {
	@Ref("modalTemplate") modalTemplate!: ModalTemplate;

	get currentModal() {
		return modal.currentModalComponent;
	}

	handleAffirmativeButton() {
		this.modalTemplate.handleHideModal();
	}
}
</script>
