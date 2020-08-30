<template>
	<div id="wrapper" class="wrapper">
		<modal-display v-show="isModalVisible" />
		<navigation-bar v-if="isNavVisible" />
		<main>
			<router-view :key="$route.fullPath" />
		</main>
	</div>
</template>

<script lang="ts">
import NavigationBar from "@/components/navigationBar/NavigationBar.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import ModalDisplay from "@/components/modal/ModalDisplay.vue";
import modal from "@/store/modules/modal";

const viewsWithoutNavigation: string[] = ["signIn", "signUp", "authBox"];

@Component({
	components: {
		NavigationBar,
		ModalDisplay,
	},
})
export default class App extends Vue {
	handleShowModal() {
		modal.SHOW_MODAL({
			componentName: "InvalidFormModal",
		});
	}

	get isNavVisible() {
		return !viewsWithoutNavigation.some(
			(viewName) => this.$route.name === viewName
		);
	}

	get isModalVisible() {
		return !!modal.currentModalComponent;
	}
}
</script>

<style lang="scss">
@import "@/styles/index";
</style>
