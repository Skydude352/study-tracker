import type { StudySession } from '../../types/studySession'

export type TimerState = {
  startTime: string | null
  isPaused: boolean
  elapsedSeconds: number
  isRunning: boolean
}

export type TimerControlsProps = Pick<TimerState, 'isPaused' | 'isRunning'> & {
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
}

export type UseTimerResult = TimerState & {
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => StudySession | null
  lastCompletedSession: StudySession | null
}
