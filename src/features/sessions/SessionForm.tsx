import type { ChangeEvent } from 'react'
import type { StudySessionDetails } from '../../types/studySession'

type SessionFormProps = {
  values: StudySessionDetails
  onChange: (values: StudySessionDetails) => void
  idPrefix?: string
}

function SessionForm({
  values,
  onChange,
  idPrefix = 'session',
}: SessionFormProps) {
  const updateField =
    (field: keyof StudySessionDetails) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...values, [field]: event.target.value })
    }

  return (
    <div className="session-form">
      <div className="form-field form-field--wide">
        <label htmlFor={`${idPrefix}-title`}>Session title</label>
        <input
          id={`${idPrefix}-title`}
          value={values.title}
          onChange={updateField('title')}
          placeholder="Untitled Study Session"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${idPrefix}-subject`}>Subject</label>
        <input
          id={`${idPrefix}-subject`}
          value={values.subject}
          onChange={updateField('subject')}
          placeholder="e.g. Mathematics"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${idPrefix}-topic`}>Topic</label>
        <input
          id={`${idPrefix}-topic`}
          value={values.topic}
          onChange={updateField('topic')}
          placeholder="e.g. Linear equations"
        />
      </div>

      <div className="form-field form-field--wide">
        <label htmlFor={`${idPrefix}-notes`}>Notes</label>
        <textarea
          id={`${idPrefix}-notes`}
          value={values.notes}
          onChange={updateField('notes')}
          placeholder="What did you work on?"
          rows={3}
        />
      </div>
    </div>
  )
}

export default SessionForm
