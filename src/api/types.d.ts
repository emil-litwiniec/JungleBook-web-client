export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    'access-token': string;
    data: UserData;
}

export interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar_image: string | null;
    settings: null;
    books: Book[];
    plants: Plant[];
    created_at: Date;
    last_update: Date;
}

export interface Book {

}

export interface Plant {

}

export interface Moment {

}

export interface Settings {

}