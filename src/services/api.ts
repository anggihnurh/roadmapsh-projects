import { type, Type } from "arktype";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";


interface CustomRequestConfig extends InternalAxiosRequestConfig {
    schema?: Type<any>
}

const apiClient = axios.create({
    baseURL: "/api",
    timeout: 10000
})

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const config = response.config as CustomRequestConfig
        const schema = config.schema

        if (schema) {
            const out = schema(response.data)

            if (out instanceof type.errors) {
                console.error('Arktype validation failed:', out.summary);
                return Promise.reject(new Error(`Api Data Mismatch: ${out.summary}`))
            }

            response.data = out
        }

        return response

    }, error => {
        return Promise.reject(error);
    })

export default apiClient