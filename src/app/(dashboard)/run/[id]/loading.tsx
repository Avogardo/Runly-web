export default function RunDetailLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-5 w-32 rounded bg-white/6" />
      <div className="bg-surface backdrop-blur-xl border border-surface-border rounded-2xl p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-white/4" />
          ))}
        </div>
      </div>
      <div className="h-80 rounded-2xl bg-white/4" />
    </div>
  )
}
