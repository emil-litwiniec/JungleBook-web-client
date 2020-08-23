import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'modal',
    store: store,
    dynamic: true,
})
class ModalModule extends VuexModule {
    currentModalComponent: string | null = null;

    @Mutation
    SHOW_MODAL(modalComponentName: string) {
        this.currentModalComponent = modalComponentName;
    }

    @Mutation
    HIDE_MODAL() {
        this.currentModalComponent = null;
    }
}

export default getModule(ModalModule);
