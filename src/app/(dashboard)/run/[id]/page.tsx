import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getRunById } from '@/features/runs/queries'
import { RunStats, DeleteRunButton, IntervalBreakdown, RouteMapWrapper } from '@/features/runs'
import { getServerTranslation, getLocale } from '@/lib/i18n/server'

type Params = Promise<{ id: string }>

export default async function RunDetailPage({ params }: { params: Params }) {
  const session = (await auth())!
  const userId = session.user.id

  const lng = await getLocale()
  const { t } = await getServerTranslation('common', { lng })

  const { id } = await params

  const run = await getRunById(userId, id)

  if (!run) {
    notFound()
  }

  const runMonth = `${run.startedAt.getUTCFullYear()}-${String(run.startedAt.getUTCMonth() + 1).padStart(2, '0')}`
  const runDay = run.startedAt.getUTCDate()
  const backHref = `/?month=${runMonth}&day=${runDay}`

  const statsLabels = {
    distance: t('stats.distance'),
    duration: t('stats.duration'),
    avgPace: t('stats.avgPace'),
    date: t('stats.date'),
  }

  const intervalLabels = {
    title: t('intervals.title'),
    planned: t('intervals.planned'),
    heavy: t('intervals.heavy'),
    light: t('intervals.light'),
    completed: t('intervals.completed'),
    intervals: t('intervals.intervals'),
    heavyLabel: t('intervals.heavyLabel'),
    lightLabel: t('intervals.lightLabel'),
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-all duration-200 hover:-translate-x-0.5"
        >
          {t('backToCalendar')}
        </Link>
        <DeleteRunButton
          runId={id}
          deleteLabel={t('deleteRun')}
          deletingLabel={t('deleting')}
          confirmMessage={t('deleteConfirm')}
        />
      </div>

      <RunStats
        distance={run.distance}
        duration={run.duration}
        startedAt={run.startedAt}
        endedAt={run.endedAt}
        labels={statsLabels}
        lng={lng}
      />

      {run.path.length > 0 && <RouteMapWrapper path={run.path} />}

      {run.intervals && <IntervalBreakdown intervals={run.intervals} labels={intervalLabels} />}
    </div>
  )
}
