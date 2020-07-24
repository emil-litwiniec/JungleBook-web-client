import axios, { AxiosResponse } from 'axios';
import { SignInRequest, SignUpRequest, AuthResponse} from "@/api/types";
import { getToken } from '@/utils/cookies';

export const API = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:5000/api/",
    timeout: 1500,
    headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*"
    }
})

export async function signIn(payload: SignInRequest): Promise<AxiosResponse<AuthResponse>>{
    const response = await API.post('sign-in', payload);
    return response;
} 

export async function signUp(payload: SignUpRequest): Promise<AxiosResponse<AuthResponse>> {
    const response = await API.post('sign-up', payload);
    return response;
} 

export async function fetchUserData() {
    const response = await API.get(`user`, {
        headers: {
            'x-access-token': getToken()
        },
    });
    
    return response;
}