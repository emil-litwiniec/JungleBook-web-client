<template>
	<section class="plant-details-view__wrapper">
		<Loader v-if="loaderVisible" color="dark" ref="loader" />
		<common-toolbar components-setup="plantDetails" />
		<plant-details v-if="!loaderVisible" />
	</section>
</template>

<script lang="ts">
import LoaderAnimation from "@/components/loader/LoaderAnimation.vue";
import { Loader } from "@/components/types";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";
import PlantDetails from "@/components/plantDetails/PlantDetails.vue";
import CommonToolbar from "@/components/common/commonToolbar/CommonToolbar.vue";

@Component({
	name: "PlantDetailsView",
	components: {
		Loader: LoaderAnimation,
		PlantDetails,
		CommonToolbar,
	},
})
export default class PlantDetailsView extends Vue {
	loaderVisible = true;
	fadeInDashboard = false;

	created() {
		this.fetchData();
	}
	@Ref("loader") readonly loader!: Loader;

	hideLoader() {
		this.loader.fadeOut().then(() => {
			this.loaderVisible = false;
		});
	}

	fetchData() {
		this.loaderVisible = true;
		user.fetchUserData()
			.catch((err) => {
				this.$router.push("/");
			})
			.finally(() => {
				this.hideLoader();
			});
	}
}
</script>
