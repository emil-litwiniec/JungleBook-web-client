import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import EventBus, { BusEvents } from '@/utils/EventBus';

export enum DashboardViews {
    LIST_TILE,
    SMALL_TILE,
    BIG_TILE,
}

export enum SortBy {
    A_Z,
    Z_A,
    LAST_WATERED,
    LAST_DEWED,
}

@Module({
    namespaced: true,
    name: 'settings',
    store: store,
    dynamic: true,
})
class SettingsModule extends VuexModule {
    dashboardViewMode: DashboardViews = DashboardViews.SMALL_TILE;
    sortBy: SortBy = SortBy.A_Z;
    currentlySelected: number[] = [];
    isSelectionMode = false;
    isEditMode = false;
    selectedBookId: number | null = null;
    isPlantDataFormValid = true;

    @Mutation
    SET_SELECTED_BOOK_ID(bookId: number) {
        this.selectedBookId = bookId;
    }

    @Mutation
    SET_DASHBOARD_VIEW_MODE(viewMode: DashboardViews) {
        this.dashboardViewMode = viewMode;
    }

    @Mutation
    SET_SORT_BY(sortBy: SortBy) {
        this.sortBy = sortBy;
    }

    @Mutation
    ADD_TO_SELECTION(plantId: number) {
        this.currentlySelected.push(plantId);
    }

    @Mutation
    REMOVE_FROM_SELECTION(plantId: number) {
        const plantIndex = this.currentlySelected.findIndex((storePlantId) => storePlantId === plantId);
        this.currentlySelected.splice(plantIndex, 1);
    }

    @Mutation
    SELECT_ALL(plantIds: number[]) {
        this.currentlySelected = plantIds;
    }

    @Mutation
    CLEAR_SELECTION() {
        this.currentlySelected = [];
    }

    @Mutation
    SWITCH_SELECTION_MODE() {
        this.isSelectionMode = !this.isSelectionMode;
    }

    @Mutation
    SET_EDIT_MODE(on: boolean) {
        this.isEditMode = on;
    }

    @Mutation
    SET_IS_PLANT_DATA_FORM_VALID(on: boolean) {
        this.isPlantDataFormValid = on;
    }

    @Action
    setEditMode(on: boolean) {
        if (!this.isPlantDataFormValid) {
            this.SET_EDIT_MODE(true);
            EventBus.$emit(BusEvents.PLANT_FORM_DATA_ERROR);
        } else {
            this.SET_EDIT_MODE(on);
            if (!on) {
                EventBus.$emit(BusEvents.PLANT_FORM_DATA_SAVE)
            }
        }
    }
}

export default getModule(SettingsModule);
