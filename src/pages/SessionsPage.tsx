import { useState } from 'react'
import {
  deleteStudySession,
  getStudySessions,
  updateStudySession,
} from '../data/storage'
import SessionList from '../features/sessions/SessionList'
import { sortSessionsByNewest } from '../features/sessions/sessionUtils'
import type { StudySessionDetails } from '../types/studySession'

function SessionsPage() {
  const [sessions, setSessions] = useState(() =>
    sortSessionsByNewest(getStudySessions()),
  )

  const handleDelete = (sessionId: string) => {
    if (deleteStudySession(sessionId)) {
      setSessions((currentSessions) =>
        currentSessions.filter(({ id }) => id !== sessionId),
      )
    }
  }

  const handleEdit = (sessionId: string, details: StudySessionDetails) => {
    const updatedSession = updateStudySession(sessionId, details)

    if (updatedSession) {
      setSessions((currentSessions) =>
        currentSessions.map((session) =>
          session.id === sessionId ? updatedSession : session,
        ),
      )
    }
  }

  return (
    <section className="page">
      <p className="page-eyebrow">History</p>
      <h1>Sessions</h1>
      <p>Review your completed study sessions and recent activity here.</p>

      <SessionList
        sessions={sessions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </section>
  )
}

export default SessionsPage
