import { useCallback, useEffect, useRef, useState } from 'react'
import { saveStudySession } from '../../data/storage'
import type {
  StudySession,
  StudySessionDetails,
} from '../../types/studySession'
import type { TimerState, UseTimerResult } from './timerTypes'

const initialTimerState: TimerState = {
  startTime: null,
  isPaused: false,
  elapsedSeconds: 0,
  isRunning: false,
}

function createSessionId(): string {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useTimer(): UseTimerResult {
  const [timerState, setTimerState] = useState<TimerState>(initialTimerState)
  const [lastCompletedSession, setLastCompletedSession] =
    useState<StudySession | null>(null)
  const activeStartedAtRef = useRef<number | null>(null)
  const accumulatedMillisecondsRef = useRef(0)

  const getCurrentElapsedMilliseconds = useCallback(() => {
    const activeStartedAt = activeStartedAtRef.current

    if (activeStartedAt === null) {
      return accumulatedMillisecondsRef.current
    }

    return accumulatedMillisecondsRef.current + (Date.now() - activeStartedAt)
  }, [])

  useEffect(() => {
    if (!timerState.isRunning || timerState.isPaused) {
      return undefined
    }

    const updateElapsedSeconds = () => {
      setTimerState((currentState) => ({
        ...currentState,
        elapsedSeconds: Math.floor(getCurrentElapsedMilliseconds() / 1000),
      }))
    }

    updateElapsedSeconds()
    const intervalId = window.setInterval(updateElapsedSeconds, 250)

    return () => window.clearInterval(intervalId)
  }, [getCurrentElapsedMilliseconds, timerState.isPaused, timerState.isRunning])

  const start = useCallback(() => {
    const now = Date.now()

    accumulatedMillisecondsRef.current = 0
    activeStartedAtRef.current = now
    setLastCompletedSession(null)
    setTimerState({
      startTime: new Date(now).toISOString(),
      isPaused: false,
      elapsedSeconds: 0,
      isRunning: true,
    })
  }, [])

  const pause = useCallback(() => {
    if (
      !timerState.isRunning ||
      timerState.isPaused ||
      activeStartedAtRef.current === null
    ) {
      return
    }

    accumulatedMillisecondsRef.current = getCurrentElapsedMilliseconds()
    activeStartedAtRef.current = null
    setTimerState((currentState) => ({
      ...currentState,
      isPaused: true,
      elapsedSeconds: Math.floor(accumulatedMillisecondsRef.current / 1000),
    }))
  }, [getCurrentElapsedMilliseconds, timerState.isPaused, timerState.isRunning])

  const resume = useCallback(() => {
    if (!timerState.isRunning || !timerState.isPaused) {
      return
    }

    activeStartedAtRef.current = Date.now()
    setTimerState((currentState) => ({
      ...currentState,
      isPaused: false,
    }))
  }, [timerState.isPaused, timerState.isRunning])

  const stop = useCallback((details: StudySessionDetails): StudySession | null => {
    if (!timerState.isRunning || !timerState.startTime) {
      return null
    }

    const stoppedAt = new Date()
    const timestamp = stoppedAt.toISOString()
    const session: StudySession = {
      id: createSessionId(),
      title: details.title.trim() || 'Untitled Study Session',
      subject: details.subject.trim(),
      topic: details.topic.trim(),
      notes: details.notes.trim(),
      startTime: timerState.startTime,
      endTime: timestamp,
      durationSeconds: Math.floor(getCurrentElapsedMilliseconds() / 1000),
      mode: 'normal',
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    saveStudySession(session)
    setLastCompletedSession(session)
    accumulatedMillisecondsRef.current = 0
    activeStartedAtRef.current = null
    setTimerState(initialTimerState)

    return session
  }, [getCurrentElapsedMilliseconds, timerState.isRunning, timerState.startTime])

  return {
    ...timerState,
    start,
    pause,
    resume,
    stop,
    lastCompletedSession,
  }
}
