/**
 * Format duration in seconds to HH:MM:SS or MM:SS
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Format distance in meters to km with 2 decimal places
 */
export function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(2)} km`
}

/**
 * Format pace as min/km from distance (meters) and duration (seconds)
 */
export function formatPace(distanceMeters: number, durationSeconds: number): string {
  if (distanceMeters === 0 || durationSeconds === 0) return '--:--'
  const paceSeconds = durationSeconds / (distanceMeters / 1000)
  const min = Math.floor(paceSeconds / 60)
  const sec = Math.floor(paceSeconds % 60)
  return `${min}:${sec.toString().padStart(2, '0')} /km`
}
