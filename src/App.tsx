import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useState } from 'react'
import exampleData from '../example-data.json'
import { CurrentWeather } from './components/CurrentWeather'
import { Header } from './components/Header'
import type { WeatherData } from './types/weather'

export default function App() {
  const [searchInput, setSearchInput] = useState(exampleData.address || 'Kebumen')
  const weatherData = exampleData as unknown as WeatherData

  return (
    <TooltipProvider delay={200}>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <Header
            searchInput={searchInput}
            onSearchChange={setSearchInput}
          />
          <Separator />
          <main>
            <CurrentWeather data={weatherData} />
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}