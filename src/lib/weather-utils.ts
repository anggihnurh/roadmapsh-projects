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

export function formatTime(timeStr?: string | null): string {
  if (!timeStr || typeof timeStr !== 'string') return ''
  
  const parts = timeStr.split(':')
  if (parts.length >= 2) {
    const hour = parseInt(parts[0], 10)
    const minute = parts[1]
    if (!isNaN(hour)) {
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12
      return `${formattedHour}:${minute} ${ampm}`
    }
  }

  const dateObj = new Date(timeStr)
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }

  return timeStr
}


