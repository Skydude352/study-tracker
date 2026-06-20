import { useState } from 'react'
import type { FormEvent } from 'react'
import type { GoalFormValues, StudyGoals } from './goalTypes'
import { convertGoalToMinutes } from './goalUtils'

type GoalSettingsFormProps = {
  goals: StudyGoals
  onSave: (goals: StudyGoals) => void
}

function getInitialValues(goals: StudyGoals): GoalFormValues {
  return {
    dailyAmount: goals.dailyGoalMinutes?.toString() ?? '',
    dailyUnit: 'minutes',
    weeklyAmount: goals.weeklyGoalMinutes?.toString() ?? '',
    weeklyUnit: 'minutes',
  }
}

function GoalSettingsForm({ goals, onSave }: GoalSettingsFormProps) {
  const [values, setValues] = useState(() => getInitialValues(goals))
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const dailyAmount = values.dailyAmount === '' ? null : Number(values.dailyAmount)
    const weeklyAmount =
      values.weeklyAmount === '' ? null : Number(values.weeklyAmount)

    if (
      (dailyAmount !== null && (!Number.isFinite(dailyAmount) || dailyAmount <= 0)) ||
      (weeklyAmount !== null &&
        (!Number.isFinite(weeklyAmount) || weeklyAmount <= 0))
    ) {
      setError('Goals must be greater than 0, or left empty to clear them.')
      return
    }

    setError('')
    onSave({
      dailyGoalMinutes:
        dailyAmount === null
          ? null
          : convertGoalToMinutes(dailyAmount, values.dailyUnit),
      weeklyGoalMinutes:
        weeklyAmount === null
          ? null
          : convertGoalToMinutes(weeklyAmount, values.weeklyUnit),
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <form className="goal-settings-form" onSubmit={submit} noValidate>
      <div className="goal-input-grid">
        <div className="form-field">
          <label htmlFor="daily-goal">Daily study goal</label>
          <div className="goal-input-row">
            <input
              id="daily-goal"
              type="number"
              min="0"
              step="any"
              value={values.dailyAmount}
              onChange={(event) =>
                setValues({ ...values, dailyAmount: event.target.value })
              }
              placeholder="No goal"
            />
            <select
              value={values.dailyUnit}
              onChange={(event) =>
                setValues({
                  ...values,
                  dailyUnit: event.target.value as GoalFormValues['dailyUnit'],
                })
              }
              aria-label="Daily goal unit"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="weekly-goal">Weekly study goal</label>
          <div className="goal-input-row">
            <input
              id="weekly-goal"
              type="number"
              min="0"
              step="any"
              value={values.weeklyAmount}
              onChange={(event) =>
                setValues({ ...values, weeklyAmount: event.target.value })
              }
              placeholder="No goal"
            />
            <select
              value={values.weeklyUnit}
              onChange={(event) =>
                setValues({
                  ...values,
                  weeklyUnit: event.target.value as GoalFormValues['weeklyUnit'],
                })
              }
              aria-label="Weekly goal unit"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>
      </div>
      {error && <p className="form-error">{error}</p>}
      <button className="calculator-submit" type="submit">
        Save goals
      </button>
    </form>
  )
}

export default GoalSettingsForm
