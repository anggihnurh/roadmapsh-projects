import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { CurrentWeather } from './components/CurrentWeather'
import { EmptyState } from './components/EmptyState'
import { ErrorState } from './components/ErrorState'
import { Header } from './components/Header'
import { WeatherSkeleton } from './components/WeatherSkeleton'
import { useGeolocation } from './hooks'
import { reverseGeolocationQueryOptions, useWeathers } from './services'

const USER_STORAGE_KEY = 'user-location'

const getLocationFromStorage = () => {
  try {
    const location = window.localStorage.getItem(USER_STORAGE_KEY)
    return location ?? ''
  } catch (error) {
    console.error(`Error get data from localStorage key "${USER_STORAGE_KEY}":`, error);
    return ''
  }
}

function RootLayout() {
  const [activeLocation, setActiveLocation] = useState(getLocationFromStorage)
  const [searchInput, setSearchInput] = useState('')

  const { data, refetch, isLoading, isFetching, error } = useWeathers(activeLocation)
  const { detect, loading: isLocating } = useGeolocation()
  const queryClient = useQueryClient()

  const isBusy = isLoading || isFetching || isLocating

  const handleSearchSubmit = () => {
    const trimmed = searchInput.trim()

    if (trimmed === '') {
      toast.error("Field cannot be empty.")
      return
    }

    setActiveLocation(trimmed)
  }

  const handleSuccessDetectLocation = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    const params = `${lat},${lng}`

    try {
      const res = await queryClient.query(reverseGeolocationQueryOptions(lat, lng))
      const userLocation = res.display_name

      setSearchInput(userLocation)
      setActiveLocation(userLocation)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to reverse geocode')
      setSearchInput(params)
      setActiveLocation(params)
    }

  }

  const handleDetectLocation = () => {
    detect({ onSuccess: handleSuccessDetectLocation, onError: (msg) => toast.error(msg) })
  }

  const handleRefresh = () => refetch()


  useEffect(() => {
    try {
      const trimmed = activeLocation.trim()
      if (trimmed === '') return

      window.localStorage.setItem(USER_STORAGE_KEY, trimmed)
    } catch (error) {
      console.error(`Error setting localStorage key "${USER_STORAGE_KEY}":`, error);
    }
  }, [activeLocation])


  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <Header
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onRefresh={handleRefresh}
          onDetectLocation={handleDetectLocation}
        />
        <Separator />

        <main className="w-full min-h-[400px]">
          {isBusy ? (
            <WeatherSkeleton />
          ) : error ? (
            <ErrorState
              error={error}
              location={activeLocation}
              onRetry={handleRefresh}
              onDetectLocation={handleDetectLocation}
            />) : data ? (
              <CurrentWeather data={data} />
            ) : (
            <EmptyState onDetectLocation={handleDetectLocation} />
          )}
        </main>
      </div>
    </div>
  )
}

const queryClient = new QueryClient

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delay={200}>
        <RootLayout />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}