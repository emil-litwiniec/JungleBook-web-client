import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import {
    imageUpload,
    signIn,
    signUp,
    fetchUserData,
    createBook,
    waterPlants,
    dewPlants,
    createPlant,
    updatePlant,
} from '@/api/api';
import {
    AuthResponse,
    SignUpPayload,
    SignInPayload,
    UserData,
    Book,
    Plant,
    Settings,
    CreateBookPayload,
    ActionPlantPayload,
    ImageUploadPayload,
    CreatePlantPayload,
    UpdatePlantPayload,
} from '@/api/types';
import { getToken, setToken, removeToken } from '@/utils/cookies';
import { plants } from '@/utils/fixtures';
import settings, { SortBy } from '../modules/settings';
import { sortByNameIncrementally, sortByNameDecrementally, sortByLastWatering, sortByLastDew } from '@/utils/sortBy';
import router from '@/router/index';

export enum PlantActionType {
    WATER,
    DEW,
}

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

    createdAt = '';
    lastUpdate = '';

    books: Book[] = [];
    plants: Plant[] = plants;

    settings: Settings | null = null;

    get currentBookPlants() {
        const filteredPlants = this.plants.filter((plant) => plant.book_id === settings.selectedBookId);

        switch (settings.sortBy) {
            case SortBy.A_Z:
                return sortByNameIncrementally(filteredPlants);
            case SortBy.Z_A:
                return sortByNameDecrementally(filteredPlants);
            case SortBy.LAST_WATERED:
                return sortByLastWatering(filteredPlants);
            case SortBy.LAST_DEWED:
                return sortByLastDew(filteredPlants);
            default:
                return filteredPlants;
        }
    }

    get plantById() {
        return (plantId: number) => this.plants.find((plant) => plant.id === plantId);
    }

    get currentBook() {
        return this.books.find((book) => book.id === settings.selectedBookId);
    }

    get allCurrentBookPlantsIds() {
        return this.currentBookPlants.map((plant: Plant) => plant.id);
    }

    @Mutation
    SET_IS_AUTHORIZED(on: boolean) {
        this.isAuthorized = on;
    }

    @Mutation
    SET_USER_DATA(responseData: UserData) {
        const allPlants: Plant[] = [];
        const books = responseData.books;
        books.map((book) => {
            if (!book.plants) return;

            allPlants.push(...book.plants);
            delete book.plants;
        });

        this.userId = responseData.id;
        this.email = responseData.email;
        this.firstName = responseData.first_name;
        this.lastName = responseData.last_name;
        this.avatarImage = responseData.avatar_image;
        this.settings = responseData.settings;
        this.books = responseData.books;
        this.plants = allPlants;
        this.createdAt = responseData.created_at;
        this.lastUpdate = responseData.last_update;
    }

    @Action({ rawError: true })
    async signUp(payload: SignUpPayload) {
        const response = await signUp(payload);
        if (response.data) {
            const data: AuthResponse = response.data;
            const token = data['access-token'];
            setToken(token);

            const newBookPayload = {
                name: 'My First Book',
                description: 'We have created this book for you',
                avatar_image: '',
            };
            const createBookResponse = await createBook(newBookPayload);
        }
        return response;
    }

    @Action({ rawError: true })
    async signIn(payload: SignInPayload) {
        const response = await signIn(payload);
        if (response.data) {
            const data: AuthResponse = response.data;
            const token = data['access-token'];
            setToken(token);

            this.SET_IS_AUTHORIZED(true);

            const userData = data.data;
            this.SET_USER_DATA(userData);
        }
        return response;
    }

    @Action({ rawError: true })
    async signOut() {
        await new Promise((resolve, reject) => {
            try {
                removeToken();
                this.SET_IS_AUTHORIZED(false);
            } catch {
                return reject();
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
            if (settings.selectedBookId === null) {
                const firstBookId = response.data.data.books[0].id;
                settings.SET_SELECTED_BOOK_ID(firstBookId);
            }
        }
        return response;
    }

    @Action({ rawError: true })
    async createBook(payload: CreateBookPayload) {
        await createBook(payload);
    }

    @Action({ rawError: true })
    async createPlant(payload: CreatePlantPayload) {
        const response = await createPlant(payload);

        if (response.data) {
            const plantId = response.data.plant_id;

            this.fetchUserData().then(() => {
                router.push(`/plant/${plantId}`);
            });
        }
    }

    @Action({ rawError: true })
    async updatePlant(payload: UpdatePlantPayload) {
        const response = await updatePlant(payload);

        if (response.data) {
            this.fetchUserData();
        }
    }

    @Action({ rawError: true })
    async actionPlant({ data, plantActionType }: { data: ActionPlantPayload; plantActionType: number }) {
        if (plantActionType == PlantActionType.WATER) {
            await waterPlants(data);
        } else if (plantActionType == PlantActionType.DEW) {
            await dewPlants(data);
        }
        this.fetchUserData();
    }

    @Action({ rawError: true })
    async imageUpload(payload: ImageUploadPayload) {
        await imageUpload(payload);
    }
}

export default getModule(UserModule);
