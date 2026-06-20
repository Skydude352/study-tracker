import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import CalculatorPage from '../pages/CalculatorPage'
import DashboardPage from '../pages/DashboardPage'
import HomePage from '../pages/HomePage'
import SessionsPage from '../pages/SessionsPage'
import TimerPage from '../pages/TimerPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="timer" element={<TimerPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="calculator" element={<CalculatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
