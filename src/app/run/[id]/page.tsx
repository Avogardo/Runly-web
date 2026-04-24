import Link from 'next/link'

type Params = Promise<{ id: string }>

export default async function RunDetailPage({ params }: { params: Params }) {
  const { id } = await params

  return (
    <div>
      <Link
        href="/"
        className="text-runly-accent hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Calendar
      </Link>

      <h2 className="text-2xl font-bold text-white mb-6">Run Details</h2>

      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <p className="text-white/55">
          Run details for <span className="text-white font-mono">{id}</span> will be displayed here.
        </p>
        <p className="text-white/35 text-sm mt-2">
          Phase 4 — Run Details Page
        </p>
      </div>
    </div>
  )
}

