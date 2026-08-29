import React from 'react'

interface WeatherSummaryBadgeProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  subValue?: React.ReactNode
}

export const WeatherSummaryBadge: React.FC<WeatherSummaryBadgeProps> = ({
  icon,
  label,
  value,
  subValue,
}) => {
  return (
    <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 [&_svg]:size-5">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <div className="text-sm font-bold text-foreground">
          {value}
        </div>
        {subValue && (
          <p className="text-[10px] text-muted-foreground font-medium">
            {subValue}
          </p>
        )}
      </div>
    </div>
  )
}
