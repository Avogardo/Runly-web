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

/**
 * cn utility for conditional classNames
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format a Date to HH:MM in UTC
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}

/**
 * Format a Date to a full date-time string in UTC
 */
export function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}

