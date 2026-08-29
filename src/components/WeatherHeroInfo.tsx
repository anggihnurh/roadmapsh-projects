import React from 'react'
import { WeatherIcon } from './WeatherIcons'
import { Badge } from '@/components/ui/badge'

interface WeatherHeroInfoProps {
  icon: string
  conditions: string
  displayTemp: number | string
  displayFeelsLike: number | string
  displayDewPt: number | string
  unit: 'C' | 'F'
}

export const WeatherHeroInfo: React.FC<WeatherHeroInfoProps> = ({
  icon,
  conditions,
  displayTemp,
  displayFeelsLike,
  displayDewPt,
  unit,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
      <div className="relative">
        <div className="p-3 rounded-2xl bg-muted/60 border border-border shadow-inner">
          <WeatherIcon
            icon={icon}
            size={90}
            className="size-20 sm:size-24 animate-pulse duration-1000"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-primary animate-ping" />
            Live Condition
          </Badge>
        </div>
        <div className="flex items-baseline justify-center sm:justify-start gap-1">
          <span className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-foreground">
            {displayTemp}
          </span>
          <span className="text-3xl sm:text-4xl font-bold text-primary">
            °{unit}
          </span>
        </div>
        <div className="text-lg font-medium text-foreground">
          {conditions}
        </div>
        <div className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
          <span>
            Feels like{' '}
            <strong className="text-foreground font-semibold">
              {displayFeelsLike}°{unit}
            </strong>
          </span>
          <span>•</span>
          <span>
            Dew pt{' '}
            <strong className="text-foreground font-semibold">
              {displayDewPt}°{unit}
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}

