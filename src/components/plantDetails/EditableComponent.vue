<template>
	<div class="relative" style="width: max-content;">
		<template v-if="editMode">
			<div :class="{'selection': editMode, 'active': isActive}">
				<input
					v-if="isInputMode"
					v-model="syncModel"
					:class="`${customClass}__input`"
					:placeholder="inputPlaceholder"
					@focus="handleFocus"
					@blur="handleBlur"
					ref="editableInput"
				/>
				<textarea
					v-if="isTextAreaMode"
					v-model="syncModel"
					spellcheck="false"
					:class="`${customClass}__input`"
					:placeholder="inputPlaceholder"
					@focus="handleFocus"
					@blur="handleBlur"
					ref="editableInput"
				></textarea>

				<button class="selection__btn" @click="handleSelectionBtn">
					<edit-icon />
				</button>
			</div>
		</template>
		<template v-if="!editMode">
			<template v-if="isTextAreaMode">
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
import {
	Component,
	Prop,
	Vue,
	PropSync,
	Ref,
	Watch,
} from "vue-property-decorator";
import user from "@/store/modules/user";
import settings, { DashboardViews } from "@/store/modules/settings";
import EditIcon from "@/components/misc/icons/EditIcon.vue";


@Component({
	name: "EditableComponent",
	components: {
		EditIcon,
	},
})
export default class EditableComponent extends Vue {
	@Prop({ default: false }) editMode!: boolean;
	@Prop({ default: "span" }) tag!: string;
	@Prop({ default: "" }) customClass!: string;
	@Prop({ default: "" }) inputName!: string;
	@Prop({ default: "input" }) inputMode!: "input" | "textarea";
	@Prop({ default: "" }) inputPlaceholder!: string;

	@PropSync("customVModel", { type: String }) syncModel!: string;

	isActive = false;

	get isTextAreaMode() {
		return this.inputMode === "textarea";
	}

	get isInputMode() {
		return this.inputMode === "input";
	}

	@Ref("editableInput") readonly editableInput!:
		| HTMLInputElement
		| HTMLTextAreaElement;

	get formattedText() {
		if (!this.syncModel) return [""];
		return this.syncModel.split("\n\n");
	}

	handleFocus() {
		this.isActive = true;
	}

	handleBlur() {
		this.isActive = false;
	}

	handleSelectionBtn() {
		this.editableInput.focus();
	}

}
</script>
