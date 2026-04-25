import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

const BCRYPT_SALT_ROUNDS = 12
const SEED_CENTER_LAT = 50.0647 // Krakow, Poland
const SEED_CENTER_LNG = 19.945
const PATH_MIN_RADIUS = 0.005 // ~0.5km
const PATH_RADIUS_JITTER = 0.01 // up to ~1.5km total
const PATH_POINT_JITTER = 0.001
const PATH_POINT_INTERVAL_MS = 5_000 // one point every 5 seconds
const SEED_HOUR_MIN = 6
const SEED_HOUR_RANGE = 12 // 6:00 – 18:00
const CENTER_OFFSET_RANGE = 0.02
const METERS_IN_KM = 1_000
const MS_IN_SECOND = 1_000

const MINUTES_IN_HOUR = 60

const HEAVY_DURATION_SEC = 60
const LIGHT_DURATION_SEC = 90
const MIN_COMPLETED_INTERVALS = 3

function generatePath(
  centerLat: number,
  centerLng: number,
  points: number,
): { latitude: number; longitude: number; timestamp: number }[] {
  const path = []
  const startTime = Date.now()
  const radius = PATH_MIN_RADIUS + Math.random() * PATH_RADIUS_JITTER

  for (let i = 0; i < points; i++) {
    const angle = (2 * Math.PI * i) / points
    const jitter = (Math.random() - 0.5) * PATH_POINT_JITTER
    path.push({
      latitude: centerLat + Math.sin(angle) * radius + jitter,
      longitude: centerLng + Math.cos(angle) * radius + jitter,
      timestamp: startTime + i * PATH_POINT_INTERVAL_MS,
    })
  }

  return path
}

function generateIntervals(durationSec: number) {
  const cycleDuration = HEAVY_DURATION_SEC + LIGHT_DURATION_SEC
  const total = Math.floor(durationSec / cycleDuration)
  const completed = Math.min(total, Math.floor(Math.random() * total) + MIN_COMPLETED_INTERVALS)

  const intervals = []
  let time = Date.now()

  for (let i = 0; i < completed; i++) {
    const isHeavy = i % 2 === 0
    const dur = isHeavy ? HEAVY_DURATION_SEC : LIGHT_DURATION_SEC
    intervals.push({
      type: isHeavy ? 'heavy' : 'light',
      startedAt: time,
      endedAt: time + dur * MS_IN_SECOND,
      duration: dur,
    })
    time += dur * MS_IN_SECOND
  }

  return {
    config: {
      total,
      lightDurationSec: LIGHT_DURATION_SEC,
      heavyDurationSec: HEAVY_DURATION_SEC,
      startWithHeavy: true,
      voiceEnabled: true,
    },
    intervals,
  }
}

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.run.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await hash('password123', BCRYPT_SALT_ROUNDS)
  const user = await prisma.user.create({
    data: {
      email: 'runner@runly.app',
      hashedPassword,
      name: 'Runner',
    },
  })
  console.log(`  👤 Created user: ${user.email} (password: password123)`)

  const centerLat = SEED_CENTER_LAT
  const centerLng = SEED_CENTER_LNG

  const runs = [
    { date: '2026-04-02', distance: 5200, duration: 1680, hasIntervals: false },
    { date: '2026-04-05', distance: 8100, duration: 2700, hasIntervals: true },
    { date: '2026-04-07', distance: 3500, duration: 1200, hasIntervals: false },
    { date: '2026-04-10', distance: 10300, duration: 3300, hasIntervals: false },
    { date: '2026-04-12', distance: 6700, duration: 2100, hasIntervals: true },
    { date: '2026-04-14', distance: 4200, duration: 1500, hasIntervals: false },
    { date: '2026-04-17', distance: 7500, duration: 2400, hasIntervals: true },
    { date: '2026-04-20', distance: 5800, duration: 1900, hasIntervals: false },
    { date: '2026-04-22', distance: 12100, duration: 3900, hasIntervals: false },
    { date: '2026-04-24', distance: 4000, duration: 1350, hasIntervals: true },
    { date: '2026-04-24', distance: 7200, duration: 2300, hasIntervals: false },
    { date: '2026-04-24', distance: 3100, duration: 1050, hasIntervals: true },

    { date: '2026-03-05', distance: 6200, duration: 2000, hasIntervals: false },
    { date: '2026-03-12', distance: 9500, duration: 3100, hasIntervals: true },
    { date: '2026-03-18', distance: 3800, duration: 1300, hasIntervals: false },
    { date: '2026-03-25', distance: 7800, duration: 2500, hasIntervals: true },
    { date: '2026-03-30', distance: 5500, duration: 1800, hasIntervals: false },
  ]

  for (const run of runs) {
    const startHour = SEED_HOUR_MIN + Math.floor(Math.random() * SEED_HOUR_RANGE)
    const startMin = Math.floor(Math.random() * MINUTES_IN_HOUR)
    const startedAt = new Date(
      `${run.date}T${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}:00Z`,
    )
    const endedAt = new Date(startedAt.getTime() + run.duration * MS_IN_SECOND)

    const pathPoints = Math.floor(run.duration / (PATH_POINT_INTERVAL_MS / MS_IN_SECOND))
    const offset = (Math.random() - 0.5) * CENTER_OFFSET_RANGE
    const path = generatePath(centerLat + offset, centerLng + offset, pathPoints)

    await prisma.run.create({
      data: {
        startedAt,
        endedAt,
        distance: run.distance,
        duration: run.duration,
        path,
        intervals: run.hasIntervals ? generateIntervals(run.duration) : undefined,
        userId: user.id,
      },
    })

    console.log(`  ✅ Created run: ${run.date} — ${(run.distance / METERS_IN_KM).toFixed(1)} km`)
  }

  console.log(`\n🎉 Seeded ${runs.length} runs!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
