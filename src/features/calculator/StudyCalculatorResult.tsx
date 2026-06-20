import { formatDuration } from '../../utils/timeUtils'
import type { StudyCalculationResult } from './calculatorTypes'

type StudyCalculatorResultProps = {
  result: StudyCalculationResult
}

function formatDecimal(value: number, maximumFractionDigits = 1): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits }).format(
    value,
  )
}

function StudyCalculatorResult({ result }: StudyCalculatorResultProps) {
  const metrics = [
    {
      label: 'Estimated words',
      value: Math.round(result.totalWords).toLocaleString(),
    },
    {
      label: 'Base reading time',
      value: formatDuration(result.baseTimeMinutes * 60),
    },
    {
      label: 'Difficulty multiplier',
      value: `${result.difficultyMultiplier.toFixed(1)}x`,
    },
    {
      label: 'Estimated study time',
      value: formatDuration(result.estimatedStudyTimeMinutes * 60),
    },
  ]

  return (
    <section className="calculator-result" aria-live="polite">
      <div className="calculator-result-heading">
        <p className="page-eyebrow">Estimate</p>
        <h2>{result.topic || result.subject || 'Your study task'}</h2>
      </div>

      <div className="calculator-metrics">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>

      {result.examPlan && (
        <div className="exam-plan-result">
          <h3>{result.examPlan.daysRemaining} days until your exam</h3>
          <p>To finish by then, aim for approximately:</p>
          <div className="exam-plan-metrics">
            <strong>
              {formatDecimal(result.examPlan.pagesPerDay, 2)} pages/day
            </strong>
            <strong>
              {Math.ceil(result.examPlan.wordsPerDay).toLocaleString()} words/day
            </strong>
            <strong>
              {formatDuration(result.examPlan.studyMinutesPerDay * 60)}/day
            </strong>
          </div>
        </div>
      )}
    </section>
  )
}

export default StudyCalculatorResult
