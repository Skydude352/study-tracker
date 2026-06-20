import { formatCountdown } from '../../utils/timeUtils'
import type { PomodoroMode } from './pomodoroTypes'

const modeLabels: Record<PomodoroMode, string> = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
}

type PomodoroDisplayProps = {
  mode: PomodoroMode
  remainingSeconds: number
  currentCycle: number
  cyclesBeforeLongBreak: number
}

function PomodoroDisplay({
  mode,
  remainingSeconds,
  currentCycle,
  cyclesBeforeLongBreak,
}: PomodoroDisplayProps) {
  return (
    <div className={`pomodoro-display pomodoro-display--${mode}`}>
      <p className="timer-status">{modeLabels[mode]}</p>
      <time className="timer-time">{formatCountdown(remainingSeconds)}</time>
      <p className="pomodoro-cycle">
        Focus cycle {currentCycle} of {cyclesBeforeLongBreak}
      </p>
    </div>
  )
}

export default PomodoroDisplay
