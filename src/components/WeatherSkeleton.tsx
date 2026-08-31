import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in-50 duration-300">
      {/* Top Location Bar Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/60 shadow-xs">
        <div className="flex items-center gap-3">
          <Skeleton className="size-5 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-5 w-48 sm:w-64 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>

      {/* Hero Weather Card Skeleton */}
      <Card className="relative overflow-hidden border-border/60 bg-card shadow-xl">
        <CardContent className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Hero Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full md:w-auto">
              <Skeleton className="size-20 sm:size-24 rounded-3xl shrink-0" />
              <div className="flex flex-col items-center sm:items-start gap-2">
                <Skeleton className="h-12 w-28 rounded-lg" />
                <Skeleton className="h-5 w-36 rounded-md" />
                <div className="flex items-center gap-2 pt-1">
                  <Skeleton className="h-3.5 w-20 rounded-md" />
                  <Skeleton className="h-3.5 w-20 rounded-md" />
                </div>
              </div>
            </div>

            {/* Right Summary Grid (4 badges) */}
            <div className="w-full md:w-auto grid grid-cols-2 gap-3 sm:gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-border/50 bg-muted/30 flex items-center gap-3 min-w-[130px]"
                >
                  <Skeleton className="size-9 rounded-xl shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Skeleton className="h-3 w-14 rounded-md" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-2.5 w-12 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="pt-2 border-t border-border/40">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>

      {/* Bottom 3 Atmospheric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-border/60 bg-card flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-xl shrink-0" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
