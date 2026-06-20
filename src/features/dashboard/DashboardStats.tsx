import { formatStudyTime } from '../../utils/timeUtils'
import type { DashboardSummary } from './dashboardUtils'

type DashboardStatsProps = Pick<
  DashboardSummary,
  | 'totalTodaySeconds'
  | 'totalThisWeekSeconds'
  | 'totalAllTimeSeconds'
  | 'sessionCountToday'
  | 'sessionCountThisWeek'
  | 'sessionCountAllTime'
  | 'mostStudiedSubject'
>

function DashboardStats({
  totalTodaySeconds,
  totalThisWeekSeconds,
  totalAllTimeSeconds,
  sessionCountToday,
  sessionCountThisWeek,
  sessionCountAllTime,
  mostStudiedSubject,
}: DashboardStatsProps) {
  const stats = [
    { label: 'Today', value: formatStudyTime(totalTodaySeconds) },
    { label: 'This week', value: formatStudyTime(totalThisWeekSeconds) },
    { label: 'All time', value: formatStudyTime(totalAllTimeSeconds) },
    { label: 'Sessions today', value: sessionCountToday.toString() },
    { label: 'Sessions this week', value: sessionCountThisWeek.toString() },
    { label: 'Sessions all time', value: sessionCountAllTime.toString() },
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
