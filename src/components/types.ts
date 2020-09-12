import { SortBy } from '@/store/modules/settings';

export interface Loader extends Vue {
    fadeOut(): Promise<any>;
}

export interface SortOptions {
    [SortBy.A_Z]: Option;
    [SortBy.Z_A]: Option;
    [SortBy.LAST_WATERED]: Option;
    [SortBy.LAST_DEWED]: Option;
}

export interface Option {
    name: string;
    label: string;
    id: any;
}

export interface SignInFormData {
    email: string;
    password: string;
}

export interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface PlantFormData {
    name: string;
    scientific_name: string;
    description: string;
    temperature: number[];
    positionId: number;
    water_interval: string;
    avatar_image: string;
}
