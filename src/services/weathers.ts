import type { WeatherData } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchWeatherByLocation(location: string) {
    const res = await axios.get('/api/get-weathers', { params: { location } })
    return res.data
}

export function useWeathers(location: string) {
    return useQuery<WeatherData>({
        queryKey: [location],
        enabled: Boolean(location),
        refetchOnWindowFocus: false,
        queryFn: () => fetchWeatherByLocation(location)
    })
}

