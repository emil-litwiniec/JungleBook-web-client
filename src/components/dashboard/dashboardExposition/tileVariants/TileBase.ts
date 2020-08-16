import { Component, Prop, Vue } from 'vue-property-decorator';
import user, { PlantActionType } from '@/store/modules/user';
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

    get imgPath() {
        return require('@/assets/img/mock-plant-2.jpg');
    }

    uniqueKey() {
        return uuidv4();
    }

    handleButtonDew(plantId: number) {
        user.singleActionPlant({
            data: { plant_id: plantId },
            plantActionType: PlantActionType.DEW,
        }).then(() => {
            user.fetchUserData();
        });
    }

    handleButtonWater(plantId: number) {
        user.singleActionPlant({
            data: { plant_id: plantId },
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
