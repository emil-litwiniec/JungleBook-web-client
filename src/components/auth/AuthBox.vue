<template>
	<div class="auth__box">
		<button @click="$router.push('signIn')" class="auth__btn">Sign In</button>
		<button @click="$router.push('signUp')" class="auth__btn">Sign Up</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>
