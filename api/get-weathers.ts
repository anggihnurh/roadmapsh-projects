import type { VercelRequest, VercelResponse } from '@vercel/node';
import { type } from "arktype";
import axios from "axios";

const locationQuerySchema = type('string')

export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method != 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" })
    }

    try {
        const API_URL = process.env.WEATHER_API_URL
        const API_KEY = process.env.WEATHER_API_KEY

        if (!API_URL || !API_KEY) {
            return res.status(500).json({
                error: 'Internal Server Error',
                detail: 'Server configuration (.env) is not complete.'
            })
        }

        const location = req.query.location || ''

        if (locationQuerySchema(location) instanceof type.errors) {
            return res.status(400).json({
                error: 'Bad Request',
                details: `must be more than 3 characters.`
            });

        }

        const apiResponse = await axios.get(`${API_URL}/${location}/yesterday/tomorrow`, {
            params: { key: API_KEY, unitGroup: 'us' }
        })

        return res.status(200).json(apiResponse.data)

    } catch {
        return res.status(500).json({ error: 'Failed to get weathers data.' })
    }
}