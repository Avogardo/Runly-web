import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

/**
 * Generate a fake running path around a center point.
 * Creates a roughly circular route with some randomness.
 */
function generatePath(
  centerLat: number,
  centerLng: number,
  points: number,
): { latitude: number; longitude: number; timestamp: number }[] {
  const path = []
  const startTime = Date.now()
  const radius = 0.005 + Math.random() * 0.01 // ~0.5-1.5km radius

  for (let i = 0; i < points; i++) {
    const angle = (2 * Math.PI * i) / points
    const jitter = (Math.random() - 0.5) * 0.001
    path.push({
      latitude: centerLat + Math.sin(angle) * radius + jitter,
      longitude: centerLng + Math.cos(angle) * radius + jitter,
      timestamp: startTime + i * 5000, // point every 5 seconds
    })
  }

  return path
}

/**
 * Generate fake interval data for some runs.
 */
function generateIntervals(durationSec: number) {
  const heavyDuration = 60
  const lightDuration = 90
  const cycleDuration = heavyDuration + lightDuration
  const total = Math.floor(durationSec / cycleDuration)
  const completed = Math.min(total, Math.floor(Math.random() * total) + 3)

  const intervals = []
  let time = Date.now()

  for (let i = 0; i < completed; i++) {
    const isHeavy = i % 2 === 0
    const dur = isHeavy ? heavyDuration : lightDuration
    intervals.push({
      type: isHeavy ? 'heavy' : 'light',
      startedAt: time,
      endedAt: time + dur * 1000,
      duration: dur,
    })
    time += dur * 1000
  }

  return {
    config: {
      total,
      lightDurationSec: lightDuration,
      heavyDurationSec: heavyDuration,
      startWithHeavy: true,
      voiceEnabled: true,
    },
    intervals,
  }
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.run.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create seed user
  const hashedPassword = await hash('password123', 12)
  const user = await prisma.user.create({
    data: {
      email: 'runner@runly.app',
      hashedPassword,
      name: 'Runner',
    },
  })
  console.log(`  👤 Created user: ${user.email} (password: password123)`)

  // Kraków, Poland area coordinates
  const centerLat = 50.0647
  const centerLng = 19.945

  const runs = [
    // April 2026 runs
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
    // March 2026 runs
    { date: '2026-03-05', distance: 6200, duration: 2000, hasIntervals: false },
    { date: '2026-03-12', distance: 9500, duration: 3100, hasIntervals: true },
    { date: '2026-03-18', distance: 3800, duration: 1300, hasIntervals: false },
    { date: '2026-03-25', distance: 7800, duration: 2500, hasIntervals: true },
    { date: '2026-03-30', distance: 5500, duration: 1800, hasIntervals: false },
  ]

  for (const run of runs) {
    const startHour = 6 + Math.floor(Math.random() * 12) // 6:00 - 18:00
    const startMin = Math.floor(Math.random() * 60)
    const startedAt = new Date(`${run.date}T${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}:00Z`)
    const endedAt = new Date(startedAt.getTime() + run.duration * 1000)

    const pathPoints = Math.floor(run.duration / 5) // one point every ~5 seconds
    const offset = (Math.random() - 0.5) * 0.02
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

    console.log(`  ✅ Created run: ${run.date} — ${(run.distance / 1000).toFixed(1)} km`)
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

