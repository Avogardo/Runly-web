import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE, METERS_IN_KM } from '@/consts'

/**
 * Format duration in seconds to HH:MM:SS or MM:SS
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / SECONDS_IN_HOUR)
  const m = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
  const s = Math.floor(seconds % SECONDS_IN_MINUTE)

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Format distance in meters to km with 2 decimal places
 */
export function formatDistance(meters: number): string {
  return `${(meters / METERS_IN_KM).toFixed(2)} km`
}

/**
 * Format pace as min/km from distance (meters) and duration (seconds)
 */
export function formatPace(distanceMeters: number, durationSeconds: number): string {
  if (distanceMeters === 0 || durationSeconds === 0) return '--:--'
  const paceSeconds = durationSeconds / (distanceMeters / METERS_IN_KM)
  const min = Math.floor(paceSeconds / SECONDS_IN_MINUTE)
  const sec = Math.floor(paceSeconds % SECONDS_IN_MINUTE)
  return `${min}:${sec.toString().padStart(2, '0')} /km`
}
