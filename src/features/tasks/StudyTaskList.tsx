import type { StudyTask } from '../../types/studyTask'
import StudyTaskItem from './StudyTaskItem'

type StudyTaskListProps = {
  tasks: StudyTask[]
  emptyMessage: string
  onToggle: (task: StudyTask) => void
  onEdit: (taskId: string, text: string) => void
  onDelete: (taskId: string) => void
}

function StudyTaskList({ tasks, emptyMessage, ...actions }: StudyTaskListProps) {
  if (tasks.length === 0) return <p className="study-task-empty">{emptyMessage}</p>

  return (
    <ul className="study-task-list">
      {tasks.map((task) => (
        <StudyTaskItem key={task.id} task={task} {...actions} />
      ))}
    </ul>
  )
}

export default StudyTaskList
