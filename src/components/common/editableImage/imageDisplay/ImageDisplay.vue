<template>
	<div class="image-display">
		<img :src="imgPath" alt="Plant image" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";
import { Loader } from "@/components/types";
import ProfileIcon from "@/components/misc/icons/ProfileIcon.vue";

@Component({
	name: "ImageDisplay",
	components: {
		ProfileIcon,
	},
})
export default class ImageDisplay extends Vue {
	@Prop() imgPath!: string;
}
</script>
