import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getRunById } from '@/features/runs/queries'
import RunStats from '@/features/runs/components/RunStats'
import IntervalBreakdown from '@/features/runs/components/IntervalBreakdown'
import RouteMapWrapper from '@/features/runs/components/RouteMapWrapper'
import DeleteRunButton from '@/features/runs/components/DeleteRunButton'

type Params = Promise<{ id: string }>

export default async function RunDetailPage({ params }: { params: Params }) {
  const session = (await auth())!
  const userId = session.user!.id!

  const { id } = await params

  const run = await getRunById(userId, id)

  if (!run) {
    notFound()
  }

  const runMonth = `${run.startedAt.getUTCFullYear()}-${String(run.startedAt.getUTCMonth() + 1).padStart(2, '0')}`
  const runDay = run.startedAt.getUTCDate()
  const backHref = `/?month=${runMonth}&day=${runDay}`

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-all duration-200 hover:-translate-x-0.5"
        >
          ← Back to Calendar
        </Link>
        <DeleteRunButton runId={id} />
      </div>

      <RunStats
        distance={run.distance}
        duration={run.duration}
        startedAt={run.startedAt}
        endedAt={run.endedAt}
      />

      {run.path.length > 0 && <RouteMapWrapper path={run.path} />}

      {run.intervals && <IntervalBreakdown intervals={run.intervals} />}
    </div>
  )
}
