import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatTime, toCelsius } from '@/lib/weather-utils'
import type { WeatherHour } from '@/types/weather'
import { CloudRain, Wind } from 'lucide-react'
import React from 'react'
import { WeatherIcon } from './WeatherIcons'

interface HourlyCardProps {
  item: WeatherHour
  unit: 'C' | 'F'
  isSelected?: boolean
  onClick?: () => void
}

export const HourlyCard: React.FC<HourlyCardProps> = ({
  item,
  unit,
  isSelected,
  onClick,
}) => {
  const isNow = item.period === 'now'
  const isHistory = item.period === 'history'

  const displayTemp = unit === 'C' ? Math.round(toCelsius(item.temp)) : Math.round(item.temp)

  return (
    <Card
      onClick={onClick}
      className={cn(
        'relative min-w-[140px] max-w-[140px] p-3.5 flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer select-none group',
        isNow
          ? 'border-primary/60 bg-gradient-to-b from-primary/15 via-primary/5 to-card shadow-md ring-1 ring-primary/40'
          : isHistory
            ? 'bg-muted/20 border-border/70 opacity-90 hover:opacity-100 hover:bg-card hover:border-border'
            : 'bg-card hover:bg-accent/40 border-border hover:shadow-sm',
        isSelected && !isNow && 'border-primary ring-1 ring-primary/50'
      )}
    >
      {/* Top Header: Period Badge & Time */}
      <div className="w-full flex items-center justify-between gap-1 mb-2">
        <span className="text-[11px] font-semibold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">
          {formatTime(item.datetime, "h A")}
        </span>
        {isNow ? (
          <Badge
            variant="default"
            className="text-[9px] px-1.5 py-0 h-4 uppercase font-bold tracking-wider animate-pulse bg-primary text-primary-foreground"
          >
            NOW
          </Badge>
        ) : (
          <span className="text-[9px] font-medium text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded-full">
            {item.relativeLabel}
          </span>
        )}
      </div>

      {/* Weather Icon & Condition */}
      <div className="my-1.5 flex flex-col items-center gap-1">
        <div className="transition-transform duration-200 group-hover:scale-110">
          <WeatherIcon icon={item.icon} size={42} className="w-10 h-10" />
        </div>
        <p className="text-[11px] font-medium text-muted-foreground line-clamp-1 max-w-[120px]" title={item.conditions}>
          {item.conditions}
        </p>
      </div>

      {/* Temperature */}
      <div className="my-1">
        <span className="text-xl font-bold text-foreground tracking-tight">
          {displayTemp}°
        </span>
        <span className="text-xs font-semibold text-muted-foreground ml-0.5">
          {unit}
        </span>
      </div>

      {/* Footer Stats: Rain % & Wind */}
      <div className="w-full pt-2 mt-1 border-t border-border/50 grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
        <div className="flex items-center justify-center gap-1 font-medium" title="Rain probability">
          <CloudRain className="w-3 h-3 text-sky-500 shrink-0" />
          <span>{item.precipprob}%</span>
        </div>
        <div className="flex items-center justify-center gap-1 font-medium" title="Wind speed">
          <Wind className="w-3 h-3 text-teal-500 shrink-0" />
          <span>{item.windspeed}k</span>
        </div>
      </div>
    </Card>
  )
}
