<template>
	<div class="relative editable-image__wrapper">
		<div class="tile editable-image">
			<image-display :img-path="imgPath" :plant-id="plantId" />
			<transition name="fade">
				<image-upload v-if="isEditMode" @on-image-uploaded="onImageUploaded" />
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import settings from "@/store/modules/settings";
import ImageUpload from "@/components/common/editableImage/imageUpload/ImageUpload.vue";
import ImageDisplay from "@/components/common/editableImage/imageDisplay/ImageDisplay.vue";

@Component({
	name: "EditableImage",
	components: {
		ImageUpload,
		ImageDisplay,
	},
})
export default class EditableImage extends Vue {
	@Prop() imgPath!: string;
	@Prop() plantId!: number;

	get isEditMode() {
		return settings.isEditMode;
	}

	@Emit()
	onImageUploaded(filename: string) {
		return filename;
	}
}
</script>
