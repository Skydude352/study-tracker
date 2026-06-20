import { useState } from 'react'
import SessionForm from '../features/sessions/SessionForm'
import TimerControls from '../features/timer/TimerControls'
import TimerDisplay from '../features/timer/TimerDisplay'
import { useTimer } from '../features/timer/useTimer'
import { formatElapsedTime } from '../utils/timeUtils'
import type { StudySessionDetails } from '../types/studySession'

const emptySessionDetails: StudySessionDetails = {
  title: '',
  subject: '',
  topic: '',
  notes: '',
}

function TimerPage() {
  const timer = useTimer()
  const [sessionDetails, setSessionDetails] =
    useState<StudySessionDetails>(emptySessionDetails)

  const stopAndSaveSession = () => {
    const session = timer.stop(sessionDetails)

    if (session) {
      setSessionDetails(emptySessionDetails)
    }
  }

  return (
    <section className="page">
      <p className="page-eyebrow">Focus</p>
      <h1>Timer</h1>
      <p>Start a normal study session and focus for as long as you need.</p>

      <SessionForm values={sessionDetails} onChange={setSessionDetails} />

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
          onStop={stopAndSaveSession}
        />
      </div>

      {timer.lastCompletedSession && (
        <p className="timer-complete-message" role="status">
          “{timer.lastCompletedSession.title}” saved: {' '}
          {formatElapsedTime(timer.lastCompletedSession.durationSeconds)}
        </p>
      )}
    </section>
  )
}

export default TimerPage
