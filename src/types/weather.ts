export interface WeatherCurrentConditions {
  datetime: string
  datetimeEpoch: number
  temp: number
  feelslike: number
  humidity: number
  dew: number
  precip: number
  precipprob: number
  snow: number
  snowdepth: number
  preciptype: string[] | null
  windgust: number | null
  windspeed: number
  winddir: number
  pressure: number
  visibility: number
  cloudcover: number
  solarradiation: number
  solarenergy: number | null
  uvindex: number
  severerisk: number
  conditions: string
  icon: string
  stations?: string[]
  source: string
  sunrise: string
  sunriseEpoch: number
  sunset: string
  sunsetEpoch: number
  moonphase: number
}

export interface WeatherHour {
  datetime: string
  datetimeEpoch: number
  temp: number
  feelslike: number
  humidity: number
  dew: number
  precip: number
  precipprob: number
  snow: number
  snowdepth: number
  preciptype: string[] | null
  windgust: number | null
  windspeed: number
  winddir: number
  pressure: number
  visibility: number
  cloudcover: number
  solarradiation: number
  solarenergy: number | null
  uvindex: number
  severerisk: number
  conditions: string
  icon: string
  stations?: string[] | null
  source: string
  sunrise?: string
  sunriseEpoch?: number
  sunset?: string
  sunsetEpoch?: number
  moonphase?: number
  period?: string
  relativeLabel?: string
}

export interface WeatherDay {
  datetime: string
  datetimeEpoch: number
  tempmax: number
  tempmin: number
  temp: number
  feelslikemax: number
  feelslikemin: number
  feelslike: number
  dew: number
  humidity: number
  precip: number
  precipprob: number
  precipcover: number
  preciptype: string[] | null
  snow: number
  snowdepth: number
  windgust: number
  windspeed: number
  winddir: number
  pressure: number
  cloudcover: number
  visibility: number
  solarradiation: number
  solarenergy: number
  uvindex: number
  severerisk: number
  sunrise: string
  sunriseEpoch: number
  sunset: string
  sunsetEpoch: number
  moonphase: number
  conditions: string
  description: string
  icon: string
  stations?: string[] | null
  source: string
  hours?: WeatherHour[]
}


export interface WeatherAlert {
  event: string
  headline: string
  ends?: string
  endsEpoch?: number
  onset?: string
  onsetEpoch?: number
  id?: string
  language?: string
  link?: string
  description?: string
  severity?: string
  urgency?: string
  areas?: string
}

export interface WeatherData {
  queryCost: number
  latitude: number
  longitude: number
  resolvedAddress: string
  address: string
  timezone: string
  tzoffset: number
  description: string
  days: WeatherDay[]
  alerts: WeatherAlert[]
  currentConditions: WeatherCurrentConditions
}

