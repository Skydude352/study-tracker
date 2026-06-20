import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getStudyGoals,
  getStudySessions,
  STUDY_GOALS_STORAGE_KEY,
  STUDY_GOALS_UPDATED_EVENT,
  STUDY_SESSIONS_STORAGE_KEY,
  STUDY_SESSIONS_UPDATED_EVENT,
} from '../data/storage'
import DashboardStats from '../features/dashboard/DashboardStats'
import {
  calculateDashboardSummary,
} from '../features/dashboard/dashboardUtils'
import RecentSessions from '../features/dashboard/RecentSessions'
import SubjectBreakdown from '../features/dashboard/SubjectBreakdown'
import GoalProgressCard from '../features/goals/GoalProgressCard'
import { calculateGoalProgress } from '../features/goals/goalUtils'

function DashboardPage() {
  const [sessions, setSessions] = useState(getStudySessions)
  const [goals, setGoals] = useState(getStudyGoals)
  const summary = useMemo(
    () => calculateDashboardSummary(sessions),
    [sessions],
  )
  const goalProgress = useMemo(
    () => calculateGoalProgress(sessions, goals),
    [goals, sessions],
  )

  useEffect(() => {
    const refreshSessions = () => setSessions(getStudySessions())
    const refreshGoals = () => setGoals(getStudyGoals())
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STUDY_SESSIONS_STORAGE_KEY) {
        refreshSessions()
      }
      if (event.key === STUDY_GOALS_STORAGE_KEY) {
        refreshGoals()
      }
    }

    window.addEventListener(STUDY_SESSIONS_UPDATED_EVENT, refreshSessions)
    window.addEventListener(STUDY_GOALS_UPDATED_EVENT, refreshGoals)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener(STUDY_SESSIONS_UPDATED_EVENT, refreshSessions)
      window.removeEventListener(STUDY_GOALS_UPDATED_EVENT, refreshGoals)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <section className="page page--wide">
      <p className="page-eyebrow">Progress</p>
      <h1>Dashboard</h1>
      <p>See where your study time is going and keep your momentum visible.</p>

      <div className="dashboard-goals-heading">
        <h2>Goal progress</h2>
        <Link to="/goals">Edit goals</Link>
      </div>
      <div className="goal-progress-grid goal-progress-grid--dashboard">
        <GoalProgressCard title="Daily goal" progress={goalProgress.daily} />
        <GoalProgressCard title="Weekly goal" progress={goalProgress.weekly} />
      </div>

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
