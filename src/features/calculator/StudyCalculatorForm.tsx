import type { ChangeEvent, FormEvent } from 'react'
import type {
  CalculatorFieldErrors,
  CalculatorFormValues,
} from './calculatorTypes'

type StudyCalculatorFormProps = {
  values: CalculatorFormValues
  errors: CalculatorFieldErrors
  onChange: (values: CalculatorFormValues) => void
  onSubmit: () => void
}

function StudyCalculatorForm({
  values,
  errors,
  onChange,
  onSubmit,
}: StudyCalculatorFormProps) {
  const updateField =
    (field: keyof CalculatorFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ ...values, [field]: event.target.value })
    }
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }
  const numberFields: Array<{
    key: 'pages' | 'wordsPerPage' | 'wordsPerMinute'
    label: string
  }> = [
    { key: 'pages', label: 'Number of pages' },
    { key: 'wordsPerPage', label: 'Words per page' },
    { key: 'wordsPerMinute', label: 'Reading speed (words per minute)' },
  ]

  return (
    <form className="calculator-form" onSubmit={submitForm} noValidate>
      <div className="calculator-form-grid">
        <div className="form-field">
          <label htmlFor="calculator-subject">Subject</label>
          <input
            id="calculator-subject"
            value={values.subject}
            onChange={updateField('subject')}
            placeholder="e.g. Biology"
          />
        </div>
        <div className="form-field">
          <label htmlFor="calculator-topic">Topic</label>
          <input
            id="calculator-topic"
            value={values.topic}
            onChange={updateField('topic')}
            placeholder="e.g. Cell structure"
          />
        </div>

        {numberFields.map((field) => (
          <div className="form-field" key={field.key}>
            <label htmlFor={`calculator-${field.key}`}>{field.label}</label>
            <input
              id={`calculator-${field.key}`}
              type="number"
              min="0"
              step="any"
              value={values[field.key]}
              onChange={updateField(field.key)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={
                errors[field.key] ? `calculator-${field.key}-error` : undefined
              }
            />
            {errors[field.key] && (
              <span className="form-error" id={`calculator-${field.key}-error`}>
                {errors[field.key]}
              </span>
            )}
          </div>
        ))}

        <div className="form-field">
          <label htmlFor="calculator-difficulty">Difficulty</label>
          <select
            id="calculator-difficulty"
            value={values.difficulty}
            onChange={updateField('difficulty')}
          >
            <option value="easy">Easy (1.0x)</option>
            <option value="medium">Medium (1.4x)</option>
            <option value="hard">Hard (1.8x)</option>
            <option value="veryHard">Very hard (2.2x)</option>
          </select>
        </div>
      </div>

      <fieldset className="exam-date-section">
        <legend>Exam plan</legend>
        <div className="form-field">
          <label htmlFor="calculator-exam-date">Exam date (optional)</label>
          <input
            id="calculator-exam-date"
            type="date"
            value={values.examDate}
            onChange={updateField('examDate')}
            aria-invalid={Boolean(errors.examDate)}
            aria-describedby={
              errors.examDate ? 'calculator-exam-date-error' : undefined
            }
          />
          {errors.examDate && (
            <span className="form-error" id="calculator-exam-date-error">
              {errors.examDate}
            </span>
          )}
          <small>
            Add a future date to see the daily pace needed to finish in time.
          </small>
        </div>
      </fieldset>

      <button className="calculator-submit" type="submit">
        Calculate study time
      </button>
    </form>
  )
}

export default StudyCalculatorForm
