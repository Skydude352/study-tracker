import type { TimerControlsProps } from './timerTypes'

function TimerControls({
  isPaused,
  isRunning,
  onStart,
  onPause,
  onResume,
  onStop,
}: TimerControlsProps) {
  return (
    <div className="timer-controls">
      {!isRunning && (
        <button className="timer-button timer-button--primary" onClick={onStart}>
          Start
        </button>
      )}

      {isRunning && !isPaused && (
        <button className="timer-button timer-button--secondary" onClick={onPause}>
          Pause
        </button>
      )}

      {isRunning && isPaused && (
        <button className="timer-button timer-button--primary" onClick={onResume}>
          Resume
        </button>
      )}

      {isRunning && (
        <button className="timer-button timer-button--danger" onClick={onStop}>
          Stop
        </button>
      )}
    </div>
  )
}

export default TimerControls
