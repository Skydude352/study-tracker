import type { StudySession } from '../../types/studySession'

export function formatSessionDuration(durationSeconds: number): string {
  const totalMinutes = Math.floor(durationSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes} min`
  }

  return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`
}

export function formatSessionDate(dateValue: string): string {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function sortSessionsByNewest(
  sessions: StudySession[],
): StudySession[] {
  return [...sessions].sort(
    (first, second) =>
      new Date(second.startTime).getTime() -
      new Date(first.startTime).getTime(),
  )
}
