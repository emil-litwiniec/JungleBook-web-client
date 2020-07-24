<template>
	<div class="welcome-wrapper">
		<div class="welcome-container">
			<div class="logotype">
				<h2 class="logotype__base">JungleBook</h2>
				<h5 class="logotype__phrase">Let it grow!</h5>
			</div>
            <button @click="signOut">Sign Out</button>
		</div>
	</div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";

@Component({
	name: "Dashboard",
})
export default class Dashboard extends Vue {

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
                // hide loader
            }) 
    }
}
</script>
