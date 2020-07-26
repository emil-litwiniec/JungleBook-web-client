<template>
	<div class="dashboard__wrapper" :class="{'dashboard__wrapper--white': fadeInDashboard}">
		<Loader v-if="loaderVisible" color="light" ref="loader" />
	</div>
</template>

<script lang="ts">
import LoaderAnimation from "@/components/loader/LoaderAnimation.vue";
import { Loader } from "@/components/types";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";

@Component({
	name: "DashboardView",
	components: {
		Loader: LoaderAnimation,
	},
})
export default class DashboardView extends Vue {
	loaderVisible = true;
	fadeInDashboard = false;

	created() {
		this.fetchData();
	}
	@Ref("loader") readonly loader!: Loader;

	hideLoader() {
		this.loader.fadeOut().then(() => {
			this.loaderVisible = false;
			this.fadeInDashboard = true;
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
