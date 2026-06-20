import type {
  CalculationOutcome,
  CalculatorFieldErrors,
  CalculatorFormValues,
  Difficulty,
  StudyCalculationResult,
} from './calculatorTypes'

export const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  easy: 1,
  medium: 1.4,
  hard: 1.8,
  veryHard: 2.2,
}

export const DEFAULT_CALCULATOR_VALUES: CalculatorFormValues = {
  pages: '10',
  wordsPerPage: '350',
  wordsPerMinute: '150',
  difficulty: 'medium',
  examDate: '',
}

function parsePositiveNumber(
  value: string,
  field: 'pages' | 'wordsPerPage' | 'wordsPerMinute',
  label: string,
  errors: CalculatorFieldErrors,
): number | null {
  const number = Number(value)

  if (value.trim() === '' || !Number.isFinite(number) || number <= 0) {
    errors[field] = `${label} must be greater than 0.`
    return null
  }

  return number
}

function parseLocalDate(dateValue: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue)

  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const date = new Date(year, month, day)

  return date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
    ? date
    : null
}

export function getCalendarDaysUntil(examDate: Date, now = new Date()): number {
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const examUtc = Date.UTC(
    examDate.getFullYear(),
    examDate.getMonth(),
    examDate.getDate(),
  )

  return Math.round((examUtc - todayUtc) / 86_400_000)
}

export function calculateStudyEstimate(
  values: CalculatorFormValues,
  now = new Date(),
): CalculationOutcome {
  const errors: CalculatorFieldErrors = {}
  const pages = parsePositiveNumber(values.pages, 'pages', 'Pages', errors)
  const wordsPerPage = parsePositiveNumber(
    values.wordsPerPage,
    'wordsPerPage',
    'Words per page',
    errors,
  )
  const wordsPerMinute = parsePositiveNumber(
    values.wordsPerMinute,
    'wordsPerMinute',
    'Reading speed',
    errors,
  )
  let examDate: Date | null = null
  let daysRemaining: number | null = null

  if (values.examDate) {
    examDate = parseLocalDate(values.examDate)

    if (!examDate) {
      errors.examDate = 'Choose a valid exam date.'
    } else {
      daysRemaining = getCalendarDaysUntil(examDate, now)
      if (daysRemaining <= 0) {
        errors.examDate = 'Choose an exam date after today.'
      }
    }
  }

  if (
    Object.keys(errors).length > 0 ||
    pages === null ||
    wordsPerPage === null ||
    wordsPerMinute === null
  ) {
    return { result: null, errors }
  }

  const totalWords = pages * wordsPerPage
  const baseTimeMinutes = totalWords / wordsPerMinute
  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[values.difficulty]
  const estimatedStudyTimeMinutes = baseTimeMinutes * difficultyMultiplier
  const result: StudyCalculationResult = {
    totalWords,
    baseTimeMinutes,
    difficultyMultiplier,
    estimatedStudyTimeMinutes,
    examPlan:
      examDate && daysRemaining
        ? {
            examDate: values.examDate,
            daysRemaining,
            pagesPerDay: pages / daysRemaining,
            wordsPerDay: totalWords / daysRemaining,
            studyMinutesPerDay: estimatedStudyTimeMinutes / daysRemaining,
          }
        : null,
  }

  return { result, errors: {} }
}
