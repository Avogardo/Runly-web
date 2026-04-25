import { ReactNode, FC } from 'react'
import { cn } from '@/utils'

type GlassCardProps = {
  children: ReactNode
  className?: string
}

export const GlassCard: FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'bg-surface backdrop-blur-xl border border-surface-border rounded-2xl',
        className,
      )}
    >
      {children}
    </div>
  )
}
