import type { StudySession } from '../types/studySession'

const developmentSessions: StudySession[] = [
  {
    id: 'mock-session-1',
    title: 'Review algebra fundamentals',
    subject: 'Mathematics',
    topic: 'Linear equations',
    notes: 'Worked through practice problems and reviewed common mistakes.',
    startTime: '2026-06-18T09:00:00.000Z',
    endTime: '2026-06-18T09:45:00.000Z',
    durationSeconds: 2700,
    mode: 'normal',
    createdAt: '2026-06-18T09:45:00.000Z',
    updatedAt: '2026-06-18T09:45:00.000Z',
  },
  {
    id: 'mock-session-2',
    title: 'Vocabulary practice',
    subject: 'Spanish',
    topic: 'Travel vocabulary',
    notes: 'Practiced flash cards and wrote example sentences.',
    startTime: '2026-06-19T13:30:00.000Z',
    endTime: '2026-06-19T13:55:00.000Z',
    durationSeconds: 1500,
    mode: 'pomodoro',
    createdAt: '2026-06-19T13:55:00.000Z',
    updatedAt: '2026-06-19T13:55:00.000Z',
  },
]

export const mockStudySessions = import.meta.env.DEV ? developmentSessions : []
