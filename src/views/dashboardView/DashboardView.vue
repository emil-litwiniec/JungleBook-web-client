<template>
	<div class="dashboard__wrapper" :class="{'dashboard__wrapper--white': fadeInDashboard}">
		<Loader v-if="loaderVisible" color="light" ref="loader" />
		<dashboard-navigation-bar />
		<dashboard-exposition />
	</div>
</template>

<script lang="ts">
import LoaderAnimation from "@/components/loader/LoaderAnimation.vue";
import { Loader } from "@/components/types";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";
import DashboardNavigationBar from "@/components/dashboard/dashboardNavigationBar/DashboardNavigationBar.vue";
import DashboardExposition from "@/components/dashboard/dashboardExposition/DashboardExposition.vue";

@Component({
	name: "DashboardView",
	components: {
		Loader: LoaderAnimation,
		DashboardNavigationBar,
		DashboardExposition
	},
})
export default class DashboardView extends Vue {
	loaderVisible = true;
	fadeInDashboard = false;
	dashboardView: DashboardViews = DashboardViews.SMALL_TILE;

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
				// setTimeout(() => this.hideLoader(), 1500)
				this.hideLoader();
			});
	}
}
</script>
