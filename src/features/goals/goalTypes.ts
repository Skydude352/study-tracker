export type GoalUnit = 'minutes' | 'hours'

export type StudyGoals = {
  dailyGoalMinutes: number | null
  weeklyGoalMinutes: number | null
  updatedAt: string
}

export type GoalFormValues = {
  dailyAmount: string
  dailyUnit: GoalUnit
  weeklyAmount: string
  weeklyUnit: GoalUnit
}

export type GoalProgress = {
  studiedSeconds: number
  targetSeconds: number | null
  percentage: number
}

export type GoalsProgressSummary = {
  daily: GoalProgress
  weekly: GoalProgress
}
