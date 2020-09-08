import axios, { AxiosResponse } from 'axios';
import {
    ImageUploadPayload,
    SignInPayload,
    SignUpPayload,
    AuthResponse,
    CreateBookPayload,
    CreatePlantPayload,
    ActionPlantPayload,
    UpdatePlantPayload,
} from '@/api/types';
import { getToken } from '@/utils/cookies';

export const API = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:5000/api/',
    timeout: 3000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    },
});

export async function signIn(payload: SignInPayload): Promise<AxiosResponse<AuthResponse>> {
    const response = await API.post('sign-in', payload);
    return response;
}

export async function signUp(payload: SignUpPayload): Promise<AxiosResponse<AuthResponse>> {
    const response = await API.post('sign-up', payload);
    return response;
}

export async function fetchUserData() {
    const response = await API.get(`user`, {
        headers: {
            'x-access-token': getToken(),
        },
    });

    return response;
}

export async function createBook(payload: CreateBookPayload): Promise<AxiosResponse> {
    const response = await API.post('book', payload, {
        headers: {
            'x-access-token': getToken(),
        },
    });

    return response;
}

export async function createPlant(payload: CreatePlantPayload): Promise<AxiosResponse> {
    const response = await API.post('plant', payload, {
        headers: {
            'x-access-token': getToken(),
        },
    });

    return response;
}

export async function updatePlant(payload: UpdatePlantPayload): Promise<AxiosResponse> {
    const response = await API.put('plant', payload, {
        headers: {
            'x-access-token': getToken(),
        },
    });

    return response;
}

export async function waterPlants(payload: ActionPlantPayload): Promise<AxiosResponse> {
    const response = await API.put('plant/watering', payload, {
        headers: {
            'x-access-token': getToken(),
        },
    });

    return response;
}

export async function dewPlants(payload: ActionPlantPayload): Promise<AxiosResponse> {
    const response = await API.put('plant/dew', payload, {
        headers: {
            'x-access-token': getToken(),
        },
    });

    return response;
}

export async function imageUpload(payload: ImageUploadPayload) {
    const response = await API.post('images', payload, {
        headers: {
            'x-access-token': getToken(),
        },
    });
    return response;

    // return axios.post(url, formData)
    //     .then(x => x.data)
    //     .then(x => x.map(img => Object.assign({},
    //         img, { url: `${BASE_URL}/images/${img.id}` }))); ???
}
