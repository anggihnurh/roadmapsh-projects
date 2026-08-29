import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface AtmosphericCardProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  badgeText?: string
  iconColorClass?: string
  className?: string
}

export const AtmosphericCard: React.FC<AtmosphericCardProps> = ({
  icon,
  label,
  value,
  badgeText,
  iconColorClass = 'bg-primary/10 text-primary',
  className,
}) => {
  return (
    <Card
      className={cn(
        'p-4 flex flex-row items-center justify-between',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl [&_svg]:size-5',
            iconColorClass
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="text-sm font-bold text-foreground">{value}</div>
        </div>
      </div>
      {badgeText && <Badge variant="outline">{badgeText}</Badge>}
    </Card>
  )
}
