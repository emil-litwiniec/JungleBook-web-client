<template>
	<div class="image-upload">
		<loader v-if="loaderVisible" color="dark" ref="loader" />
		<form
			class="image-upload__form"
			enctype="multipart/form-data"
			novalidate
			@click="handleFormClick"
			ref="formElement"
			@drag.stop.prevent
			@dragenter.stop.prevent="handleDragStart"
			@dragover.stop.prevent="handleDragStart"
			@dragleave.stop.prevent="handleDragEnd"
			@dragend.stop.prevent="handleDragEnd"
			@drop.stop.prevent="handleDrop"
		>
			<profile-icon />
			<h4>Image Upload</h4>

			<div class="image-upload__input">
				<input
					type="file"
					:name="uploadFieldName"
					:disabled="isSaving"
					@change="imageChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
					accept="image/*"
					class="input-file"
					ref="inputFile"
				/>
				<p>
					Drop your image here
					<br />or click to browse
				</p>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref, Emit } from "vue-property-decorator";
import user from "@/store/modules/user";
import { Loader } from "@/components/types";
import LoaderAnimation from "@/components/loader/LoaderAnimation.vue";
import ProfileIcon from "@/components/misc/icons/ProfileIcon.vue";

enum UploadStatus {
	INITIAL,
	SAVING,
	SUCCESS,
	FAILED,
}

@Component({
	name: "ImageUpload",
	components: {
		Loader: LoaderAnimation,
		ProfileIcon,
	},
})
export default class ImageUpload extends Vue {
	uploadedFiles: any[] = [];
	draggedFiles!: Blob;
	uploadError: string | null = null;
	currentStatus: UploadStatus | null = null;
	uploadFieldName = "image";
	loaderVisible = false;

	@Ref("loader") readonly loader!: Loader;
	@Ref("inputFile") readonly inputFile!: HTMLInputElement;
	@Ref("formElement") readonly formElement!: HTMLElement;

	mounted() {
		this.reset();
	}

	hideLoader() {
		this.loader.fadeOut().then(() => {
			this.loaderVisible = false;
		});
	}

	reset() {
		this.currentStatus = UploadStatus.INITIAL;
		this.uploadedFiles = [];
		this.uploadError = null;
	}

	save(formData: FormData) {
		this.currentStatus = UploadStatus.SAVING;
		this.loaderVisible = true;
		user.imageUpload({ formData })
			.then(({ data }) => {
				this.currentStatus = UploadStatus.SUCCESS;
				this.onImageUploaded(data.data.filename);
			})
			.catch((err: any) => {
				this.uploadError = err.response;
				this.currentStatus = UploadStatus.FAILED;
				//TODO: show error message notification
			})
			.finally(() => {
				this.hideLoader();
				this.currentStatus = UploadStatus.INITIAL;
			});
	}

	imageChange(fieldName: string, images: FileList) {
		const formData = new FormData();

		if (!images) return; // show error message ?
		formData.append(fieldName, images[0], images[0].name);
		this.save(formData);
	}

	get isSaving() {
		return this.currentStatus === UploadStatus.SAVING;
	}

	get isSuccess() {
		return this.currentStatus === UploadStatus.SUCCESS;
	}

	get isFailed() {
		return this.currentStatus === UploadStatus.FAILED;
	}

	@Emit()
	onImageUploaded(filename: string) {
		return filename;
	}

	handleDragStart(e: Event) {
		this.formElement.classList.add("is-dragover");
	}

	handleDragEnd(e: Event) {
		this.formElement.classList.remove("is-dragover");
	}

	handleDrop(e: any) {
		this.formElement.classList.remove("is-dragover");
		this.uploadedFiles = e.dataTransfer.files;
		this.imageChange(this.inputFile.name, e.dataTransfer.files);
	}

	handleFormClick() {
		this.inputFile.click();
	}
}
</script>
