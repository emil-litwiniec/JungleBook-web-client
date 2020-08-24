<template>
	<div class="auth__box auth__box--sign-up" ref="authBox">
		<form @submit.prevent="submitForm" class="auth__form">
			<div class="auth__input">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="formData.email" />
				<small v-if="errors.email" class="auth__error">{{errors.email}}</small>
			</div>
			<div class="auth__input">
				<label for="password">Password</label>
				<input type="password" id="password" v-model="formData.password" />
				<small v-if="errors.password" class="auth__error">{{errors.password}}</small>
			</div>
			<div class="auth__input">
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" id="confirmPassword" v-model="formData.confirmPassword" />
				<small v-if="errors.confirmPassword" class="auth__error">{{errors.confirmPassword}}</small>
			</div>
		</form>
		<button @click="submitForm" class="auth__btn">Sign Up</button>
		<button @click="signUpWithGoogle" class="auth__btn">Sign Up with Google</button>
		<small class="auth__error auth__error--main" v-if="authError">{{authError}}</small>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from "vue-property-decorator";
import {
	validateEmail,
	validatePassword,
	validateConfirmPassword,
} from "@/utils/validation";

import { animateReject } from "@/utils/animations";

import user from "@/store/modules/user";
import { SignUpFormData } from "@/components/types";

@Component
export default class Login extends Vue {
	@Ref("authBox") readonly authBox!: HTMLDivElement;

	constructor() {
		super();
	}

	private formData: SignUpFormData = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	private errors: SignUpFormData = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	private authError = "";

	@Watch("formData", {
		deep: true,
	})
	validateForm(currData: SignUpFormData, prevData: SignUpFormData) {
		const realPrevData = JSON.parse(JSON.stringify({ prevData: prevData }));

		const shouldValidateEmail = currData.email !== realPrevData.email;

		const shouldValidatePassword =
			currData.password !== realPrevData.password;

		const shouldValidateConfirmPassword =
			currData.confirmPassword !== realPrevData.confirmPassword;

		shouldValidateEmail && this.handleEmailValidation(currData.email);
		shouldValidatePassword &&
			this.handlePasswordValidation(currData.password);
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
		const formDataValues = Object.values(this.formData);
		const hasError = errorValues.some((error) => error.trim().length);
		const isEmpty = formDataValues.some((value) => !value);

		if (hasError || isEmpty) {
			this.authError = "Invalid data format";
			animateReject(this.authBox);
			return;
		}

		user.signUp(this.formData)
			.then((data) => {
				this.$router.push("dashboard");
			})
			.catch((error) => {
				animateReject(this.authBox);
				const errorMessage = error.response.data.message;
				this.authError = errorMessage;
			});
	}

	signUpWithGoogle() {
		// sign up with google oauth
	}
}
</script>
