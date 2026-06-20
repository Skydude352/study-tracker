import PomodoroControls from './PomodoroControls'
import PomodoroDisplay from './PomodoroDisplay'
import PomodoroSettings from './PomodoroSettings'
import { usePomodoro } from './usePomodoro'

function PomodoroPage() {
  const pomodoro = usePomodoro()

  return (
    <section className="pomodoro-section" aria-labelledby="pomodoro-heading">
      <p className="page-eyebrow">Focus cycles</p>
      <h2 id="pomodoro-heading">Pomodoro</h2>
      <p>Alternate focused study blocks with short, restorative breaks.</p>

      <div className="pomodoro-layout">
        <div>
          <PomodoroSettings
            settings={pomodoro.settings}
            disabled={pomodoro.isRunning}
            onChange={pomodoro.updateSettings}
          />
        </div>

        <div className="pomodoro-timer">
          <PomodoroDisplay
            mode={pomodoro.mode}
            remainingSeconds={pomodoro.remainingSeconds}
            currentCycle={pomodoro.currentCycle}
            cyclesBeforeLongBreak={pomodoro.settings.cyclesBeforeLongBreak}
          />
          <PomodoroControls
            isRunning={pomodoro.isRunning}
            isPaused={pomodoro.isPaused}
            onStart={pomodoro.start}
            onPause={pomodoro.pause}
            onResume={pomodoro.resume}
            onStop={pomodoro.stop}
            onSkip={pomodoro.skip}
            onReset={pomodoro.reset}
          />
          {pomodoro.lastCompletedSession && (
            <p className="timer-complete-message" role="status">
              Focus session saved. Time for a break.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default PomodoroPage
