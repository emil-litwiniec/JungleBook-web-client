<template>
	<div class="auth__box auth__box--sign-in">
		<h2>Sign In</h2>

		<form @submit.prevent="submitForm" class="auth__form">
			<div class="auth__input">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="formData.email" />
			</div>
			<div class="auth__input">
				<label for="email">Password</label>
				<input type="password" id="password" v-model="formData.password" />
			</div>
		</form>
		<button type="submit" class="auth__btn">Sign In</button>
		<button @click="signInWithGoogle" class="auth__btn">Sign In with Google</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
interface SignInFormData {
	email: string;
	password: string;
}
@Component
export default class Login extends Vue {
	private formData: SignInFormData = {
		email: "",
		password: ""
	};

	private errors: SignInFormData = {
		email: "",
		password: ""
	};

	@Watch("formData", {
		deep: true
	})
	checkData(currData: SignInFormData, prevData: SignInFormData) {
		if (currData.email.length !== 0 || currData.email !== prevData.email) {
			this.validateEmail(currData.email);
		}
	}

	validateEmail(email: string) {}

	submitForm() {}

	signInWithGoogle() {}
}
</script>
