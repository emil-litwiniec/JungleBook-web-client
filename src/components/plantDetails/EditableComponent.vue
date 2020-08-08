<template>
	<div>
		<template v-if="editMode">
			<input
				v-if="!textArea"
				v-model="syncModel"
				:class="`${customClass}__input`"
				class="active"
				:placeholder="inputPlaceholder"
			/>
			<textarea
				v-else
				v-model="syncModel"
				spellcheck="false"
				:class="`${customClass}__input`"
				class="active"
				:placeholder="inputPlaceholder"
			></textarea>
		</template>
		<template v-if="!editMode">
			<template v-if="textArea">
				<component
					:is="tag"
					:class="`${customClass}__display`"
					v-for="(paragraph, index) in formattedText"
					:key="index"
					v-text="paragraph"
				/>
			</template>
			<component v-else :is="tag" :class="`${customClass}__display`" v-text="syncModel" />
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, PropSync } from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";

const emptyPlantDetails = {
	name: "",
	scientific_name: "",
};

@Component({
	name: "EditableComponent",
	components: {},
})
export default class EditableComponent extends Vue {
	@Prop({ default: false }) editMode!: boolean;
	@Prop({ default: "span" }) tag!: string;
	@Prop({ default: "" }) customClass!: string;
	@Prop({ default: "" }) inputName!: string;
	@Prop({ default: false }) textArea!: boolean;
	@Prop({ default: "" }) inputPlaceholder!: string;
	@PropSync("customVModel", { type: String }) syncModel!: string;

	get formattedText() {
		if (!this.syncModel) return [''];
		return this.syncModel.split("\n\n");
	}
}
</script>
