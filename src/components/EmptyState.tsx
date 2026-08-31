import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  CloudSun,
  Navigation,
  Sparkles
} from 'lucide-react'
import React from 'react'

interface EmptyStateProps {
  onDetectLocation: () => void
}


export const EmptyState: React.FC<EmptyStateProps> = ({
  onDetectLocation,
}) => {
  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-2xl border-dashed border-border/80 bg-gradient-to-b from-card/90 via-card to-muted/20 shadow-sm overflow-hidden relative">
        <div
          className="absolute -top-16 -left-16 size-48 rounded-full bg-primary/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -right-16 size-48 rounded-full bg-primary/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <CardContent className="p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-6 relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-125 animate-pulse" />
            <div className="relative size-20 sm:size-24 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-muted border border-primary/20 shadow-inner flex items-center justify-center text-primary">
              <CloudSun className="size-10 sm:size-12 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="absolute -top-1 -right-2 bg-card border border-border shadow-xs px-2 py-0.5 rounded-full text-[10px] font-medium text-muted-foreground flex items-center gap-1">
              <Sparkles className="size-3 text-amber-500" />
              <span>Real-time</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              No Location Selected
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Enter a city, region, or postal code in the search bar above to view live atmospheric conditions, hourly timeline, and forecasts.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onDetectLocation}
            className="gap-2 font-medium shadow-xs hover:border-primary/50 transition-colors"
          >
            <Navigation className="size-3.5 text-primary" />
            Use Current Location
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
