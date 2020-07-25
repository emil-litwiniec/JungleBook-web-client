<template>
	<div class="loader" :class="`loader--${color}`">
		<svg width="40" height="76" viewBox="0 0 40 76" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g class="loader__group" id="loader">
				<path
					class="loader__stalk"
					id="stalk"
					d="M16.2887 75.9999C16.2887 68.7786 29.5153 63.5981 20.8512 51.8242C14.382 43.033 15.6848 36.9106 20.8512 30.4654C30.4632 18.4742 16.2887 9.93808 16.2887 2.32983"
					stroke="#F3F3F3"
					stroke-width="2.96907"
				/>
				<path
					class="loader__leaf loader__leaf--1"
					id="leaf-1"
					d="M27.1919 51.1716C26.5099 47.3253 28.1038 40.9741 37.6754 42.0689C37.9339 48.9962 32.9992 50.9549 27.1919 51.1716Z"
					stroke="#F3F3F3"
					stroke-width="2.96907"
				/>
				<path
					class="loader__leaf loader__leaf--3"
					id="leaf-3"
					d="M26.9124 11.8313C26.2305 7.98492 27.8243 1.63375 37.396 2.72862C37.6544 9.65589 32.7198 11.6146 26.9124 11.8313Z"
					stroke="#F3F3F3"
					stroke-width="2.96907"
				/>
				<path
					class="loader__leaf loader__leaf--2"
					id="leaf-2"
					d="M12.8081 32.6147C13.4901 28.7684 11.8962 22.4172 2.32456 23.5121C2.06612 30.4393 7.00076 32.3981 12.8081 32.6147Z"
					stroke="#F3F3F3"
					stroke-width="2.96907"
				/>
			</g>
		</svg>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";
import { gsap } from "gsap";

@Component({
	name: "LoaderAnimation",
})
export default class LoaderAnimation extends Vue {
	@Prop({ default: "light" }) readonly color!: "light" | "dark";

	mounted() {
		this.fadeIn();
		this.animateLeaf();
	}

	fadeIn() {
		gsap.timeline().fromTo(
			".loader",
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.6,
				ease: "power3.inOut",
			}
		);
	}

	public fadeOut = async () => {
		await new Promise((resolve) => {
			gsap.timeline({
				onComplete: () => {
					resolve();
				},
			}).fromTo(
				".loader",
				{
					opacity: 1,
				},
				{
					opacity: 0,
					duration: 0.7,
					ease: "power3.inOut",
				}
			);
		});
	};

	animateLeaf() {
		gsap.timeline({
			repeat: -1,
		}).fromTo(
			".loader__stalk",
			{
				strokeDashoffset: 200,
			},
			{
				strokeDashoffset: 0,
				duration: 2.6,
			}
		);

		gsap.timeline({
			repeat: -1,
			repeatDelay: 0.4,
		})
			.fromTo(
				".loader__leaf--1",
				{
					opacity: 0,
					scale: 0,
				},
				{
					opacity: 1,
					scale: 1,
					duration: 1,
					ease: "elastic.out(0.8, 0.5)",
				}
			)
			.fromTo(
				".loader__leaf--2",
				{
					opacity: 0,
					scale: 0,
				},
				{
					opacity: 1,
					scale: 1,
					duration: 1,
					ease: "elastic.out(1, 0.5)",
				},
				">-0.4"
			)
			.fromTo(
				".loader__leaf--3",
				{
					opacity: 0,
					scale: 0,
				},
				{
					opacity: 1,
					scale: 1,
					duration: 1,
					ease: "elastic.out(1, 0.5)",
				},
				">-0.4"
			);
	}
}
</script>
