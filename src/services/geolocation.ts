import { queryOptions } from "@tanstack/react-query"
import axios from "axios"

export async function reverseGeolocation(lat: number, lon: number) {
    const res = await axios.get('/api/get-reverse-geo', {
        params: { lat, lon }
    })
    return res.data
}

export const reverseGeolocationQueryOptions = (lat: number, lon: number) => {
    return queryOptions({ queryKey: [lat, lon], queryFn: () => reverseGeolocation(lat, lon) })
}