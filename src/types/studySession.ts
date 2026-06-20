export type StudySessionMode = 'normal' | 'pomodoro'

export type StudySession = {
  id: string
  title: string
  subject: string
  topic: string
  notes: string
  startTime: string
  endTime: string
  durationSeconds: number
  mode: StudySessionMode
  createdAt: string
  updatedAt: string
}

export type StudySessionUpdates = Partial<
  Omit<StudySession, 'id' | 'createdAt' | 'updatedAt'>
>
