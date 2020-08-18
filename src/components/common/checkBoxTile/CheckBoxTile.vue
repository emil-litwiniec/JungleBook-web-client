<template>
	<div class="check-box-tile__wrapper">
		<label class="check-box-tile__label">
			<input class="check-box-tile__input" type="checkbox" v-model="isChecked" />
			<div class="check-box-tile__display"></div>
		</label>
	</div>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from "vue-property-decorator";

@Component({
	name: "CheckBoxTile",
})
export default class CheckBoxTile extends Vue {
	@PropSync("customVModel", { type: Boolean, default: false })
	isChecked!: boolean;
}
</script>


