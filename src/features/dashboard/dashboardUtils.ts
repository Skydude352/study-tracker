import type { StudySession } from '../../types/studySession'

export type SubjectStudyTime = {
  subject: string
  durationSeconds: number
}

export type DashboardSummary = {
  totalTodaySeconds: number
  totalThisWeekSeconds: number
  totalAllTimeSeconds: number
  sessionCountToday: number
  sessionCountThisWeek: number
  sessionCountAllTime: number
  subjectBreakdown: SubjectStudyTime[]
  mostStudiedSubject: SubjectStudyTime | null
  recentSessions: StudySession[]
}

function sumSessionDuration(sessions: StudySession[]): number {
  return sessions.reduce(
    (total, session) => total + Math.max(0, session.durationSeconds),
    0,
  )
}

function isSameLocalDay(date: Date, comparisonDate: Date): boolean {
  return (
    date.getFullYear() === comparisonDate.getFullYear() &&
    date.getMonth() === comparisonDate.getMonth() &&
    date.getDate() === comparisonDate.getDate()
  )
}

function getLocalWeekRange(now: Date): { start: Date; end: Date } {
  const start = new Date(now)
  const daysSinceMonday = (start.getDay() + 6) % 7

  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - daysSinceMonday)

  const end = new Date(start)
  end.setDate(end.getDate() + 7)

  return { start, end }
}

export function calculateSubjectBreakdown(
  sessions: StudySession[],
): SubjectStudyTime[] {
  const totals = new Map<string, number>()

  sessions.forEach((session) => {
    const subject = session.subject.trim() || 'Uncategorized'
    totals.set(
      subject,
      (totals.get(subject) ?? 0) + Math.max(0, session.durationSeconds),
    )
  })

  return [...totals.entries()]
    .map(([subject, durationSeconds]) => ({ subject, durationSeconds }))
    .sort((first, second) => second.durationSeconds - first.durationSeconds)
}

export function getRecentSessions(
  sessions: StudySession[],
  limit = 5,
): StudySession[] {
  return [...sessions]
    .sort(
      (first, second) =>
        new Date(second.startTime).getTime() -
        new Date(first.startTime).getTime(),
    )
    .slice(0, limit)
}

export function calculateDashboardSummary(
  sessions: StudySession[],
  now = new Date(),
): DashboardSummary {
  const { start: weekStart, end: weekEnd } = getLocalWeekRange(now)
  const sessionsToday = sessions.filter((session) => {
    const startTime = new Date(session.startTime)
    return !Number.isNaN(startTime.getTime()) && isSameLocalDay(startTime, now)
  })
  const sessionsThisWeek = sessions.filter((session) => {
    const startTime = new Date(session.startTime)
    return startTime >= weekStart && startTime < weekEnd
  })
  const subjectBreakdown = calculateSubjectBreakdown(sessions)

  return {
    totalTodaySeconds: sumSessionDuration(sessionsToday),
    totalThisWeekSeconds: sumSessionDuration(sessionsThisWeek),
    totalAllTimeSeconds: sumSessionDuration(sessions),
    sessionCountToday: sessionsToday.length,
    sessionCountThisWeek: sessionsThisWeek.length,
    sessionCountAllTime: sessions.length,
    subjectBreakdown,
    mostStudiedSubject: subjectBreakdown[0] ?? null,
    recentSessions: getRecentSessions(sessions),
  }
}
