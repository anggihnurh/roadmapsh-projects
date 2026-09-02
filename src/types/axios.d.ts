import 'axios';
import { Type } from 'arktype';

declare module 'axios' {
    // 1. Perluas interface AxiosRequestConfig agar metode .get(), .delete() membaca kustom properti ini
    export interface AxiosRequestConfig {
        schema?: Type<any>;
    }

    // 2. Perluas juga InternalAxiosRequestConfig untuk digunakan di dalam interceptor
    export interface InternalAxiosRequestConfig {
        schema?: Type<any>;
    }
}
