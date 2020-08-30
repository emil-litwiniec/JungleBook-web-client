<template>
	<modal-template ref="modalTemplate" :showCloseButton="false" class="modal--accept-action">
		<p>{{currentModal.message}}</p>
		<div class="modal__button-container">
			<button class="button-primary" @click="handleAffirmativeButton">Yes</button>
			<button class="button-primary button-primary--danger" @click="handleRejectButton">No</button>
		</div>
	</modal-template>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import ModalTemplate from "@/components/modal/ModalTemplate.vue";
import modal from "@/store/modules/modal";

@Component({
	name: "AcceptActionModal",
	components: {
		ModalTemplate,
	},
})
export default class AcceptActionModal extends Vue {
	@Ref("modalTemplate") modalTemplate!: ModalTemplate;

	get currentModal() {
		return modal.currentModalComponent;
	}

	handleAffirmativeButton() {
		if (this.currentModal && this.currentModal.callbackAction) {
			this.currentModal.callbackAction();
		}
		this.modalTemplate.handleHideModal();
	}

	handleRejectButton() {
		this.modalTemplate.handleHideModal();
	}
}
</script>
