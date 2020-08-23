<template>
	<modal-template ref="modalTemplate" :showCloseButton="false" class="modal--invalid-form">
		<p>
			Plant name can't be empty!
		</p>
		<button @click="handleAffirmativeButton">Ok</button>
	</modal-template>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import ModalTemplate from "@/components/modal/ModalTemplate.vue";

@Component({
	name: "InvalidFormModal",
	components: {
		ModalTemplate,
	},
})
export default class InvalidFormModal extends Vue {
	@Ref("modalTemplate") modalTemplate!: ModalTemplate;

	handleAffirmativeButton() {
		this.modalTemplate.handleHideModal();
	}
}
</script>
