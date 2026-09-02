import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { WeatherHour } from '@/types/weather'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  History,
  LayoutGrid,
  LineChart,
  Sparkles,
} from 'lucide-react'
import React, { useMemo, useRef, useState } from 'react'
import { HourlyCard } from './HourlyCard'
import { HourlyChart } from './HourlyChart'

type TimeFilterMode = 'all' | 'history' | 'forecast'
type ViewLayoutMode = 'cards' | 'chart'

interface HourlyOutlookProps {
  unit: 'C' | 'F'
  hours: WeatherHour[]
}

export const HourlyOutlook: React.FC<HourlyOutlookProps> = ({ unit, hours }) => {
  const [filterMode, setFilterMode] = useState<TimeFilterMode>('all')
  const [viewMode, setViewMode] = useState<ViewLayoutMode>('cards')
  const [selectedId, setSelectedId] = useState<number | null>()

  const scrollRef = useRef<HTMLDivElement>(null)

  // Filter items based on mode
  const filteredItems = useMemo(() => {
    switch (filterMode) {
      case 'history':
        return hours.filter(
          (item) => item.period === 'history' || item.period === 'now'
        )
      case 'forecast':
        return hours.filter(
          (item) => item.period === 'forecast' || item.period === 'now'
        )
      case 'all':
      default:
        return hours
    }
  }, [filterMode, hours])

  // Scroll controls for slider
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 360
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }



  return (
    <Card className="w-full border-border/80 bg-gradient-to-b from-card via-card to-muted/20 shadow-lg overflow-hidden">
      <CardHeader className="p-5 sm:p-6 pb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              24-Hour Outlook
            </CardTitle>
            <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wide">
              Historical & Forecast
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Explore past 24-hour weather history and 24-hour future forecast projections.
          </p>
        </div>

        {/* View Layout Mode (Cards vs Chart) */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60 self-start sm:self-auto">
          <Button
            variant={viewMode === 'cards' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className={cn(
              'h-7 px-2.5 text-xs font-semibold gap-1.5 rounded-lg transition-all',
              viewMode === 'cards' && 'bg-background shadow-xs text-foreground font-bold'
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </Button>

          <Button
            variant={viewMode === 'chart' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('chart')}
            className={cn(
              'h-7 px-2.5 text-xs font-semibold gap-1.5 rounded-lg transition-all',
              viewMode === 'chart' && 'bg-background shadow-xs text-foreground font-bold'
            )}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Chart</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 flex flex-col gap-5">
        {/* Controls Toolbar: Time Filters & Scroll Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Time Filter Switches */}
          <div className="flex flex-wrap items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/40">
            <button
              type="button"
              onClick={() => setFilterMode('history')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                filterMode === 'history'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
              )}
            >
              <History className="w-3.5 h-3.5" />
              <span>Past 24h (History)</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('forecast')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                filterMode === 'forecast'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next 24h (Forecast)</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                filterMode === 'all'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
              )}
            >
              <span>All 48h Timeline</span>
            </button>
          </div>

          {/* Slider Scroll Navigation Buttons (Only visible in Cards View) */}
          {viewMode === 'cards' && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScroll('left')}
                className="size-8 rounded-lg"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScroll('right')}
                className="size-8 rounded-lg"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Content Display: Card Slider or Chart */}
        {viewMode === 'cards' ? (
          <div className="relative w-full">
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40"
            >
              {filteredItems.map((item) => (
                <HourlyCard
                  key={item.datetimeEpoch}
                  item={item}
                  unit={unit}
                  isSelected={selectedId === item.datetimeEpoch}
                  onClick={() => setSelectedId(item.datetimeEpoch)}
                />
              ))}
            </div>
          </div>
        ) : (
          <HourlyChart items={filteredItems} unit={unit} />
        )}
      </CardContent>
    </Card>
  )
}
