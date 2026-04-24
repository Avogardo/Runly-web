import Link from 'next/link'

export default function RunNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <span className="text-6xl">🏃‍♂️💨</span>
      <h2 className="text-2xl font-bold text-white">Run not found</h2>
      <p className="text-white/40 text-center max-w-md">
        This run doesn&apos;t exist or may have been deleted.
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] transition-all duration-200 active:scale-95"
      >
        ← Back to Calendar
      </Link>
    </div>
  )
}

