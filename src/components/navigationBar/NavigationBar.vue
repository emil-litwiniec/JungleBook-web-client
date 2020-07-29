<template>
	<header class="navigation-bar">
		<router-link to="/dashboard"> 
			<logotype-base />
		</router-link>
		<navigation-profile />
	</header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import LogotypeBase from "@/components/misc/icons/LogotypeBase.vue";
import NavigationProfile from "@/components/navigationProfile/NavigationProfile.vue";

import user from "@/store/modules/user";

@Component({
	name: "NavigationBar",
	components: {
		LogotypeBase: LogotypeBase,
		NavigationProfile: NavigationProfile
	},
})
export default class NavigationBar extends Vue {
	signOut() {
		user.signOut().then(() => {
			this.$router.push("/");
		});
	}
}
</script>
