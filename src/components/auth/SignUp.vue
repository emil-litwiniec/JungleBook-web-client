<template>
	<div class="auth__box auth__box--sign-up">
		<form @submit.prevent="submitForm" class="auth__form">
			<div class="auth__input">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="formData.email" />
				<small v-if="errors.email">{{errors.email}}</small>
			</div>
			<div class="auth__input">
				<label for="password">Password</label>
				<input type="password" id="password" v-model="formData.password" />
				<small v-if="errors.password">{{errors.password}}</small>
			</div>
			<div class="auth__input">
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" id="confirmPassword" v-model="formData.confirmPassword" />
				<small v-if="errors.confirmPassword">{{errors.confirmPassword}}</small>
			</div>
		</form>
		<button @click="submitForm" class="auth__btn">Sign Up</button>
		<button @click="signUpWithGoogle" class="auth__btn">Sign Up with Google</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
	validateEmail,
	validatePassword,
	validateConfirmPassword
} from "@/utils/validation";

interface SignUpFormData {
	email: string;
	password: string;
	confirmPassword: string;
}

@Component
export default class Login extends Vue {
	private formData: SignUpFormData = {
		email: "",
		password: "",
		confirmPassword: ""
	};

	private errors: SignUpFormData = {
		email: "",
		password: "",
		confirmPassword: ""
	};

	@Watch("formData", {
		deep: true
	})
	validateForm(currData: SignUpFormData, prevData: SignUpFormData) {
		const realPrevData = JSON.parse(JSON.stringify({prevData : prevData}));

		const shouldValidateEmail =
			currData.email.length !== 0 || currData.email !== realPrevData.email;

		const shouldValidatePassword =
			currData.password.length !== 0 || currData.password !== realPrevData.password;

		const shouldValidateConfirmPassword =
			currData.confirmPassword.length !== 0 ||
			currData.confirmPassword !== realPrevData.confirmPassword;

		shouldValidateEmail && this.handleEmailValidation(currData.email);
		shouldValidatePassword && this.handlePasswordValidation(currData.password);
		shouldValidateConfirmPassword &&
			this.handlePasswordConfirmValidation(currData.confirmPassword);
	}

	handleEmailValidation(email: string) {
		this.errors.email = validateEmail(email);
	}

	handlePasswordValidation(password: string) {
		this.errors.password = validatePassword(password);
	}

	handlePasswordConfirmValidation(confirmPassword: string) {
		this.errors.confirmPassword = validateConfirmPassword(
			this.formData.password,
			confirmPassword
		);
	}

	submitForm() {
		const errorValues = Object.values(this.errors);
		const hasError = errorValues.some(error => error.trim().length);

		if (hasError) {
			// handle error message
			console.log('Provided credentials have incorrect format')
			return; 
		}
		
		// make call to api module
		// signUp().then(() => {

			this.$router.push('dashboard')
		// }).catch((e) => {
		// 	console.log(e);
		// });
	}

	signUpWithGoogle() {
		return;
	}
}
</script>
