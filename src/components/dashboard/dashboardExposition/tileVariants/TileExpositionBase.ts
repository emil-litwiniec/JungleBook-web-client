import { Component, Prop, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";
const uuidv4 = require("uuid").v4;

@Component({
	name: "TileExpositionBase",
})
export default class TileExpositionBase extends Vue {
	get plants() {
		return user.currentBookPlants;
	}

	get mappedPlants() {
		const mappedPlants = this.plants.map((plant: any) => ({
			...plant,
			type: "regular",
		}));
		mappedPlants.push({ type: "addPlant" });
		return mappedPlants;
	}

	uniqueKey() {
		return uuidv4();
	}
}