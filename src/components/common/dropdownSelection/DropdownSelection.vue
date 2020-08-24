<template>
	<div class="dropdown">
		<div class="dropdown__selected">
			<span>{{selectedOption.label}}</span>
		</div>
		<div class="dropdown__select-box">
			<div
				class="dropdown__option"
				v-for="option in options"
				:key="option.id"
				@click="onSelect(option.id)"
			>
				<input
					v-if="option.id === selectedOption.id"
					type="radio"
					:id="option.name"
					name="category"
					checked
				/>
				<input v-else type="radio" :id="option.name" name="category" />

				<label :for="option.name">{{option.label}}</label>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Option } from "@/components/types";

@Component({
	name: "DropdownSelection",
})
export default class DropdownSelection extends Vue {
	@Prop({ default: [] }) options!: Option[];
	@Prop() selectedOption!: Option;

	@Emit()
	onSelect(optionId: any) {
		return optionId;
	}
}
</script>
