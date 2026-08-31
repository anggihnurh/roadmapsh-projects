import type { WeatherData } from "@/types/weather";
import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchWeatherByLocation(location: string) {
    const res = await axios.get(`/api/get-weathers?location=${location}`)
    return res.data
}

export function useWeathers(location: string) {
    return useQuery<WeatherData>({
        queryKey: ['weathers', location],
        enabled: Boolean(location),
        refetchOnWindowFocus: false,
        queryFn: () => fetchWeatherByLocation(location)
    })
}

export async function reverseGeolocation(lat: number, lng: number) {
    const res = await axios.get('/api/get-reverse-geo', {
        params: { lat, lng }
    })
    return res.data
}

export const reverseGeolocationQueryOptions = (lat: number, lng: number) => {
    return queryOptions({ queryKey: ['latlng', lat, lng], queryFn: () => reverseGeolocation(lat, lng) })
}