<template>
	<div class="line-separator" :class="`line-separator--${isHorizontal ? 'horizontal' : 'vertical'}`"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
	name: "LineSeparator",
})
export default class LineSeparator extends Vue {
	@Prop({ default: false }) readonly isHorizontal!: boolean;
}
</script>
