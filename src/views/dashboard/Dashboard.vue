<template>
	<div class="welcome-wrapper">
		<div class="welcome-container">
			<Loader v-if="loaderVisible" ref="loader"/>
			<template>
				<div class="logotype">
					<h2 class="logotype__base">JungleBook</h2>
					<h5 class="logotype__phrase">Let it grow!</h5>
				</div>
				<button @click="signOut">Sign Out</button>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import LoaderAnimation from "@/components/loader/LoaderAnimation.vue";
import { Loader } from "@/components/types";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";


@Component({
	name: "Dashboard",
	components: {
		Loader: LoaderAnimation,
	},
})
export default class Dashboard extends Vue {
	loaderVisible = true;

	mounted() {
		this.fetchData();
	}
	@Ref('loader') readonly loader!: Loader;

	hideLoader() {
		this.loader.fadeOut().then(() => {
			this.loaderVisible = false;
		})
	}

	signOut() {
		this.loaderVisible = true;
		user.signOut()
			.then(() => {
				this.$router.push("/");
			})
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
