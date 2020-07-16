<template>
	<div class="auth__box auth__box--sign-in">
		<h2>Sign In</h2>

		<form @submit.prevent="submitForm" class="auth__form">
			<div class="auth__input">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="formData.email" />
				<small v-if="errors.email">{{errors.email}}</small>
			</div>
			<div class="auth__input">
				<label for="email">Password</label>
				<input type="password" id="password" v-model="formData.password" />
			</div>
		</form>
		<button @click="submitForm" class="auth__btn">Sign In</button>
		<button @click="signInWithGoogle" class="auth__btn">Sign In with Google</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validateEmail } from "@/utils/validation";

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
	validateForm(currData: SignInFormData, prevData: SignInFormData) {
		const shouldValidateEmail =
			currData.email.length !== 0 || currData.email !== prevData.email;

		shouldValidateEmail && this.handleEmailValidation(currData.email);
	}

	handleEmailValidation(email: string) {
		this.errors.email = validateEmail(email);
	}

	submitForm() {
		const errorValues = Object.values(this.errors);
		const hasError = errorValues.some(error => error.trim().length);

		if (hasError) {
			// handle error message
			console.log("Provided credentials have incorrect format");
			return;
		}

		// make call to api module
		// signUp().then(() => {

		this.$router.push("dashboard");
		// }).catch((e) => {
		// 	console.log(e);
		// });
	}

	signInWithGoogle() {
		return;
	}
}
</script>
