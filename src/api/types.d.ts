export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignUpPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    'access-token': string;
    data: UserData;
}

export interface CreateBookPayload {
    name: string;
    description?: string;
}

export interface CreatePlantPayload {
    name: string;
    scientific_name?: string;
    description?: string;
    avatar_image?: string;
}

export interface SingleActionPlantPayload {
    plant_id: number;
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
    plants: Plant[];
    id: number;
}

export interface Plant {
    name: string;
    scientific_name: string;
    book_id: number;
}

export interface Moment {
    
}

export interface Settings {

}
