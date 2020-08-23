<template>
	<component :is="currentModalComponent" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import modal from "@/store/modules/modal";
import InvalidFormModal from "@/components/modal/InvalidFormModal.vue";

@Component({
	name: "ModalDisplay",
	components: {
		InvalidFormModal,
	},
})
export default class ModalDisplay extends Vue {
	get currentModalComponent() {
		return modal.currentModalComponent;
	}
}
</script>
