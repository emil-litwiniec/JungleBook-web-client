export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    'access-token': string;
    data: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        avatar_image: string | null;
        settings: null;
        books: [];
        plants: [];
        created_at: Date;
        last_update: Date;
    }
}