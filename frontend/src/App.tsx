import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Layout } from './components/layout/Layout'
import { DrcMainPage } from './pages/DrcMainPage'
import { DrcCreatePage } from './pages/DrcCreatePage'
import { DrcEditPage } from './pages/DrcEditPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { CompanyPage } from './pages/CompanyPage'
import { UsersPage } from './pages/UsersPage'
import { SchedulePage } from './pages/SchedulePage'
import { ReportsPage } from './pages/ReportsPage'
import { MailPage } from './pages/MailPage'
import { SettingsPage } from './pages/SettingsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="drc">
              <Route path="main" element={<DrcMainPage />} />
              <Route path="create" element={<DrcCreatePage />} />
              <Route path="edit/:drcNo" element={<DrcEditPage />} />
            </Route>
            <Route path="company" element={<CompanyPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="mail" element={<MailPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
