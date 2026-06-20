import { BrowserRouter } from 'react-router-dom'
import { PomodoroProvider } from '../features/pomodoro/usePomodoro'
import { TimerProvider } from '../features/timer/useTimer'
import AppRoutes from './routes'

function App() {
  return (
    <TimerProvider>
      <PomodoroProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PomodoroProvider>
    </TimerProvider>
  )
}

export default App
