<template>
	<div
        @mouseover="showMenu=true"
        @mouseleave="showMenu=false"
        class="navigation-bar__profile">
		<button class="navigation-bar__profile-btn" :class="{'navigation-bar__profile-btn--show-menu': showMenu}" @click="showMenu=!showMenu">
			<span>Profile</span>
			<profile-icon />
		</button>
		<transition name="fade">
			<navigation-dropdown-menu v-if="showMenu" :aria-expanded="showMenu" />
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProfileIcon from "@/components/misc/icons/ProfileIcon.vue";
import NavigationDropdownMenu from "@/components/navigationDropdownMenu/NavigationDropdownMenu.vue";

@Component({
	name: "NavigationProfile",
	components: {
		ProfileIcon: ProfileIcon,
		NavigationDropdownMenu: NavigationDropdownMenu,
	},
})
export default class NavigationProfile extends Vue {
	showMenu = false;
}
</script>
