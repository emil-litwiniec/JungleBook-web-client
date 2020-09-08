<template>
	<component :is="currentModalComponent" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import modal from "@/store/modules/modal";
import InfoModal from "@/components/modal/InfoModal.vue";
import AcceptActionModal from "@/components/modal/AcceptActionModal.vue";

@Component({
	name: "ModalDisplay",
	components: {
		InfoModal,
		AcceptActionModal,
	},
})
export default class ModalDisplay extends Vue {
	get currentModalComponent() {
		return modal.currentModalComponent?.componentName;
	}
}
</script>
