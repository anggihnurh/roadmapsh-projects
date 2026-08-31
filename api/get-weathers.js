import axios from "axios"

export default async function handler(req, res) {
    const API_URL = process.env.WEATHER_API_URL
    const API_KEY = process.env.WEATHER_API_KEY
    const location = req.query.location || ''

    try {
        const apiResponse = await axios.get(`${API_URL}/${location}`, {
            params: { key: API_KEY }
        })

        const data = apiResponse.data
        return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ error: 'Failed to get weathers data.' })
    }
}