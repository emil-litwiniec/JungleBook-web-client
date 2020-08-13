<template>
	<div class="image-upload">
		<loader v-if="loaderVisible" color="dark" ref="loader" />
		<form
			class="image-upload__form"
			enctype="multipart/form-data"
			novalidate
			v-if="isInitial || isSaving"
			@click="handleFormClick"
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
import { Component, Prop, Vue, Watch, Ref } from "vue-property-decorator";
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
	uploadError: string | null = null;
	currentStatus: UploadStatus | null = null;
	uploadFieldName = "image";
	loaderVisible = false;

	@Ref("loader") readonly loader!: Loader;
	@Ref("inputFile") readonly inputFile!: HTMLInputElement;

	hideLoader() {
		this.loader.fadeOut().then(() => {
			this.loaderVisible = false;
		});
	}

	mounted() {
		this.reset();
	}

	reset() {
		this.currentStatus = UploadStatus.INITIAL;
		this.uploadedFiles = [];
		this.uploadError = null;
	}

	save(formData: FormData) {
		this.currentStatus = UploadStatus.SAVING;
		this.loaderVisible = true;
		console.log(formData);
		user.imageUpload({ formData })
			.then((data: any) => {
				this.uploadedFiles = [].concat(data);
				this.currentStatus = UploadStatus.SUCCESS;
			})
			.catch((err: any) => {
				this.uploadError = err.response;
				this.currentStatus = UploadStatus.FAILED;
			})
			.finally(() => {
				this.hideLoader();
			});
	}

	imageChange(fieldName: string, image: FileList) {
		const formData = new FormData();
		console.log({ image });
		if (!image) return;
		formData.append(fieldName, image[0], image[0].name);
		this.save(formData);
	}

	get isInitial() {
		return this.currentStatus === UploadStatus.INITIAL;
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

	handleFormClick() {
		this.inputFile.click();
	}
}
</script>
