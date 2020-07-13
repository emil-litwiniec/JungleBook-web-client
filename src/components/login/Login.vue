<template>
	<div ref="login-box" class="login__box" :class="`login__box--${progress}`">
		<button @click="onSignInClicked" class="login__btn">Sign In</button>
		<button @click="onSignUpClicked" class="login__btn">Sign Up</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { gsap } from "gsap";

enum loginProgress {
	IDLE = "idle",
	SIGN_IN = "sign-in",
	SIGN_UP = "sign-up"
}

@Component
export default class Login extends Vue {
	private progress: loginProgress = loginProgress.IDLE;
	@Ref("login-box") readonly loginBox: any;

	onSignInClicked() {
		this.progress = loginProgress.SIGN_IN;
	}

	onSignUpClicked() {
		this.progress = loginProgress.SIGN_UP;
	}

	@Watch("progress")
	onProgressChange(value: loginProgress) {
		return;
	}
}
</script>
