import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';

export enum DashboardViews {
    LIST,
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
}

export default getModule(SettingsModule);
