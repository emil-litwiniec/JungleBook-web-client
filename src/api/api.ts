import axios from 'axios';
import { SignInRequest, SignInResponse, SignUpRequest} from "@/api/models";

export const API = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:5000/api/",
    timeout: 1500,
})

export async function signIn(payload: SignInRequest) {
    const response = await API.post('sign-in', payload, {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
          },
    });
    return response;
} 