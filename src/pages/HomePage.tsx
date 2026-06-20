import { Link } from 'react-router-dom'
import Goals from '../features/goals/GoalsPage'
import StudyTasksSection from '../features/tasks/StudyTasksSection'

const features = [
  {
    to: '/timer',
    title: 'Study timers',
    text: 'Track open-ended sessions or work in Pomodoro cycles.',
  },
  {
    to: '/sessions',
    title: 'Session history',
    text: 'Review, edit, and organize completed study sessions.',
  },
  {
    to: '/dashboard',
    title: 'Dashboard',
    text: 'See normal study time, subjects, and recent activity.',
  },
  {
    to: '/calculator',
    title: 'Study calculator',
    text: 'Estimate workloads and build an exam-ready daily plan.',
  },
]

function HomePage() {
  return (
    <section className="page page--wide">
      <p className="page-eyebrow">Welcome</p>
      <h1>Home</h1>
      <p>Keep your study plans, progress, and useful tools in one place.</p>

      <div className="feature-grid">
        {features.map((feature) => (
          <Link className="feature-card" to={feature.to} key={feature.to}>
            <strong>{feature.title}</strong>
            <span>{feature.text}</span>
          </Link>
        ))}
      </div>

      <StudyTasksSection />
      <Goals />
    </section>
  )
}

export default HomePage
