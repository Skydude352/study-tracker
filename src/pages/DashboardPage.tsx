import { useEffect, useMemo, useState } from 'react'
import {
  getStudySessions,
  STUDY_SESSIONS_STORAGE_KEY,
  STUDY_SESSIONS_UPDATED_EVENT,
} from '../data/storage'
import DashboardStats from '../features/dashboard/DashboardStats'
import {
  calculateDashboardSummary,
} from '../features/dashboard/dashboardUtils'
import RecentSessions from '../features/dashboard/RecentSessions'
import SubjectBreakdown from '../features/dashboard/SubjectBreakdown'

function DashboardPage() {
  const [sessions, setSessions] = useState(getStudySessions)
  const summary = useMemo(
    () => calculateDashboardSummary(sessions),
    [sessions],
  )

  useEffect(() => {
    const refreshSessions = () => setSessions(getStudySessions())
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STUDY_SESSIONS_STORAGE_KEY) {
        refreshSessions()
      }
    }

    window.addEventListener(STUDY_SESSIONS_UPDATED_EVENT, refreshSessions)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener(STUDY_SESSIONS_UPDATED_EVENT, refreshSessions)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <section className="page page--wide">
      <p className="page-eyebrow">Progress</p>
      <h1>Dashboard</h1>
      <p>See where your study time is going and keep your momentum visible.</p>

      {sessions.length === 0 ? (
        <div className="dashboard-empty-state">
          <h2>No study data yet</h2>
          <p>Complete a timer session to start building your dashboard.</p>
        </div>
      ) : (
        <div className="dashboard-content">
          <DashboardStats {...summary} />
          <div className="dashboard-columns">
            <SubjectBreakdown subjects={summary.subjectBreakdown} />
            <RecentSessions sessions={summary.recentSessions} />
          </div>
        </div>
      )}
    </section>
  )
}

export default DashboardPage
