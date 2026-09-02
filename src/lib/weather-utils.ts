import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export function getWindDirection(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round((deg % 360) / 22.5) % 16
  return directions[index]
}

export function toCelsius(f: number): number {
  return ((f - 32) * 5) / 9
}

export function toKmPerHour(mph: number): number {
  return mph * 1.60934
}

export function getUvLevel(uvindex: number): 'Low' | 'Moderate' | 'High' | 'Very High' {
  if (uvindex <= 2) return 'Low'
  if (uvindex <= 5) return 'Moderate'
  if (uvindex <= 7) return 'High'
  return 'Very High'
}

export function formatTime(timeStr?: string | null, format?: string): string {
  const defaultFormat = 'hh:mm A'
  return dayjs(timeStr, 'HH:mm:ss').format(format ?? defaultFormat)
}



