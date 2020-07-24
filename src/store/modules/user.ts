import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { API, signIn, signUp, fetchUserData } from '@/api/api';
import { AuthResponse, SignUpRequest, SignInRequest, UserData, Book, Plant, Moment, Settings } from '@/api/types';
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
    email = '';
    firstName = '';
    lastName = '';

    avatarImage: string | null = null;

    createdAt: Date = new Date();
    lastUpdate: Date = new Date();

    books: Book[] = [];
    plants: Plant[] = [];

    settings: Settings | null = null;

    @Mutation
    SET_IS_AUTHORIZED(on: boolean) {
        this.isAuthorized = on;
    }

    @Mutation
    SET_USER_DATA(responseData: UserData) {
        console.log(responseData);
        this.userId = responseData.id;
        this.email = responseData.email;
        this.firstName = responseData.first_name;
        this.lastName = responseData.last_name;
        this.avatarImage = responseData.avatar_image;
        this.settings = responseData.settings;
        this.books = responseData.books;
        this.plants = responseData.plants;
        this.createdAt = responseData.created_at;
        this.lastUpdate = responseData.last_update;
    }

    @Mutation
    SET_USER_ID(id: number) {
        this.userId = id;
    }

    @Action({ rawError: true })
    async signUp(payload: SignUpRequest) {
        const response = await signUp(payload);
        if (response.data) {
            const data: AuthResponse = response.data;
            const token = data['access-token'];
            setToken(token);
        }
        return response;
    }

    @Action({ rawError: true })
    async signIn(payload: SignInRequest) {
        const response = await signIn(payload);
        if (response.data) {
            const data: AuthResponse = response.data;
            const token = data['access-token'];
            setToken(token);
            this.SET_IS_AUTHORIZED(true);
            const userData = data.data;
            this.SET_USER_ID(userData.id);
        }
        return response;
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

    @Action({ rawError: true })
    async fetchUserData() {
        const response = await fetchUserData();

        if (response.data) {
            this.SET_USER_DATA(response.data.data);
        }
        return response;
    }
}

export default getModule(UserModule);
