<template>
	<div class="welcome-wrapper">
		<div class="welcome-container">
			<Loader v-if="loaderVisible"/>
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
import Loader from "@/components/loader/LoaderAnimation";

import { Component, Prop, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";

@Component({
	name: "Dashboard",
	components: {
		Loader: Loader,
	},
})
export default class Dashboard extends Vue {
	loaderVisible = true;

	mounted() {
		this.fetchData();
	}

	signOut() {
		user.signOut()
			.then(() => {
				this.$router.push("/");
			})
			.finally(() => {
				// hide loader
			});
	}

	fetchData() {
		user.fetchUserData()
			.catch((err) => {
				this.$router.push("/");
			})
			.finally(() => {
				this.loaderVisible = false;
			});
	}
}
</script>
