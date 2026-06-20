import { useState } from 'react'
import type { StudySessionDetails } from '../../types/studySession'
import SessionForm from '../sessions/SessionForm'
import PomodoroControls from './PomodoroControls'
import PomodoroDisplay from './PomodoroDisplay'
import PomodoroSettings from './PomodoroSettings'
import { usePomodoro } from './usePomodoro'

const emptySessionDetails: StudySessionDetails = {
  title: '',
  subject: '',
  topic: '',
  notes: '',
}

function PomodoroPage() {
  const [sessionDetails, setSessionDetails] =
    useState<StudySessionDetails>(emptySessionDetails)
  const pomodoro = usePomodoro(sessionDetails)

  return (
    <section className="page page--wide">
      <p className="page-eyebrow">Focus cycles</p>
      <h1>Pomodoro</h1>
      <p>Alternate focused study blocks with short, restorative breaks.</p>

      <div className="pomodoro-layout">
        <div>
          <SessionForm
            values={sessionDetails}
            onChange={setSessionDetails}
            idPrefix="pomodoro"
          />
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
