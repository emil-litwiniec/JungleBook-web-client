<template>
	<div class="welcome-wrapper">
		<div class="welcome-container">
			<div class="logotype">
				<h2 class="logotype__base">JungleBook</h2>
				<h5 class="logotype__phrase">Let it grow!</h5>
			</div>

			<Login />
		</div>
	</div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import Login from "@/components/login/Login";

@Component({
	name: "Welcome",
	components: {
		Login
	}
})
export default class Welcome extends Vue {}

</script>
