import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { API, signIn } from '@/api/api';
import { SignInRequest, SignInResponse, SignUpRequest } from '@/api/types';
import { getToken, setToken, removeToken } from '@/utils/cookies';

@Module({
    namespaced: true,
    name: 'user',
    store: store,
    dynamic: true,
})
class UserModule extends VuexModule {
    isAuthorized = Boolean(getToken());
    userId = 0;

    @Mutation
    SET_IS_AUTHORIZED(on: boolean) {
        this.isAuthorized = on;
    }

    @Action
    async signUp(payload: SignUpRequest) {
        // const response = await signUp(payload);
        // if (response.data) {
        //     const data: SingUpResponse = response.data;
        //     const token = data['access-token'];
        //     setToken(token);
        // }
        // return;
    }

    @Action({ rawError: true })
    async signIn(payload: SignInRequest) {
        const response = await signIn(payload);
        if (response.data) {
            const data: SignInResponse = response.data;
            const token = data['access-token'];
            setToken(token);
            this.SET_IS_AUTHORIZED(true);
            const userData = data.data;
            this.SET_USER_ID(userData.id);
        }
        return response;
    }

    @Mutation
    SET_USER_ID(id: number) {
        this.userId = id;
    }

    @Action({ rawError: true })
    async signOut() {
        await new Promise((resolve, reject) => {
            try {
                removeToken();
                this.SET_IS_AUTHORIZED(true);
            } catch {
                return resolve('Catch block from signout');
            }
            const token = getToken();

            return !token ? resolve() : reject();
        });
    }

    @Action
    async fetchUserData() {
        const response = await API.get(`user/${this.userId}`, {
            headers: {
                'x-access-token': getToken(),
            },
        });
    }
}

export default getModule(UserModule);
