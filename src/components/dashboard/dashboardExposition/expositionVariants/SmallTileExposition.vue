<template>
	<div class="exposition exposition--small-tile">
		<div class="tile" v-for="plant in plants" :key="plant.id">
			<div class="tile__image">
				<img :src="imgPath" alt="Plant image" />
			</div>
			<div class="tile__content">
				<div class="tile__stats">
					<div class="tile__alerts"></div>
					<div class="tile__days">
						<span>
							Last watered:
							<span class="big">1 day</span>
						</span>
						<span>
							Last dewed:
							<span class="big">1 day</span>
						</span>
					</div>
				</div>
				<div class="tile__headers">
					<h4>{{plant.name}}</h4>
					<h5>{{plant.scientific_name}}</h5>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import settings, { DashboardViews } from "@/store/modules/settings";
import { Plant } from "@/api/types";

@Component({
	name: "SmallTileExposition",
})
export default class SmallTileExposition extends Vue {
	@Prop({ default: [] }) readonly plants!: Plant[];

	get imgPath() {
		return require("@/assets/img/mock-plant-2.jpg");
	}
}
</script>
