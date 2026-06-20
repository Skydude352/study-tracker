import { formatElapsedTime } from '../../utils/timeUtils'

type TimerDisplayProps = {
  elapsedSeconds: number
  isPaused: boolean
  isRunning: boolean
}

function TimerDisplay({
  elapsedSeconds,
  isPaused,
  isRunning,
}: TimerDisplayProps) {
  const status = isPaused ? 'Paused' : isRunning ? 'Studying' : 'Ready'

  return (
    <div className="timer-display" aria-live="off">
      <p className="timer-status">{status}</p>
      <time className="timer-time">{formatElapsedTime(elapsedSeconds)}</time>
    </div>
  )
}

export default TimerDisplay
