<template>
	<div class="auth__box auth__box--sign-in" ref="authBox">
		<form @submit.prevent="submitForm" class="auth__form">
			<div class="auth__input">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="formData.email" />
				<small v-if="errors.email" class="auth__error">{{errors.email}}</small>
			</div>
			<div class="auth__input">
				<label for="email">Password</label>
				<input type="password" id="passwod" v-model="formData.password" />
			</div>
		</form>
		<button @click="submitForm" class="auth__btn">Sign In</button>
		<button @click="signInWithGoogle" class="auth__btn">Sign In with Google</button>
		<small class="auth__error auth__error--main" v-if="authError">{{authError}}</small>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from "vue-property-decorator";
import { validateEmail } from "@/utils/validation";
import { animateReject } from "@/utils/animations";
import user from "@/store/modules/user";

interface SignInFormData {
	email: string;
	password: string;
}

@Component
export default class Login extends Vue {
	@Ref("authBox") readonly authBox!: HTMLDivElement;

	constructor() {
		super();
	}

	private formData: SignInFormData = {
		email: "",
		password: "",
	};

	private errors: SignInFormData = {
		email: "",
		password: "",
	};

	private authError = "";

	@Watch("formData", {
		deep: true,
	})
	validateForm(currData: SignInFormData, prevData: SignInFormData) {
		const realPrevData = JSON.parse(JSON.stringify({ prevData: prevData }));
		const shouldValidateEmail = currData.email !== realPrevData.email;

		shouldValidateEmail && this.handleEmailValidation(currData.email);
	}

	handleEmailValidation(email: string) {
		this.errors.email = validateEmail(email);
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

		user.signIn(this.formData)
			.then((data) => {
				this.$router.push("dashboard");
			})
			.catch((error) => {
				animateReject(this.authBox);
				const errorMessage = error.response.data.message;
				this.authError = errorMessage;
			});
	}

	signInWithGoogle() {
		// sign in with google oauth
	}
}
</script>
