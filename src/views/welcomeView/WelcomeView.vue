<template>
	<div class="welcome-wrapper">
		<div class="welcome-container">
			<logotype-base showPhrase="true" />
			<router-view />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";
import LogotypeBase from "@/components/misc/icons/LogotypeBase.vue";

@Component({
	name: "WelcomeView",
	components: {
		LogotypeBase: LogotypeBase,
	},
})
export default class Welcome extends Vue {
	created() {
		this.fetchData();
	}

	fetchData() {
		user.fetchUserData().then((data) => {
			this.$router.push("/dashboard");
		});
	}
}
</script>
