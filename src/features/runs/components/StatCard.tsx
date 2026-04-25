type StatCardProps = {
  label: string
  value: string
  accent?: boolean
}

export function StatCard({ label, value, accent = false }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1.5 bg-white/4 rounded-xl p-3 sm:p-4 border border-white/6">
      <span className="text-[10px] sm:text-xs text-foreground-muted uppercase tracking-wider">{label}</span>
      <span className={`text-lg sm:text-xl font-bold ${accent ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}