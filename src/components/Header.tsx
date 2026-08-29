import React from 'react'
import { Badge } from '@/components/ui/badge'
import { SearchBar } from './SearchBar'
import { CloudSun } from 'lucide-react'

interface HeaderProps {
  searchInput: string
  onSearchChange: (value: string) => void
  onSearchSubmit?: () => void
  onDetectLocation?: () => void
  onRefresh?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  searchInput,
  onSearchChange,
  onSearchSubmit,
  onDetectLocation,
  onRefresh,
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
          <CloudSun className="size-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center">
              Weather<span className="text-primary">Hub</span>
            </h1>
            <Badge variant="secondary">SRS 2.2</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Current Weather Display & Insights
          </p>
        </div>
      </div>

      <SearchBar
        searchInput={searchInput}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        onDetectLocation={onDetectLocation}
        onRefresh={onRefresh}
      />
    </header>
  )
}

