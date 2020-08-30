<template>
	<component :is="currentModalComponent" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import modal from "@/store/modules/modal";
import InvalidFormModal from "@/components/modal/InvalidFormModal.vue";
import AcceptActionModal from "@/components/modal/AcceptActionModal.vue";

@Component({
	name: "ModalDisplay",
	components: {
		InvalidFormModal,
		AcceptActionModal,
	},
})
export default class ModalDisplay extends Vue {
	get currentModalComponent() {
		return modal.currentModalComponent?.componentName;
	}
}
</script>
