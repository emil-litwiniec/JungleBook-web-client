<template>
    <div :class="`${className}__wrapper`">
        <template v-if="editMode">
            <input v-if="!textArea" v-model="syncModel" class="active" :placeholder="inputPlaceholder" />
            <textarea v-else v-model="syncModel" name="" id="" cols="30" rows="10" class="active" :placeholder="inputPlaceholder"></textarea>
        </template>
        <component v-if="!editMode" :is="tag" :class="className" v-text="syncModel" />
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
    @Prop({default: false}) editMode!: boolean;
    @Prop({default: 'span'}) tag!: string;
    @Prop({default: ''}) className!: string;
    @Prop({default: ''}) inputName!: string;
    @Prop({default: false}) textArea!: boolean;
    @Prop({default: {}}) textAreaConfig: any;
    @Prop({default: ''}) inputPlaceholder!: string;
    @PropSync("customVModel", { type: String }) syncModel!: string;

}
</script>
