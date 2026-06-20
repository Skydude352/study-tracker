import type {
  StudySession,
  StudySessionUpdates,
} from '../types/studySession'
import type { StudyGoals } from '../features/goals/goalTypes'

export const STUDY_SESSIONS_STORAGE_KEY = 'study-tracker:sessions'
export const STUDY_SESSIONS_UPDATED_EVENT = 'study-tracker:sessions-updated'
export const STUDY_GOALS_STORAGE_KEY = 'study-tracker:goals'
export const STUDY_GOALS_UPDATED_EVENT = 'study-tracker:goals-updated'

export const EMPTY_STUDY_GOALS: StudyGoals = {
  dailyGoalMinutes: null,
  weeklyGoalMinutes: null,
  updatedAt: '',
}

function notifyStudySessionsUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(STUDY_SESSIONS_UPDATED_EVENT))
  }
}

function isStudySession(value: unknown): value is StudySession {
  if (!value || typeof value !== 'object') {
    return false
  }

  const session = value as Record<string, unknown>

  return (
    typeof session.id === 'string' &&
    typeof session.title === 'string' &&
    typeof session.subject === 'string' &&
    typeof session.topic === 'string' &&
    typeof session.notes === 'string' &&
    typeof session.startTime === 'string' &&
    typeof session.endTime === 'string' &&
    typeof session.durationSeconds === 'number' &&
    Number.isFinite(session.durationSeconds) &&
    session.durationSeconds >= 0 &&
    (session.mode === 'normal' || session.mode === 'pomodoro') &&
    typeof session.createdAt === 'string' &&
    typeof session.updatedAt === 'string'
  )
}

function writeStudySessions(sessions: StudySession[]): boolean {
  try {
    localStorage.setItem(STUDY_SESSIONS_STORAGE_KEY, JSON.stringify(sessions))
    notifyStudySessionsUpdated()
    return true
  } catch {
    return false
  }
}

export function getStudySessions(): StudySession[] {
  try {
    const storedValue = localStorage.getItem(STUDY_SESSIONS_STORAGE_KEY)

    if (!storedValue) {
      return []
    }

    const parsedValue: unknown = JSON.parse(storedValue)

    return Array.isArray(parsedValue) ? parsedValue.filter(isStudySession) : []
  } catch {
    return []
  }
}

export function saveStudySession(session: StudySession): boolean {
  const sessions = getStudySessions()
  const existingSessionIndex = sessions.findIndex(({ id }) => id === session.id)

  if (existingSessionIndex >= 0) {
    sessions[existingSessionIndex] = session
  } else {
    sessions.push(session)
  }

  return writeStudySessions(sessions)
}

export function updateStudySession(
  sessionId: string,
  updates: StudySessionUpdates,
): StudySession | null {
  const sessions = getStudySessions()
  const sessionIndex = sessions.findIndex(({ id }) => id === sessionId)

  if (sessionIndex < 0) {
    return null
  }

  const updatedSession: StudySession = {
    ...sessions[sessionIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  sessions[sessionIndex] = updatedSession

  return writeStudySessions(sessions) ? updatedSession : null
}

export function deleteStudySession(sessionId: string): boolean {
  const sessions = getStudySessions()
  const remainingSessions = sessions.filter(({ id }) => id !== sessionId)

  return writeStudySessions(remainingSessions)
}

export function clearStudySessions(): boolean {
  try {
    localStorage.removeItem(STUDY_SESSIONS_STORAGE_KEY)
    notifyStudySessionsUpdated()
    return true
  } catch {
    return false
  }
}

function isValidGoal(value: unknown): value is number | null {
  return (
    value === null ||
    (typeof value === 'number' && Number.isFinite(value) && value > 0)
  )
}

export function getStudyGoals(): StudyGoals {
  try {
    const storedValue = localStorage.getItem(STUDY_GOALS_STORAGE_KEY)
    if (!storedValue) return EMPTY_STUDY_GOALS

    const parsed: unknown = JSON.parse(storedValue)
    if (!parsed || typeof parsed !== 'object') return EMPTY_STUDY_GOALS

    const goals = parsed as Record<string, unknown>
    return isValidGoal(goals.dailyGoalMinutes) &&
      isValidGoal(goals.weeklyGoalMinutes) &&
      typeof goals.updatedAt === 'string'
      ? (goals as StudyGoals)
      : EMPTY_STUDY_GOALS
  } catch {
    return EMPTY_STUDY_GOALS
  }
}

export function saveStudyGoals(goals: StudyGoals): boolean {
  try {
    localStorage.setItem(STUDY_GOALS_STORAGE_KEY, JSON.stringify(goals))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(STUDY_GOALS_UPDATED_EVENT))
    }
    return true
  } catch {
    return false
  }
}
