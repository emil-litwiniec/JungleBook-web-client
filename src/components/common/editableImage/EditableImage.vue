<template>
	<div class="relative editable-image__wrapper">
		<div class="tile editable-image">
			<image-upload v-if="editMode" />
			<image-display v-else :img-path="imgPath" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";
import ImageUpload from "@/components/common/editableImage/imageUpload/ImageUpload.vue";
import ImageDisplay from "@/components/common/editableImage/imageDisplay/ImageDisplay.vue";
import EditIcon from "@/components/misc/icons/EditIcon.vue";

@Component({
	name: "EditableImage",
	components: {
		ImageUpload,
		ImageDisplay,
	},
})
export default class EditableImage extends Vue {
	@Prop({ default: false }) editMode!: boolean;
	@Prop() imgPath!: string;

	handleSelectionBtn() {
		console.log("handle selection button");
	}
}
</script>
