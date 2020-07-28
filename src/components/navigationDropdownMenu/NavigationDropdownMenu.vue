<template>
	<nav class="navigation-dropdown-menu" role="navigation">
        <ul>
            <div class="navigation-dropdown-menu__user">
                <span>{{userEmail}}</span>
            </div>
            <router-link to="/settings" tag="li"><a>Settings</a></router-link>
            <li @click="signOut"><a href="">Sign Out</a></li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import user from "@/store/modules/user";

@Component({
	name: "NavigationDropdownMenu",
})
export default class NavigationDropdownMenu extends Vue {
	signOut() {
		user.signOut().then(() => {
			this.$router.push("/");
		});
    }
    
    get userEmail() {
        return user.email;
    }
}
</script>
