<template>
	<header class="navigation-bar">
		<logotype-base />

		<button @click="signOut">Sign Out</button>
	</header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import LogotypeBase from "@/components/misc/icons/LogotypeBase.vue";
import user from "@/store/modules/user";

@Component({
	name: "NavigationBar",
	components: {
		LogotypeBase: LogotypeBase,
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
