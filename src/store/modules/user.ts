import { VuexModule, Module, getModule, Action } from 'vuex-module-decorators';
import store from '@/store';
import { API, signIn } from '@/api/api';
import { SignInRequest, SignInResponse, SignUpRequest} from "@/api/models";


@Module({
    namespaced: true,
    name: 'user',
    store: store,
    dynamic: true
})
class UserModule extends VuexModule {
    isAuthorized = false;
    userId = 0;

    @Action
    async signUp(payload: SignUpRequest) {
        return;
    }

    @Action({rawError: true})
    async signIn(payload: SignInRequest) {
        const response = await signIn(payload);
        if (response.data) {
            const data: SignInResponse = response.data;
            const token = data['access-token'];
            localStorage.setItem('x-access-token', token);
        }
        return response;
    }

    @Action
    async fetchUserData() {
        const response = await API.get(`user/${this.userId}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token') || ''
            }
        });
    }
}

export default getModule(UserModule);
