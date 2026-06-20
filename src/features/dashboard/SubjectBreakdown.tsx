import { formatStudyTime } from '../../utils/timeUtils'
import type { SubjectStudyTime } from './dashboardUtils'

type SubjectBreakdownProps = {
  subjects: SubjectStudyTime[]
}

function SubjectBreakdown({ subjects }: SubjectBreakdownProps) {
  const largestTotal = subjects[0]?.durationSeconds ?? 0

  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel-heading">
        <h2>Time by subject</h2>
        <span>{subjects.length} subjects</span>
      </div>
      <div className="subject-breakdown">
        {subjects.map(({ subject, durationSeconds }) => {
          const percentage =
            largestTotal === 0 ? 0 : (durationSeconds / largestTotal) * 100

          return (
            <div className="subject-row" key={subject}>
              <div className="subject-row-label">
                <strong>{subject}</strong>
                <span>{formatStudyTime(durationSeconds)}</span>
              </div>
              <div className="subject-bar" aria-hidden="true">
                <span style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SubjectBreakdown
