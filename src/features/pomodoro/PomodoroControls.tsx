type PomodoroControlsProps = {
  isRunning: boolean
  isPaused: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onSkip: () => void
  onReset: () => void
}

function PomodoroControls({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
  onSkip,
  onReset,
}: PomodoroControlsProps) {
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
      <button className="timer-button timer-button--secondary" onClick={onSkip}>
        Skip
      </button>
      <button className="timer-button timer-button--neutral" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}

export default PomodoroControls
