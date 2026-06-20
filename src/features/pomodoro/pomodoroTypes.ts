import type { StudySession } from '../../types/studySession'

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak'

export type PomodoroSettings = {
  focusMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  cyclesBeforeLongBreak: number
}

export type PomodoroState = {
  mode: PomodoroMode
  remainingSeconds: number
  isRunning: boolean
  isPaused: boolean
  completedFocusCycles: number
}

export type UsePomodoroResult = PomodoroState & {
  settings: PomodoroSettings
  currentCycle: number
  lastCompletedSession: StudySession | null
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  skip: () => void
  reset: () => void
  updateSettings: (settings: PomodoroSettings) => void
}
