import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { MapPin, Clock } from 'lucide-react'

interface LocationBarProps {
  resolvedAddress: string
  timezone: string
  formattedTime: string
  unit: 'C' | 'F'
  onUnitChange: (unit: 'C' | 'F') => void
}

export const LocationBar: React.FC<LocationBarProps> = ({
  resolvedAddress,
  timezone,
  formattedTime,
  unit,
  onUnitChange,
}) => {
  return (
    <Card className="bg-card/80 backdrop-blur-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-0">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="text-xl font-bold tracking-tight">
              {resolvedAddress}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <Clock className="size-3.5" />
              <span>
                {timezone} • Last updated {formattedTime}
              </span>
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-medium text-muted-foreground">Unit:</span>
          <ToggleGroup
            value={[unit]}
            onValueChange={(val) => {
              if (val[0]) onUnitChange(val[0] as 'C' | 'F')
            }}
            variant="outline"
            size="sm"
            spacing={0}
          >
            <ToggleGroupItem value="C" aria-label="Celsius">
              °C
            </ToggleGroupItem>
            <ToggleGroupItem value="F" aria-label="Fahrenheit">
              °F
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
    </Card>
  )
}

