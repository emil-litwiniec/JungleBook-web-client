<template>
	<div id="wrapper" class="wrapper">
		<navigation-bar v-if="isNavVisible" />
		<main>
			<router-view :key="$route.fullPath"/>
		</main>
	</div>
</template>

<script lang="ts">
import NavigationBar from "@/components/navigationBar/NavigationBar.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

const viewsWithoutNavigation: string[] = ["signIn", "signUp", "authBox"];

@Component({
	components: {
		NavigationBar: NavigationBar,
	},
})
export default class App extends Vue {
	get isNavVisible() {
		return !viewsWithoutNavigation.some(
			(viewName) => this.$route.name === viewName
		);
	}
}
</script>

<style lang="scss">
@import "@/styles/index";
</style>
