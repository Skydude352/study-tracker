import type { StudySession } from '../../types/studySession'
import { formatShortDate } from '../../utils/dateUtils'
import { formatStudyTime } from '../../utils/timeUtils'

type RecentSessionsProps = {
  sessions: StudySession[]
}

function RecentSessions({ sessions }: RecentSessionsProps) {
  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel-heading">
        <h2>Recent sessions</h2>
        <span>Latest {sessions.length}</span>
      </div>
      <div className="recent-sessions">
        {sessions.map((session) => (
          <article className="recent-session" key={session.id}>
            <div>
              <h3>{session.title}</h3>
              <p>{session.subject || 'Uncategorized'}</p>
            </div>
            <div className="recent-session-details">
              <strong>{formatStudyTime(session.durationSeconds)}</strong>
              <time dateTime={session.startTime}>
                {formatShortDate(session.startTime)}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecentSessions
