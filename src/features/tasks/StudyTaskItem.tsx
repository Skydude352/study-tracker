import { useState } from 'react'
import type { StudyTask } from '../../types/studyTask'

type StudyTaskItemProps = {
  task: StudyTask
  onToggle: (task: StudyTask) => void
  onEdit: (taskId: string, text: string) => void
  onDelete: (taskId: string) => void
}

function StudyTaskItem({ task, onToggle, onEdit, onDelete }: StudyTaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const saveEdit = () => {
    const text = draft.trim()
    if (!text) return
    onEdit(task.id, text)
    setIsEditing(false)
  }

  return (
    <li className={`study-task${task.completed ? ' study-task--completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark ${task.text} as ${task.completed ? 'not completed' : 'completed'}`}
      />
      {isEditing ? (
        <input
          className="study-task-edit"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') saveEdit()
            if (event.key === 'Escape') setIsEditing(false)
          }}
          autoFocus
        />
      ) : (
        <span>{task.text}</span>
      )}
      <div className="study-task-actions">
        {isEditing ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="study-task-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default StudyTaskItem
