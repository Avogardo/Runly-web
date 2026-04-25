export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/6" />
        <div className="h-7 w-48 rounded-lg bg-white/6" />
        <div className="w-10 h-10 rounded-xl bg-white/6" />
      </div>

      <div className="bg-surface backdrop-blur-xl border border-surface-border rounded-2xl p-4">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="min-h-16 sm:min-h-18 rounded-xl bg-white/3" />
          ))}
        </div>
      </div>
    </div>
  )
}
