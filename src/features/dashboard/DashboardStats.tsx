import { formatStudyTime } from '../../utils/timeUtils'
import type { DashboardSummary } from './dashboardUtils'

type DashboardStatsProps = Pick<
  DashboardSummary,
  | 'totalTodaySeconds'
  | 'totalThisWeekSeconds'
  | 'totalAllTimeSeconds'
  | 'mostStudiedSubject'
>

function DashboardStats({
  totalTodaySeconds,
  totalThisWeekSeconds,
  totalAllTimeSeconds,
  mostStudiedSubject,
}: DashboardStatsProps) {
  const stats = [
    { label: 'Today', value: formatStudyTime(totalTodaySeconds) },
    { label: 'This week', value: formatStudyTime(totalThisWeekSeconds) },
    { label: 'All time', value: formatStudyTime(totalAllTimeSeconds) },
    {
      label: 'Top subject',
      value: mostStudiedSubject?.subject ?? 'None yet',
      detail: mostStudiedSubject
        ? formatStudyTime(mostStudiedSubject.durationSeconds)
        : undefined,
    },
  ]

  return (
    <div className="dashboard-stats">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <p>{stat.label}</p>
          <strong>{stat.value}</strong>
          {stat.detail && <span>{stat.detail}</span>}
        </article>
      ))}
    </div>
  )
}

export default DashboardStats
