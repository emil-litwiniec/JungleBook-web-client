import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store';

interface ModalComponentConfig {
    componentName: string;
    message?: string;
    callbackAction?: Function;
}

@Module({
    namespaced: true,
    name: 'modal',
    store: store,
    dynamic: true,
})
class ModalModule extends VuexModule {
    currentModalComponent: ModalComponentConfig | null = null;

    @Mutation
    SHOW_MODAL(modalComponentConfig: ModalComponentConfig) {
        this.currentModalComponent = modalComponentConfig;
    }

    @Mutation
    HIDE_MODAL() {
        this.currentModalComponent = null;
    }
}

export default getModule(ModalModule);
