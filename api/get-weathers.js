import axios from "axios"

export default async function handler(req, res) {
    const WEATHER_API_URL = process.env.WEATHER_API_URL
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY



    const location = req.query.location || ''
    console.log('loc -> ', location);
    console.log('url -> ', `${WEATHER_API_URL}/${location}?key=${WEATHER_API_KEY}`);

    try {
        const apiResponse = await axios.get(`${WEATHER_API_URL}/${location}?key=${WEATHER_API_KEY}`)
        const data = apiResponse.data

        return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ error: 'Failed to get weathers data.' })
    }
}