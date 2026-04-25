import { prisma } from '@/lib/db'
import { parseYearMonth } from '@/utils'

import { Coordinate, IntervalSummary } from '../types'
import { runListSelect, runDetailSelect } from '../consts'
import { getMonthDateRange } from '../utils'

export type RunListItem = Awaited<ReturnType<typeof getRunsByMonth>>[number]

export async function getRunsByMonth(userId: string, year: number, month: number) {
  const { start, end } = getMonthDateRange(year, month)

  return prisma.run.findMany({
    where: {
      userId,
      startedAt: { gte: start, lt: end },
    },
    orderBy: { startedAt: 'asc' },
    select: runListSelect,
  })
}

export async function getUserRuns(userId: string, yearMonth?: string) {
  if (yearMonth) {
    const { year, month } = parseYearMonth(yearMonth)
    return getRunsByMonth(userId, year, month)
  }

  return prisma.run.findMany({
    where: { userId },
    orderBy: { startedAt: 'desc' },
    select: runListSelect,
  })
}

export async function getRunById(userId: string, runId: string) {
  const run = await prisma.run.findUnique({
    where: { id: runId, userId },
    select: runDetailSelect,
  })

  if (!run) return null

  return {
    ...run,
    path: run.path as Coordinate[],
    intervals: run.intervals as IntervalSummary | null,
  }
}
