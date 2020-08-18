<template>
	<div class="check-box__wrapper">
		<label class="check-box__label">
			<input class="check-box__input" type="checkbox" v-model="isChecked"/>
			<div class="check-box__display">
				<tick-icon />
			</div>
		</label>
	</div>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from "vue-property-decorator";

import TickIcon from "@/components/misc/icons/TickIcon.vue";

@Component({
	name: "CheckBox",
	components: {
		TickIcon,
	},
})
export default class CheckBox extends Vue {
	@PropSync("customVModel", { type: Boolean, default: false }) isChecked!: boolean;
}
</script>


