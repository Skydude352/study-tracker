import { useEffect, useMemo, useState } from 'react'
import {
  getStudyGoals,
  getStudySessions,
  saveStudyGoals,
  STUDY_SESSIONS_UPDATED_EVENT,
} from '../../data/storage'
import GoalProgressCard from './GoalProgressCard'
import GoalSettingsForm from './GoalSettingsForm'
import { calculateGoalProgress } from './goalUtils'

function GoalsPage() {
  const [goals, setGoals] = useState(getStudyGoals)
  const [sessions, setSessions] = useState(getStudySessions)
  const progress = useMemo(
    () => calculateGoalProgress(sessions, goals),
    [goals, sessions],
  )

  useEffect(() => {
    const refreshSessions = () => setSessions(getStudySessions())
    window.addEventListener(STUDY_SESSIONS_UPDATED_EVENT, refreshSessions)
    return () =>
      window.removeEventListener(STUDY_SESSIONS_UPDATED_EVENT, refreshSessions)
  }, [])

  const saveGoals = (nextGoals: typeof goals) => {
    if (saveStudyGoals(nextGoals)) {
      setGoals(nextGoals)
    }
  }

  return (
    <section className="page page--wide">
      <p className="page-eyebrow">Targets</p>
      <h1>Study Goals</h1>
      <p>Set realistic daily and weekly targets and track your study time.</p>

      <GoalSettingsForm goals={goals} onSave={saveGoals} />
      <div className="goal-progress-grid">
        <GoalProgressCard title="Daily goal" progress={progress.daily} />
        <GoalProgressCard title="Weekly goal" progress={progress.weekly} />
      </div>
    </section>
  )
}

export default GoalsPage
