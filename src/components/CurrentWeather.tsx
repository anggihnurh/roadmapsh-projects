import React, { useMemo, useState } from 'react'
import type { WeatherData } from '../types/weather'
import { LocationBar } from './LocationBar'
import { WeatherHeroInfo } from './WeatherHeroInfo'
import { WeatherSummaryBadge } from './WeatherSummaryBadge'
import { AtmosphericCard } from './AtmosphericCard'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  toCelsius,
  toKmPerHour,
  getWindDirection,
  getUvLevel,
  formatTime,
} from '@/lib/weather-utils'
import {
  Wind,
  CloudRain,
  Sun,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
} from 'lucide-react'

interface CurrentWeatherProps {
  data: WeatherData
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C')
  const { currentConditions, resolvedAddress, timezone, description } = data

  const {
    displayTemp,
    displayFeelsLike,
    displayDewPt,
    windKmh,
    windDirCardinal,
    rainLikelihood,
    uvLevel,
  } = useMemo(() => {
    const isCelsius = unit === 'C'
    return {
      displayTemp: isCelsius
        ? Math.round(toCelsius(currentConditions.temp))
        : Math.round(currentConditions.temp),
      displayFeelsLike: isCelsius
        ? Math.round(toCelsius(currentConditions.feelslike))
        : Math.round(currentConditions.feelslike),
      displayDewPt: isCelsius
        ? Math.round(toCelsius(currentConditions.dew))
        : Math.round(currentConditions.dew),
      windKmh: toKmPerHour(currentConditions.windspeed).toFixed(1),
      windDirCardinal: getWindDirection(currentConditions.winddir),
      rainLikelihood: Math.round(currentConditions.precipprob),
      uvLevel: getUvLevel(currentConditions.uvindex),
    }
  }, [currentConditions, unit])

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      <LocationBar
        resolvedAddress={resolvedAddress}
        timezone={timezone}
        formattedTime={formatTime(currentConditions.datetime)}
        unit={unit}
        onUnitChange={setUnit}
      />

      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card/95 to-primary/5 shadow-xl">
        <CardContent className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <WeatherHeroInfo
              icon={currentConditions.icon}
              conditions={currentConditions.conditions}
              displayTemp={displayTemp}
              displayFeelsLike={displayFeelsLike}
              displayDewPt={displayDewPt}
              unit={unit}
            />

            <div className="w-full md:w-auto grid grid-cols-2 gap-3 sm:gap-4">
              <WeatherSummaryBadge
                icon={<Wind />}
                label="Wind"
                value={
                  <>
                    {windKmh}{' '}
                    <span className="text-xs font-normal text-muted-foreground">
                      km/h
                    </span>
                  </>
                }
                subValue={`${windDirCardinal} (${currentConditions.winddir}°)`}
              />

              <WeatherSummaryBadge
                icon={<CloudRain />}
                label="Rain Chance"
                value={`${rainLikelihood}%`}
                subValue={`Precip: ${currentConditions.precip} mm`}
              />

              <WeatherSummaryBadge
                icon={<Droplets />}
                label="Humidity"
                value={`${Math.round(currentConditions.humidity)}%`}
                subValue="Relative"
              />

              <WeatherSummaryBadge
                icon={<Sun />}
                label="UV Index"
                value={
                  <>
                    {currentConditions.uvindex}{' '}
                    <span className="text-xs font-normal text-muted-foreground">
                      ({uvLevel})
                    </span>
                  </>
                }
                subValue={`${currentConditions.solarradiation} W/m²`}
              />
            </div>
          </div>

          {description && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="text-primary font-semibold shrink-0">
                  Forecast note:
                </span>
                <span className="italic">{description}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AtmosphericCard
          icon={<Gauge />}
          label="Air Pressure"
          value={
            <>
              {currentConditions.pressure}{' '}
              <span className="text-xs font-normal text-muted-foreground">
                hPa
              </span>
            </>
          }
          badgeText="Normal"
        />

        <AtmosphericCard
          icon={<Sunrise />}
          label="Sunrise"
          value={formatTime(currentConditions.sunrise)}
          iconColorClass="bg-amber-500/10 text-amber-500"
        />

        <AtmosphericCard
          icon={<Sunset />}
          label="Sunset"
          value={formatTime(currentConditions.sunset)}
          iconColorClass="bg-indigo-500/10 text-indigo-500"
        />
      </div>
    </div>
  )
}





