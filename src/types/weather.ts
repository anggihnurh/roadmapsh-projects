import { type } from "arktype"

export const WeatherCurrentConditions = type({
  datetime: "string",
  datetimeEpoch: "number",
  temp: "number",
  feelslike: "number",
  humidity: "number",
  dew: "number",
  precip: "number | null",
  precipprob: "number",
  snow: "number",
  snowdepth: "number",
  "preciptype": "string[] | null",
  "windgust": "number | null",
  windspeed: "number",
  winddir: "number",
  pressure: "number",
  visibility: "number",
  cloudcover: "number",
  solarradiation: "number",
  "solarenergy": "number | null",
  uvindex: "number",
  conditions: "string",
  icon: "string",
  "stations?": "string[]",
  source: "string",
  sunrise: "string",
  sunriseEpoch: "number",
  sunset: "string",
  sunsetEpoch: "number",
  moonphase: "number"
})
export type WeatherCurrentConditions = typeof WeatherCurrentConditions.infer

export const WeatherHour = type({
  datetime: "string",
  datetimeEpoch: "number",
  temp: "number",
  feelslike: "number",
  humidity: "number",
  dew: "number",
  precip: "number | null",
  precipprob: "number",
  snow: "number",
  snowdepth: "number",
  "preciptype": "string[] | null",
  "windgust": "number | null",
  windspeed: "number",
  winddir: "number",
  pressure: "number",
  visibility: "number",
  cloudcover: "number",
  solarradiation: "number",
  "solarenergy": "number | null",
  uvindex: "number",
  "severerisk?": "number",
  conditions: "string",
  icon: "string",
  "stations?": "string[] | null",
  source: "string",
  "sunrise?": "string",
  "sunriseEpoch?": "number",
  "sunset?": "string",
  "sunsetEpoch?": "number",
  "moonphase?": "number",
  "period?": "string",
  "relativeLabel?": "string"
})
export type WeatherHour = typeof WeatherHour.infer

export const WeatherDay = type({
  datetime: "string",
  datetimeEpoch: "number",
  tempmax: "number",
  tempmin: "number",
  temp: "number",
  feelslikemax: "number",
  feelslikemin: "number",
  feelslike: "number",
  dew: "number",
  humidity: "number",
  precip: "number | null",
  precipprob: "number",
  precipcover: "number",
  "preciptype": "string[] | null",
  snow: "number",
  snowdepth: "number",
  windgust: "number",
  windspeed: "number",
  winddir: "number",
  pressure: "number",
  cloudcover: "number",
  visibility: "number",
  solarradiation: "number",
  solarenergy: "number",
  uvindex: "number",
  "severerisk?": "number",
  sunrise: "string",
  sunriseEpoch: "number",
  sunset: "string",
  sunsetEpoch: "number",
  moonphase: "number",
  conditions: "string",
  description: "string",
  icon: "string",
  "stations?": "string[] | null",
  source: "string",
  "hours?": WeatherHour.array()
})
export type WeatherDay = typeof WeatherDay.infer

export const WeatherAlert = type({
  event: "string",
  headline: "string",
  "ends?": "string",
  "endsEpoch?": "number",
  "onset?": "string",
  "onsetEpoch?": "number",
  "id?": "string",
  "language?": "string",
  "link?": "string",
  "description?": "string",
  "severity?": "string",
  "urgency?": "string",
  "areas?": "string"
})
export type WeatherAlert = typeof WeatherAlert.infer

export const WeatherData = type({
  queryCost: "number",
  latitude: "number",
  longitude: "number",
  resolvedAddress: "string",
  address: "string",
  timezone: "string",
  tzoffset: "number",
  description: "string",
  days: WeatherDay.array(),
  alerts: WeatherAlert.array(),
  currentConditions: WeatherCurrentConditions
})
export type WeatherData = typeof WeatherData.infer

// Aliases for camelCase schema naming convention
export const weatherDataSchema = WeatherData
export const weatherCurrentConditionsSchema = WeatherCurrentConditions
export const weatherHourSchema = WeatherHour
export const weatherDaySchema = WeatherDay
export const weatherAlertSchema = WeatherAlert
export const weatherSchema = WeatherData
