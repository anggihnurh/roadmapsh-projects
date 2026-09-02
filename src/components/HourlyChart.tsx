import { Badge } from '@/components/ui/badge'
import { formatTime, toCelsius } from '@/lib/weather-utils'
import type { WeatherHour } from '@/types/weather'
import { CloudRain, Wind } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import { WeatherIcon } from './WeatherIcons'

interface HourlyChartProps {
  items: WeatherHour[]
  unit: 'C' | 'F'
}

// Static Chart Dimensions & Margins
const WIDTH = 800
const HEIGHT = 240
const PADDING_LEFT = 40
const PADDING_RIGHT = 40
const PADDING_TOP = 40
const PADDING_BOTTOM = 50

const CHART_WIDTH = WIDTH - PADDING_LEFT - PADDING_RIGHT
const CHART_HEIGHT = HEIGHT - PADDING_TOP - PADDING_BOTTOM
const BOTTOM_Y = PADDING_TOP + CHART_HEIGHT
const GRID_RATIOS = [0, 0.33, 0.66, 1] as const

interface ChartPoint {
  x: number
  y: number
  item: WeatherHour
  temp: number
  barHeight: number
  barY: number
}

export const HourlyChart: React.FC<HourlyChartProps> = React.memo(({ items, unit }) => {
  const [hoveredItem, setHoveredItem] = useState<WeatherHour | null>(null)
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null)

  // Memoize heavy chart calculations: temperatures, coordinate points, bezier curves, and SVG paths
  const chartData = useMemo(() => {
    if (!items || items.length === 0) {
      return null
    }

    // Calculate Temperature Min / Max
    const temps = items.map((item) =>
      unit === 'C' ? Math.round(toCelsius(item.temp)) : Math.round(item.temp)
    )
    const minTemp = Math.min(...temps) - 2
    const maxTemp = Math.max(...temps) + 2
    const tempRange = maxTemp - minTemp || 1

    // Map Data Points to Coordinates & Precipitation Bars
    const count = items.length
    const divisor = count > 1 ? count - 1 : 1

    const points: ChartPoint[] = items.map((item, index) => {
      const x = PADDING_LEFT + (index / divisor) * CHART_WIDTH
      const temp = temps[index]
      const y = PADDING_TOP + CHART_HEIGHT - ((temp - minTemp) / tempRange) * CHART_HEIGHT
      const barHeight = (item.precipprob / 100) * 35
      const barY = BOTTOM_Y - barHeight

      return { x, y, item, temp, barHeight, barY }
    })

    // Create SVG path string for smooth cubic bezier curve
    const linePath = points.reduce((acc, point, index, array) => {
      if (index === 0) return `M ${point.x},${point.y}`
      const prev = array[index - 1]
      const cx = (prev.x + point.x) / 2
      return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`
    }, '')

    // Area path for gradient fill
    const firstPoint = points[0]
    const lastPoint = points[points.length - 1]
    const areaPath = `${linePath} L ${lastPoint.x},${BOTTOM_Y} L ${firstPoint.x},${BOTTOM_Y} Z`

    // Find index of "Now" item if exists
    const nowPoint = points.find((p) => p.item.period === 'now')
    const timeStep = Math.ceil(points.length / 8) || 1

    return {
      points,
      linePath,
      areaPath,
      nowPoint,
      timeStep,
    }
  }, [items, unit])

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null)
    setHoverPos(null)
  }, [])

  if (!chartData || chartData.points.length === 0) return null

  const { points, linePath, areaPath, nowPoint, timeStep } = chartData

  return (
    <div className="relative w-full bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm overflow-hidden select-none">
      {/* Top Header info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Temperature Trend & Rain Likelihood
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-primary inline-block" />
            <span>Temp (°{unit})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-sky-500/60 inline-block" />
            <span>Rain (%)</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="w-full overflow-x-auto scrollbar-thin">
        <div className="min-w-[650px] relative">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-auto overflow-visible"
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              {/* Temperature Area Gradient */}
              <linearGradient id="tempAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
              </linearGradient>

              {/* Rain Bar Gradient */}
              <linearGradient id="rainBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {GRID_RATIOS.map((ratio) => {
              const y = PADDING_TOP + ratio * CHART_HEIGHT
              return (
                <line
                  key={ratio}
                  x1={PADDING_LEFT}
                  y1={y}
                  x2={WIDTH - PADDING_RIGHT}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                  strokeOpacity="0.5"
                />
              )
            })}

            {/* Precipitation Rain Bars at Bottom */}
            {points.map((p) => (
              <rect
                key={`rain-${p.item.datetimeEpoch}`}
                x={p.x - 3}
                y={p.barY}
                width={6}
                height={p.barHeight}
                rx={2}
                fill="url(#rainBarGrad)"
              />
            ))}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#tempAreaGrad)" />

            {/* Main Temperature Line */}
            <path
              d={linePath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* "Now" Marker Line */}
            {nowPoint && (
              <g>
                <line
                  x1={nowPoint.x}
                  y1={PADDING_TOP - 10}
                  x2={nowPoint.x}
                  y2={BOTTOM_Y}
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle cx={nowPoint.x} cy={nowPoint.y} r="6" fill="var(--primary)" />
                <circle
                  cx={nowPoint.x}
                  cy={nowPoint.y}
                  r={10}
                  fill="var(--primary)"
                  opacity="0.25"
                  className="animate-ping"
                />
              </g>
            )}

            {/* Hover Crosshair */}
            {hoverPos && (
              <line
                x1={hoverPos.x}
                y1={PADDING_TOP - 10}
                x2={hoverPos.x}
                y2={BOTTOM_Y}
                stroke="var(--muted-foreground)"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />
            )}

            {/* Interactive Circles & Labels */}
            {points.map((p, idx) => {
              const isHovered = hoveredItem?.datetimeEpoch === p.item.datetimeEpoch
              const showTime = idx % timeStep === 0 || p.item.period === 'now'

              return (
                <g
                  key={p.item.datetimeEpoch}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredItem(p.item)
                    setHoverPos({ x: p.x, y: p.y })
                  }}
                >
                  {/* Point Circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6 : 3.5}
                    fill={p.item.period === 'now' ? 'var(--primary)' : 'var(--card)'}
                    stroke="var(--primary)"
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all duration-150"
                  />

                  {/* Temperature Text above point */}
                  {(isHovered || showTime) && (
                    <text
                      x={p.x}
                      y={p.y - 10}
                      textAnchor="middle"
                      className="text-[11px] font-bold fill-foreground"
                    >
                      {p.temp}°
                    </text>
                  )}

                  {/* X-axis time label */}
                  {showTime && (
                    <text
                      x={p.x}
                      y={HEIGHT - 15}
                      textAnchor="middle"
                      className={`text-[10px] ${
                        p.item.period === 'now'
                          ? 'font-bold fill-primary'
                          : 'font-medium fill-muted-foreground'
                      }`}
                    >
                      {p.item.period === 'now' ? 'Now' : formatTime(p.item.datetime, 'h A')}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Floating Tooltip Card */}
          {hoveredItem && hoverPos && (
            <div
              className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 bg-popover/95 backdrop-blur border border-border text-popover-foreground rounded-lg p-2.5 shadow-lg min-w-[150px] transition-all duration-100"
              style={{
                left: `${(hoverPos.x / WIDTH) * 100}%`,
                top: `${(hoverPos.y / HEIGHT) * 100}%`,
              }}
            >
              <div className="flex items-center justify-between gap-2 pb-1 border-b border-border/60">
                <span className="text-xs font-bold">{formatTime(hoveredItem.datetime, 'h A')}</span>
                <Badge
                  variant={hoveredItem.period === 'now' ? 'default' : 'outline'}
                  className="text-[9px] px-1 py-0 h-4"
                >
                  {hoveredItem.relativeLabel}
                </Badge>
              </div>

              <div className="flex items-center gap-2 my-1.5">
                <WeatherIcon icon={hoveredItem.icon} size={28} className="w-7 h-7 shrink-0" />
                <div>
                  <div className="text-sm font-extrabold">
                    {unit === 'C'
                      ? Math.round(toCelsius(hoveredItem.temp))
                      : Math.round(hoveredItem.temp)}
                    °{unit}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{hoveredItem.conditions}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-border/40 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CloudRain className="w-3 h-3 text-sky-500 shrink-0" />
                  <span>Rain: {hoveredItem.precipprob}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-3 h-3 text-teal-500 shrink-0" />
                  <span>Wind: {hoveredItem.windspeed}k</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

HourlyChart.displayName = 'HourlyChart'

