import { Component, Prop, Vue } from 'vue-property-decorator';
import user, { PlantActionType } from '@/store/modules/user';
import settings from '@/store/modules/settings';
import { Plant } from '@/api/types.d.ts';
import { formatDays } from '@/utils/format';
const uuidv4 = require('uuid').v4;

@Component({
    name: 'TileBase',
})
export default class TileBase extends Vue {
    @Prop() readonly plant!: Plant;

    addPlantKey = this.uniqueKey();
    formatDays = formatDays;

    get isSelectionMode() {
        return settings.isSelectionMode;
    }

    get imgPath() {
        return require('@/assets/img/mock-plant-2.jpg');
    }

    get isSelected() {
        return settings.currentlySelected.includes(this.plant.id);
    }

    set isSelected(on: boolean) {
        if (this.isSelected) {
            !on && settings.REMOVE_FROM_SELECTION(this.plant.id);
        } else {
            on && settings.ADD_TO_SELECTION(this.plant.id);
        }
    }

    uniqueKey() {
        return uuidv4();
    }

    handleButtonDew(plantId: number) {
        user.actionPlant({
            data: { plant_ids: [plantId] },
            plantActionType: PlantActionType.DEW,
        }).then(() => {
            user.fetchUserData();
        });
    }

    handleButtonWater(plantId: number) {
        user.actionPlant({
            data: { plant_ids: [plantId] },
            plantActionType: PlantActionType.WATER,
        }).then(() => {
            user.fetchUserData();
        });
    }

    handleButtonDetails(plantId: number) {
        this.$router.push(`/plant/${plantId}`);
    }

    handleAddPlant() {
        this.$router.push('plant/add');
    }
}
