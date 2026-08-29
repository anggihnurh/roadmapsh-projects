import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

async function fetchWeatherByLocation(location: string) {
    const res = await axios.get(`${API_BASE_URL}/${location}?key=${API_KEY}`)
    return res.data
}

export function useWeathers(location: string) {
    return useQuery({
        queryKey: ['weathers'],
        enabled: false,
        refetchOnWindowFocus: false,
        queryFn: () => fetchWeatherByLocation(location)
    })
}