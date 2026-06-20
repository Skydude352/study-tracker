export function formatElapsedTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':')
}

export function formatDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60
  const parts: string[] = []

  if (hours > 0) {
    parts.push(`${hours} hr`)
  }

  if (minutes > 0) {
    parts.push(`${minutes} min`)
  }

  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} sec`)
  }

  return parts.join(' ')
}

export function formatStudyTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)

  if (hours === 0) {
    return minutes > 0 ? `${minutes}m` : safeSeconds > 0 ? '<1m' : '0m'
  }

  return `${hours}h ${minutes.toString().padStart(2, '0')}m`
}
