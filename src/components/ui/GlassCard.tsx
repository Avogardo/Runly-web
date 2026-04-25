import { type FC } from 'react'
import { cn } from '@/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

const GlassCard: FC<Props> = ({ children, className }) => {
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

export default GlassCard

