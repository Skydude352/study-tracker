import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { saveStudySession } from '../../data/storage'
import type { StudySession } from '../../types/studySession'
import type {
  PomodoroMode,
  PomodoroSettings,
  PomodoroState,
  UsePomodoroResult,
} from './pomodoroTypes'

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
}

function getModeDuration(
  mode: PomodoroMode,
  settings: PomodoroSettings,
): number {
  if (mode === 'focus') {
    return settings.focusMinutes * 60
  }

  return mode === 'shortBreak'
    ? settings.shortBreakMinutes * 60
    : settings.longBreakMinutes * 60
}

export function getNextPomodoroMode(
  completedFocusCycles: number,
  cyclesBeforeLongBreak: number,
): PomodoroMode {
  return completedFocusCycles % cyclesBeforeLongBreak === 0
    ? 'longBreak'
    : 'shortBreak'
}

function createSessionId(): string {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function sanitizeSettings(settings: PomodoroSettings): PomodoroSettings {
  return {
    focusMinutes: Math.max(1, Math.round(settings.focusMinutes)),
    shortBreakMinutes: Math.max(1, Math.round(settings.shortBreakMinutes)),
    longBreakMinutes: Math.max(1, Math.round(settings.longBreakMinutes)),
    cyclesBeforeLongBreak: Math.max(
      1,
      Math.round(settings.cyclesBeforeLongBreak),
    ),
  }
}

const initialState: PomodoroState = {
  mode: 'focus',
  remainingSeconds: DEFAULT_POMODORO_SETTINGS.focusMinutes * 60,
  isRunning: false,
  isPaused: false,
  completedFocusCycles: 0,
}

function usePomodoroEngine(): UsePomodoroResult {
  const [settings, setSettings] = useState(DEFAULT_POMODORO_SETTINGS)
  const [state, setState] = useState<PomodoroState>(initialState)
  const [lastCompletedSession, setLastCompletedSession] =
    useState<StudySession | null>(null)
  const deadlineRef = useRef<number | null>(null)
  const focusStartedAtRef = useRef<string | null>(null)
  const completePhase = useCallback(() => {
    const completedAt = new Date()
    const timestamp = completedAt.toISOString()

    if (state.mode === 'focus') {
      const durationSeconds = settings.focusMinutes * 60
      const session: StudySession = {
        id: createSessionId(),
        title: 'Pomodoro Focus Session',
        subject: '',
        topic: '',
        notes: '',
        startTime:
          focusStartedAtRef.current ??
          new Date(completedAt.getTime() - durationSeconds * 1000).toISOString(),
        endTime: timestamp,
        durationSeconds,
        mode: 'pomodoro',
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      const completedFocusCycles = state.completedFocusCycles + 1
      const nextMode = getNextPomodoroMode(
        completedFocusCycles,
        settings.cyclesBeforeLongBreak,
      )

      saveStudySession(session)
      setLastCompletedSession(session)
      focusStartedAtRef.current = null
      deadlineRef.current = null
      setState({
        mode: nextMode,
        remainingSeconds: getModeDuration(nextMode, settings),
        isRunning: false,
        isPaused: false,
        completedFocusCycles,
      })
      return
    }

    focusStartedAtRef.current = null
    deadlineRef.current = null
    setState((currentState) => ({
      ...currentState,
      mode: 'focus',
      remainingSeconds: settings.focusMinutes * 60,
      isRunning: false,
      isPaused: false,
    }))
  }, [settings, state.completedFocusCycles, state.mode])

  useEffect(() => {
    if (!state.isRunning || state.isPaused) {
      return undefined
    }

    const updateCountdown = () => {
      const deadline = deadlineRef.current

      if (deadline === null) {
        return
      }

      const remainingSeconds = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000),
      )

      if (remainingSeconds === 0) {
        completePhase()
      } else {
        setState((currentState) => ({
          ...currentState,
          remainingSeconds,
        }))
      }
    }

    updateCountdown()
    const intervalId = window.setInterval(updateCountdown, 250)

    return () => window.clearInterval(intervalId)
  }, [completePhase, state.isPaused, state.isRunning])

  const start = useCallback(() => {
    const now = Date.now()

    deadlineRef.current = now + state.remainingSeconds * 1000
    if (state.mode === 'focus' && focusStartedAtRef.current === null) {
      focusStartedAtRef.current = new Date(now).toISOString()
    }
    setLastCompletedSession(null)
    setState((currentState) => ({
      ...currentState,
      isRunning: true,
      isPaused: false,
    }))
  }, [state.mode, state.remainingSeconds])

  const pause = useCallback(() => {
    if (!state.isRunning || state.isPaused || deadlineRef.current === null) {
      return
    }

    const remainingSeconds = Math.max(
      0,
      Math.ceil((deadlineRef.current - Date.now()) / 1000),
    )
    deadlineRef.current = null
    setState((currentState) => ({
      ...currentState,
      remainingSeconds,
      isPaused: true,
    }))
  }, [state.isPaused, state.isRunning])

  const resume = useCallback(() => {
    if (!state.isRunning || !state.isPaused) {
      return
    }

    deadlineRef.current = Date.now() + state.remainingSeconds * 1000
    setState((currentState) => ({
      ...currentState,
      isPaused: false,
    }))
  }, [state.isPaused, state.isRunning, state.remainingSeconds])

  const stop = useCallback(() => {
    if (!state.isRunning) {
      return
    }

    const remainingSeconds =
      deadlineRef.current === null
        ? state.remainingSeconds
        : Math.max(
            0,
            Math.ceil((deadlineRef.current - Date.now()) / 1000),
          )

    deadlineRef.current = null
    setState((currentState) => ({
      ...currentState,
      remainingSeconds,
      isRunning: false,
      isPaused: false,
    }))
  }, [state.isRunning, state.remainingSeconds])

  const skip = useCallback(() => {
    deadlineRef.current = null
    focusStartedAtRef.current = null
    setLastCompletedSession(null)

    if (state.mode === 'focus') {
      const completedFocusCycles = state.completedFocusCycles + 1
      const nextMode = getNextPomodoroMode(
        completedFocusCycles,
        settings.cyclesBeforeLongBreak,
      )
      setState({
        mode: nextMode,
        remainingSeconds: getModeDuration(nextMode, settings),
        isRunning: false,
        isPaused: false,
        completedFocusCycles,
      })
      return
    }

    setState((currentState) => ({
      ...currentState,
      mode: 'focus',
      remainingSeconds: settings.focusMinutes * 60,
      isRunning: false,
      isPaused: false,
    }))
  }, [settings, state.completedFocusCycles, state.mode])

  const reset = useCallback(() => {
    deadlineRef.current = null
    focusStartedAtRef.current = null
    setSettings(DEFAULT_POMODORO_SETTINGS)
    setState(initialState)
    setLastCompletedSession(null)
  }, [])

  const updateSettings = useCallback((nextSettings: PomodoroSettings) => {
    const sanitizedSettings = sanitizeSettings(nextSettings)

    deadlineRef.current = null
    focusStartedAtRef.current = null
    setSettings(sanitizedSettings)
    setState({
      mode: 'focus',
      remainingSeconds: sanitizedSettings.focusMinutes * 60,
      isRunning: false,
      isPaused: false,
      completedFocusCycles: 0,
    })
    setLastCompletedSession(null)
  }, [])

  return {
    ...state,
    settings,
    currentCycle:
      state.mode === 'focus'
        ? (state.completedFocusCycles % settings.cyclesBeforeLongBreak) + 1
        : ((state.completedFocusCycles - 1) %
            settings.cyclesBeforeLongBreak) +
          1,
    lastCompletedSession,
    start,
    pause,
    resume,
    stop,
    skip,
    reset,
    updateSettings,
  }
}

const PomodoroContext = createContext<UsePomodoroResult | null>(null)

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const pomodoro = usePomodoroEngine()

  return createElement(PomodoroContext.Provider, { value: pomodoro }, children)
}

export function usePomodoro(): UsePomodoroResult {
  const pomodoro = useContext(PomodoroContext)

  if (!pomodoro) {
    throw new Error('usePomodoro must be used inside PomodoroProvider')
  }

  return pomodoro
}
