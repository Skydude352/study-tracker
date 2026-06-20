import type {
  StudySession,
  StudySessionDetails,
} from '../../types/studySession'
import SessionCard from './SessionCard'

type SessionListProps = {
  sessions: StudySession[]
  onDelete: (sessionId: string) => void
  onEdit: (sessionId: string, details: StudySessionDetails) => void
}

function SessionList({ sessions, onDelete, onEdit }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <p className="empty-state">
        No study sessions yet. Start the timer to create your first one.
      </p>
    )
  }

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default SessionList
