import { mockStudySessions } from '../data/mockData'
import { getStudySessions } from '../data/storage'
import {
  formatSessionDate,
  formatSessionDuration,
  sortSessionsByNewest,
} from '../features/sessions/sessionUtils'

function SessionsPage() {
  const storedSessions = getStudySessions()
  const sessions = sortSessionsByNewest(
    storedSessions.length > 0 ? storedSessions : mockStudySessions,
  )

  return (
    <section className="page">
      <p className="page-eyebrow">History</p>
      <h1>Sessions</h1>
      <p>Review your completed study sessions and recent activity here.</p>

      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <article>
                <h2>{session.title}</h2>
                <p>
                  {session.subject} · {session.topic}
                </p>
                <p>
                  {formatSessionDate(session.startTime)} ·{' '}
                  {formatSessionDuration(session.durationSeconds)} ·{' '}
                  {session.mode === 'pomodoro' ? 'Pomodoro' : 'Normal'}
                </p>
                {session.notes && <p>{session.notes}</p>}
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p>No study sessions yet. Completed sessions will appear here.</p>
      )}
    </section>
  )
}

export default SessionsPage
