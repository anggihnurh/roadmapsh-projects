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

export function formatTime(timeStr: string): string {
  if (!timeStr) return ''
  const parts = timeStr.split(':')
  if (parts.length >= 2) {
    const hour = parseInt(parts[0], 10)
    const minute = parts[1]
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12
    return `${formattedHour}:${minute} ${ampm}`
  }
  return timeStr
}

