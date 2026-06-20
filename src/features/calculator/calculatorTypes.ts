export type Difficulty = 'easy' | 'medium' | 'hard' | 'veryHard'

export type CalculatorFormValues = {
  subject: string
  topic: string
  pages: string
  wordsPerPage: string
  wordsPerMinute: string
  difficulty: Difficulty
  examDate: string
}

export type CalculatorFieldErrors = Partial<
  Record<keyof CalculatorFormValues, string>
>

export type ExamStudyPlan = {
  examDate: string
  daysRemaining: number
  pagesPerDay: number
  wordsPerDay: number
  studyMinutesPerDay: number
}

export type StudyCalculationResult = {
  subject: string
  topic: string
  totalWords: number
  baseTimeMinutes: number
  difficultyMultiplier: number
  estimatedStudyTimeMinutes: number
  examPlan: ExamStudyPlan | null
}

export type CalculationOutcome = {
  result: StudyCalculationResult | null
  errors: CalculatorFieldErrors
}
