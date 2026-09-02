import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  AlertTriangle,
  CloudOff,
  Navigation,
  RefreshCw,
} from 'lucide-react'
import React from 'react'

interface ErrorStateProps {
  error: unknown
  location?: string
  onRetry: () => void
  onDetectLocation: () => void
}

const getErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred while fetching weather data.'
  if (typeof error === 'object' && error !== null) {
    const err = error as { response?: { data?: { message?: string; error?: string } }; message?: string }
    if (err.response?.data?.message) return err.response.data.message
    if (err.response?.data?.error) return err.response.data.error
    if (err.message) return err.message
  }
  return String(error)
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  location,
  onRetry,
  onDetectLocation,
}) => {
  const errorMessage = getErrorMessage(error)

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-2xl border-dashed border-destructive/40 bg-gradient-to-b from-card/90 via-card to-destructive/5 shadow-sm overflow-hidden relative">
        <div
          className="absolute -top-16 -left-16 size-48 rounded-full bg-destructive/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -right-16 size-48 rounded-full bg-destructive/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <CardContent className="p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-6 relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-destructive/15 blur-xl scale-125 animate-pulse" />
            <div className="relative size-20 sm:size-24 rounded-3xl bg-gradient-to-br from-destructive/15 via-destructive/5 to-muted border border-destructive/30 shadow-inner flex items-center justify-center text-destructive">
              <CloudOff className="size-10 sm:size-12 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="absolute -top-1 -right-2 bg-card border border-destructive/30 shadow-xs px-2 py-0.5 rounded-full text-[10px] font-semibold text-destructive flex items-center gap-1">
              <AlertTriangle className="size-3" />
              <span>Failed</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Unable to Load Weather Data
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {location ? (
                <>
                  We couldn't retrieve weather data for{' '}
                  <span className="font-semibold text-foreground">"{location}"</span>.
                </>
              ) : (
                "We couldn't retrieve weather data for the requested location."
              )}
            </p>
            {errorMessage && (
              <div className="mt-1 px-3 py-1.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-mono break-all max-w-sm">
                {errorMessage}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={onRetry}
              className="gap-2 font-medium shadow-xs"
            >
              <RefreshCw className="size-3.5" />
              Try Again
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDetectLocation}
              className="gap-2 font-medium shadow-xs hover:border-primary/50 transition-colors"
            >
              <Navigation className="size-3.5 text-primary" />
              Use Current Location
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
