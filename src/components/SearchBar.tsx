import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Search, MapPin, RefreshCw } from 'lucide-react'

interface SearchBarProps {
  searchInput: string
  onSearchChange: (value: string) => void
  onSearchSubmit: () => void
  onDetectLocation: () => void
  onRefresh?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  onSearchChange,
  onSearchSubmit,
  onDetectLocation,
  onRefresh,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full md:w-auto md:min-w-[360px]"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search city or location..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      <Button type="submit">
        <Search data-icon="inline-start" />
        Search
      </Button>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label="Detect current location"
              onClick={onDetectLocation}
            >
              <MapPin />
            </Button>
          }
        />
        <TooltipContent>
          <p>Detect Location</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label="Refresh weather data"
              onClick={onRefresh}
            >
              <RefreshCw />
            </Button>
          }
        />
        <TooltipContent>
          <p>Refresh Weather</p>
        </TooltipContent>
      </Tooltip>
    </form>
  )
}
