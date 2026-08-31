import axios from "axios"

export default async function handler(req, res) {
    const MAP_URL = 'https://us1.locationiq.com/v1/'
    const REVERSE_GEO_KEY = process.env.REVERSE_GEO_KEY

    const lat = req.query.lat || ''
    const lng = req.query.lng || ''

    try {
        const apiResponse = await axios.get(`${MAP_URL}reverse?key=${REVERSE_GEO_KEY}&lat=${lat}&lon=${lng}&format=json&`)
        const data = apiResponse.data

        return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ error: 'Failed to get location data.' })
    }
}