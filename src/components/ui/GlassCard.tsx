import { cn } from '@/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function GlassCard({ children, className }: Props) {
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

