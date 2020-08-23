<template>
	<modal-template>
        This is invalid form modal!
    </modal-template>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModalTemplate from "@/components/modal/ModalTemplate.vue";

@Component({
	name: "InvalidFormModal",
	components: {
		ModalTemplate,
	},
})
export default class InvalidFormModal extends Vue {}
</script>
