import { weatherSchema, type WeatherData } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./api";

async function fetchWeatherByLocation(location: string) {
    try {
        const res = await apiClient.get('/get-weathers', {
            params: { location },
            schema: weatherSchema
        })

        return res.data

    } catch (error) {
        console.error('Failed to get data or data is invalid: ', error);
        throw error
    }
}

export function useWeathers(location: string) {
    return useQuery<WeatherData>({
        queryKey: [location],
        enabled: Boolean(location),
        refetchOnWindowFocus: false,
        queryFn: () => fetchWeatherByLocation(location)
    })
}

