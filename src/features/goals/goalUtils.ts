import type { StudySession } from '../../types/studySession'
import type {
  GoalsProgressSummary,
  GoalUnit,
  StudyGoals,
} from './goalTypes'

export function convertGoalToMinutes(amount: number, unit: GoalUnit): number {
  return unit === 'hours' ? amount * 60 : amount
}

function sumDuration(sessions: StudySession[]): number {
  return sessions.reduce(
    (total, session) => total + Math.max(0, session.durationSeconds),
    0,
  )
}

function buildProgress(
  studiedSeconds: number,
  targetMinutes: number | null,
) {
  const targetSeconds = targetMinutes === null ? null : targetMinutes * 60

  return {
    studiedSeconds,
    targetSeconds,
    percentage:
      targetSeconds && targetSeconds > 0
        ? (studiedSeconds / targetSeconds) * 100
        : 0,
  }
}

export function calculateGoalProgress(
  sessions: StudySession[],
  goals: StudyGoals,
  now = new Date(),
): GoalsProgressSummary {
  const todaySessions = sessions.filter((session) => {
    const date = new Date(session.startTime)
    return (
      !Number.isNaN(date.getTime()) &&
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    )
  })
  const weekStart = new Date(now)
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7))
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 7)
  const weekSessions = sessions.filter((session) => {
    const date = new Date(session.startTime)
    return date >= weekStart && date < weekEnd
  })

  return {
    daily: buildProgress(
      sumDuration(todaySessions),
      goals.dailyGoalMinutes,
    ),
    weekly: buildProgress(
      sumDuration(weekSessions),
      goals.weeklyGoalMinutes,
    ),
  }
}
