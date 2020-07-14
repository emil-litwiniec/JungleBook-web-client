<template>
	<div class="auth__box auth__box--sign-up">
		<h2>Sign Up</h2>

		<form @submit.prevent="submitForm" class="auth__form">
			<div class="auth__input">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="formData.email" />
				<small v-if="errors.email">{{errors.email}}</small>
			</div>
			<div class="auth__input">
				<label for="email">Password</label>
				<input type="password" id="password" v-model="formData.password" />
				<small v-if="errors.password">{{errors.password}}</small>
			</div>
			<div class="auth__input">
				<label for="email">Repeat Password</label>
				<input type="password" id="confirmPassword" v-model="formData.confirmPassword" />
				<small v-if="errors.confirmPassword">{{errors.confirmPassword}}</small>
			</div>
		</form>
		<button type="submit" class="auth__btn">Sign Up</button>
		<button @click="signUpWithGoogle" class="auth__btn">Sign Up with Google</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
interface SignUpFormData {
	email: string;
	password: string;
	confirmPassword: string;
}

// TODO: move regexes to separate module
const emailRegex = new RegExp(
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

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
		if (currData.email.length !== 0 || currData.email !== prevData.email) {
			this.validateEmail(currData.email);
		}
		if (
			currData.password.length !== 0 ||
			currData.password !== prevData.password
		) {
			this.validatePassword(currData.password);
		}
		if (
			currData.confirmPassword.length !== 0 ||
			currData.confirmPassword !== prevData.confirmPassword
		) {
			this.validateConfirmedPassword(currData.email);
		}
	}

	validateEmail(email: string) {
		const emailTest = emailRegex.test(email);

		const error = !emailTest ? "Email is not valid" : "";

		this.errors.email = error;
	}

	validatePassword(password: string) {
		const passwordTest = passwordRegex.test(password);

		const error = !passwordTest
			? "Password should contain minimum eight characters, at least one letter and one number"
			: "";

		this.errors.password = error;
	}

	validateConfirmedPassword(password: string) {
		const error =
			this.formData.password !== this.formData.confirmPassword
				? "Password doesn't match"
				: "";

		this.errors.confirmPassword = error;
	}

	submitForm() {
		// make call to api module
		// signUp().then().catch();
	}

	signUpWithGoogle() {}
}
</script>
