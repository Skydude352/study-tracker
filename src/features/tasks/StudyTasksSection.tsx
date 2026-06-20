import { useMemo, useState } from 'react'
import {
  deleteStudyTask,
  getStudyTasks,
  saveStudyTask,
  updateStudyTask,
} from '../../data/storage'
import type { StudyTask } from '../../types/studyTask'
import StudyTaskList from './StudyTaskList'

function createTask(text: string): StudyTask {
  const timestamp = new Date().toISOString()
  return {
    id:
      typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
  }
}

function StudyTasksSection() {
  const [tasks, setTasks] = useState(getStudyTasks)
  const [text, setText] = useState('')
  const activeTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks])
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks])

  const addTask = () => {
    const trimmedText = text.trim()
    if (!trimmedText) return
    const task = createTask(trimmedText)
    if (saveStudyTask(task)) {
      setTasks((current) => [...current, task])
      setText('')
    }
  }

  const toggleTask = (task: StudyTask) => {
    const completed = !task.completed
    const updated = updateStudyTask(task.id, {
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    })
    if (updated) {
      setTasks((current) => current.map((item) => item.id === task.id ? updated : item))
    }
  }

  const editTask = (taskId: string, nextText: string) => {
    const updated = updateStudyTask(taskId, { text: nextText })
    if (updated) {
      setTasks((current) => current.map((item) => item.id === taskId ? updated : item))
    }
  }

  const removeTask = (taskId: string) => {
    if (deleteStudyTask(taskId)) {
      setTasks((current) => current.filter(({ id }) => id !== taskId))
    }
  }

  return (
    <section className="home-section" aria-labelledby="study-tasks-heading">
      <p className="page-eyebrow">To do</p>
      <h2 id="study-tasks-heading">Study tasks</h2>
      <div className="study-task-entry">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && addTask()}
          placeholder="What do you need to study?"
          aria-label="New study task"
        />
        <button onClick={addTask}>Add task</button>
      </div>
      <StudyTaskList
        tasks={activeTasks}
        emptyMessage="No active study tasks."
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={removeTask}
      />
      <h3 className="completed-tasks-heading">Completed study tasks</h3>
      <StudyTaskList
        tasks={completedTasks}
        emptyMessage="Completed tasks will appear here."
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={removeTask}
      />
    </section>
  )
}

export default StudyTasksSection
