import TimerControls from '../features/timer/TimerControls'
import TimerDisplay from '../features/timer/TimerDisplay'
import { useTimer } from '../features/timer/useTimer'
import { formatElapsedTime } from '../utils/timeUtils'

function TimerPage() {
  const timer = useTimer()

  return (
    <section className="page">
      <p className="page-eyebrow">Focus</p>
      <h1>Timer</h1>
      <p>Start a normal study session and focus for as long as you need.</p>

      <div className="timer">
        <TimerDisplay
          elapsedSeconds={timer.elapsedSeconds}
          isPaused={timer.isPaused}
          isRunning={timer.isRunning}
        />
        <TimerControls
          isPaused={timer.isPaused}
          isRunning={timer.isRunning}
          onStart={timer.start}
          onPause={timer.pause}
          onResume={timer.resume}
          onStop={timer.stop}
        />
      </div>

      {timer.lastCompletedSession && (
        <p className="timer-complete-message" role="status">
          Session created: {formatElapsedTime(timer.lastCompletedSession.durationSeconds)}
        </p>
      )}
    </section>
  )
}

export default TimerPage
