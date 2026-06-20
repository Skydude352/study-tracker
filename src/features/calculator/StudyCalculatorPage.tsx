import { useState } from 'react'
import type {
  CalculatorFieldErrors,
  CalculatorFormValues,
  StudyCalculationResult,
} from './calculatorTypes'
import StudyCalculatorForm from './StudyCalculatorForm'
import StudyCalculatorResult from './StudyCalculatorResult'
import {
  calculateStudyEstimate,
  DEFAULT_CALCULATOR_VALUES,
} from './studyCalculator'

const initialCalculation = calculateStudyEstimate(DEFAULT_CALCULATOR_VALUES)

function StudyCalculatorPage() {
  const [values, setValues] = useState<CalculatorFormValues>(
    DEFAULT_CALCULATOR_VALUES,
  )
  const [errors, setErrors] = useState<CalculatorFieldErrors>({})
  const [result, setResult] = useState<StudyCalculationResult | null>(
    initialCalculation.result,
  )

  const calculate = () => {
    const outcome = calculateStudyEstimate(values)
    setErrors(outcome.errors)
    setResult(outcome.result)
  }

  return (
    <section className="page page--wide">
      <p className="page-eyebrow">Plan</p>
      <h1>Study Calculator</h1>
      <p>
        Estimate a task, adjust for difficulty, and create a realistic daily
        pace before an exam.
      </p>

      <div className="calculator-layout">
        <StudyCalculatorForm
          values={values}
          errors={errors}
          onChange={setValues}
          onSubmit={calculate}
        />
        {result && <StudyCalculatorResult result={result} />}
      </div>
    </section>
  )
}

export default StudyCalculatorPage
