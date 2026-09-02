import type { VercelRequest, VercelResponse } from '@vercel/node'
import { type } from 'arktype'
import axios from 'axios'

const coordinateSchema = type('string > 0')

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    try {
        const API_URL = 'https://us1.locationiq.com/v1/reverse'
        const API_KEY = process.env.REVERSE_GEO_KEY

        if (!API_KEY) {
            return res.status(500).json({
                error: 'Internal Server Error',
                detail: 'Server configuration (.env) is not complete.'
            })
        }

        const lat = typeof req.query.lat === 'string' ? req.query.lat : ''
        const lon = typeof req.query.lon === 'string' ? req.query.lon : ''

        if (coordinateSchema(lat) instanceof type.errors || coordinateSchema(lon) instanceof type.errors) {
            return res.status(400).json({
                error: 'Bad Request',
                details: 'lat and lon are required query parameters.'
            })
        }

        const apiResponse = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                lat,
                lon,
                format: 'json'
            }
        })

        return res.status(200).json(apiResponse.data)

    } catch {
        return res.status(500).json({ error: 'Failed to get location data.' })
    }
}
