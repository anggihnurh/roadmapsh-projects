import React from 'react'

interface WeatherIconProps {
  icon: string
  className?: string
  size?: number
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  icon,
  className = 'w-12 h-12',
  size = 48,
}) => {
  const normalizedIcon = icon?.toLowerCase() || 'cloudy'

  switch (normalizedIcon) {
    case 'clear-day':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <circle cx="32" cy="32" r="14" fill="url(#sun-grad)" />
          <g stroke="url(#sun-ray)" strokeWidth="3" strokeLinecap="round">
            <line x1="32" y1="6" x2="32" y2="12" />
            <line x1="32" y1="52" x2="32" y2="58" />
            <line x1="6" y1="32" x2="12" y2="32" />
            <line x1="52" y1="32" x2="58" y2="32" />
            <line x1="13.6" y1="13.6" x2="17.8" y2="17.8" />
            <line x1="46.2" y1="46.2" x2="50.4" y2="50.4" />
            <line x1="13.6" y1="50.4" x2="17.8" y2="46.2" />
            <line x1="46.2" y1="17.8" x2="50.4" y2="13.6" />
          </g>
          <defs>
            <linearGradient id="sun-grad" x1="18" y1="18" x2="46" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDB813" />
              <stop offset="1" stopColor="#FF7A00" />
            </linearGradient>
            <linearGradient id="sun-ray" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDB813" />
              <stop offset="1" stopColor="#FF8A00" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'clear-night':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M44 38C34.059 38 26 29.941 26 20C26 16.5 27 13.2 28.7 10.4C18.4 12.8 11 22.1 11 33C11 45.7 21.3 56 34 56C44.9 56 54.2 48.6 56.6 38.3C53.8 40 50.5 41 47 41C46 41 45 38 44 38Z"
            fill="url(#moon-grad)"
          />
          <circle cx="48" cy="18" r="1.5" fill="#FFEAA7" opacity="0.9" />
          <circle cx="54" cy="26" r="1" fill="#FFEAA7" opacity="0.7" />
          <circle cx="40" cy="12" r="1.2" fill="#FFEAA7" opacity="0.8" />
          <defs>
            <linearGradient id="moon-grad" x1="15" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'partly-cloudy-day':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Sun behind */}
          <circle cx="26" cy="24" r="12" fill="url(#pcd-sun)" />
          <g stroke="url(#pcd-sun-ray)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="26" y1="6" x2="26" y2="10" />
            <line x1="13.3" y1="11.3" x2="16.1" y2="14.1" />
            <line x1="8" y1="24" x2="12" y2="24" />
            <line x1="38.7" y1="11.3" x2="35.9" y2="14.1" />
          </g>
          {/* Cloud in front */}
          <path
            d="M48 48H20C14.477 48 10 43.523 10 38C10 32.8 13.9 28.5 19 28.05C20.6 21.8 26.2 17 33 17C41.284 17 48 23.716 48 32C52.418 32 56 35.582 56 40C56 44.418 52.418 48 48 48Z"
            fill="url(#pcd-cloud)"
            style={{ filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))' }}
          />
          <defs>
            <linearGradient id="pcd-sun" x1="14" y1="12" x2="38" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDB813" />
              <stop offset="1" stopColor="#FF7A00" />
            </linearGradient>
            <linearGradient id="pcd-sun-ray" x1="8" y1="6" x2="38" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDB813" />
              <stop offset="1" stopColor="#FF8A00" />
            </linearGradient>
            <linearGradient id="pcd-cloud" x1="10" y1="17" x2="56" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'partly-cloudy-night':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M34 26C27.5 26 22 21.5 22 15C22 12.8 22.6 10.7 23.7 8.9C16.8 10.5 11.8 16.7 11.8 24C11.8 32.5 18.7 39.4 27.2 39.4C34.5 39.4 40.7 34.4 42.3 27.5C40.5 28.6 38.4 29.2 36.2 29.2C35.5 29.2 34.7 26.5 34 26Z"
            fill="url(#pcn-moon)"
          />
          <path
            d="M48 50H20C14.477 50 10 45.523 10 40C10 34.8 13.9 30.5 19 30.05C20.6 23.8 26.2 19 33 19C41.284 19 48 25.716 48 34C52.418 34 56 37.582 56 42C56 46.418 52.418 50 48 50Z"
            fill="url(#pcn-cloud)"
            style={{ filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.35))' }}
          />
          <defs>
            <linearGradient id="pcn-moon" x1="12" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#CBD5E1" />
              <stop offset="1" stopColor="#64748B" />
            </linearGradient>
            <linearGradient id="pcn-cloud" x1="10" y1="19" x2="56" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F1F5F9" />
              <stop offset="0.6" stopColor="#CBD5E1" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'rain':
    case 'showers-day':
    case 'showers-night':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M46 38H18C13.582 38 10 34.418 10 30C10 25.9 13.1 22.4 17.2 22.05C18.5 16.8 23 13 28.5 13C35.2 13 40.6 18.2 41 24.8C44.4 25.4 47 28.4 47 32C47 35.3 44.3 38 41 38"
            fill="url(#rain-cloud)"
          />
          {/* Rain drops */}
          <line x1="20" y1="44" x2="16" y2="54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="44" x2="26" y2="56" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="40" y1="44" x2="36" y2="54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="44" x2="46" y2="52" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="rain-cloud" x1="10" y1="13" x2="47" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94A3B8" />
              <stop offset="1" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'thunder-rain':
    case 'thunder-showers-day':
    case 'thunder-showers-night':
    case 'thunder':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M46 36H18C13.582 36 10 32.418 10 28C10 23.9 13.1 20.4 17.2 20.05C18.5 14.8 23 11 28.5 11C35.2 11 40.6 16.2 41 22.8C44.4 23.4 47 26.4 47 30C47 33.3 44.3 36 41 36"
            fill="url(#thunder-cloud)"
          />
          {/* Lightning bolt */}
          <polygon
            points="32,34 24,47 30,47 26,58 38,44 32,44"
            fill="url(#thunder-bolt)"
            style={{ filter: 'drop-shadow(0 0 6px #FACC15)' }}
          />
          <defs>
            <linearGradient id="thunder-cloud" x1="10" y1="11" x2="47" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#64748B" />
              <stop offset="1" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="thunder-bolt" x1="24" y1="34" x2="38" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="1" stopColor="#EAB308" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'snow':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M46 36H18C13.582 36 10 32.418 10 28C10 23.9 13.1 20.4 17.2 20.05C18.5 14.8 23 11 28.5 11C35.2 11 40.6 16.2 41 22.8C44.4 23.4 47 26.4 47 30C47 33.3 44.3 36 41 36"
            fill="url(#snow-cloud)"
          />
          <circle cx="22" cy="46" r="2.5" fill="#E0F2FE" />
          <circle cx="33" cy="52" r="2.5" fill="#E0F2FE" />
          <circle cx="44" cy="46" r="2.5" fill="#E0F2FE" />
          <circle cx="27" cy="56" r="1.8" fill="#BAE6FD" />
          <circle cx="39" cy="57" r="1.8" fill="#BAE6FD" />
          <defs>
            <linearGradient id="snow-cloud" x1="10" y1="11" x2="47" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'wind':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M10 24H44C47.3 24 50 21.3 50 18C50 14.7 47.3 12 44 12C40.7 12 38 14.7 38 18"
            stroke="url(#wind-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M6 34H50C53.3 34 56 36.7 56 40C56 43.3 53.3 46 50 46C46.7 46 44 43.3 44 40"
            stroke="url(#wind-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M14 44H34C36.2 44 38 45.8 38 48C38 50.2 36.2 52 34 52C31.8 52 30 50.2 30 48"
            stroke="url(#wind-grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="wind-grad" x1="6" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67E8F9" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'fog':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M46 32H18C13.582 32 10 28.418 10 24C10 19.9 13.1 16.4 17.2 16.05C18.5 10.8 23 7 28.5 7C35.2 7 40.6 12.2 41 18.8C44.4 19.4 47 22.4 47 26C47 29.3 44.3 32 41 32"
            fill="url(#fog-cloud)"
          />
          <line x1="12" y1="40" x2="52" y2="40" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="47" x2="48" y2="47" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="20" y1="54" x2="44" y2="54" stroke="#64748B" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <defs>
            <linearGradient id="fog-cloud" x1="10" y1="7" x2="47" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#CBD5E1" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      )

    case 'cloudy':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M50 46H18C12.477 46 8 41.523 8 36C8 30.7 12.1 26.3 17.3 25.8C18.8 19.2 24.7 14 32 14C40.6 14 47.7 20.8 48 29.4C52.5 30 56 33.8 56 38.5C56 42.642 53.314 46 50 46Z"
            fill="url(#cloudy-grad)"
            style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))' }}
          />
          <defs>
            <linearGradient id="cloudy-grad" x1="8" y1="14" x2="56" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8FAFC" />
              <stop offset="0.6" stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      )
  }
}
