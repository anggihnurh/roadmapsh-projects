import axios from "axios"

export default async function handler(req, res) {
    const API_URL = 'https://us1.locationiq.com/v1/reverse'
    const API_KEY = process.env.REVERSE_GEO_KEY

    try {
        const apiResponse = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                lat: String(req.query.lat),
                lon: String(req.query.lon),
                format: 'json'
            }
        })

        const data = apiResponse.data
        return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ error: 'Failed to get location data.' })
    }
}