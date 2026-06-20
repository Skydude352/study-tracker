import { formatStudyTime } from '../../utils/timeUtils'
import type { GoalProgress } from './goalTypes'

type GoalProgressCardProps = {
  title: string
  progress: GoalProgress
}

function GoalProgressCard({ title, progress }: GoalProgressCardProps) {
  const cappedPercentage = Math.min(100, Math.max(0, progress.percentage))

  return (
    <article className="goal-progress-card">
      <div className="goal-progress-heading">
        <div>
          <p>{title}</p>
          <strong>{formatStudyTime(progress.studiedSeconds)} studied</strong>
        </div>
        <span>
          {progress.targetSeconds === null
            ? 'Not set'
            : `${Math.round(progress.percentage)}%`}
        </span>
      </div>
      <div
        className="goal-progress-bar"
        role="progressbar"
        aria-label={`${title} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(cappedPercentage)}
      >
        <span style={{ width: `${cappedPercentage}%` }} />
      </div>
      <p className="goal-target">
        Target:{' '}
        {progress.targetSeconds === null
          ? 'Set a goal to begin tracking'
          : formatStudyTime(progress.targetSeconds)}
      </p>
    </article>
  )
}

export default GoalProgressCard
