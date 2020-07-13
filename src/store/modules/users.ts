import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'users',
    store: store,
    dynamic: true
})
class UsersModule extends VuexModule {

}

export default getModule(UsersModule);
