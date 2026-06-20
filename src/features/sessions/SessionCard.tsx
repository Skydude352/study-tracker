import { useState } from 'react'
import type {
  StudySession,
  StudySessionDetails,
} from '../../types/studySession'
import { formatDateTime } from '../../utils/dateUtils'
import { formatDuration } from '../../utils/timeUtils'
import SessionForm from './SessionForm'

type SessionCardProps = {
  session: StudySession
  onDelete: (sessionId: string) => void
  onEdit: (sessionId: string, details: StudySessionDetails) => void
}

function getSessionDetails(session: StudySession): StudySessionDetails {
  return {
    title: session.title,
    subject: session.subject,
    topic: session.topic,
    notes: session.notes,
  }
}

function SessionCard({ session, onDelete, onEdit }: SessionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<StudySessionDetails>(() =>
    getSessionDetails(session),
  )

  const saveChanges = () => {
    onEdit(session.id, {
      ...draft,
      title: draft.title.trim() || 'Untitled Study Session',
    })
    setIsEditing(false)
  }

  const cancelEditing = () => {
    setDraft(getSessionDetails(session))
    setIsEditing(false)
  }

  return (
    <article className="session-card">
      {isEditing ? (
        <>
          <SessionForm
            values={draft}
            onChange={setDraft}
            idPrefix={`edit-${session.id}`}
          />
          <div className="session-card-actions">
            <button className="text-button text-button--primary" onClick={saveChanges}>
              Save changes
            </button>
            <button className="text-button" onClick={cancelEditing}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="session-card-heading">
            <div>
              <h2>{session.title}</h2>
              <p className="session-card-meta">
                {session.subject || 'No subject'}
                <span aria-hidden="true"> / </span>
                {session.topic || 'No topic'}
              </p>
            </div>
            <strong className="session-duration">
              {formatDuration(session.durationSeconds)}
            </strong>
          </div>

          <time className="session-date" dateTime={session.startTime}>
            {formatDateTime(session.startTime)}
          </time>

          {session.notes && <p className="session-notes">{session.notes}</p>}

          <div className="session-card-actions">
            <button
              className="text-button text-button--primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="text-button text-button--danger"
              onClick={() => onDelete(session.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default SessionCard
