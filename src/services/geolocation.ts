import { geolocationSchema, type GeolocationData } from "@/types/geolocation";
import { queryOptions } from "@tanstack/react-query";
import apiClient from "./api";

export async function reverseGeolocation(lat: number, lon: number): Promise<GeolocationData> {
    try {
        const res = await apiClient.get<GeolocationData>('/get-reverse-geo', {
            params: { lat, lon },
            schema: geolocationSchema
        })

        return res.data

    } catch (error) {
        console.error('Failed to get data or data invalid: ', error);
        throw error
    }
}

export const reverseGeolocationQueryOptions = (lat: number, lon: number) => {
    return queryOptions({
        queryKey: [lat, lon],
        queryFn: () => reverseGeolocation(lat, lon)
    })
}