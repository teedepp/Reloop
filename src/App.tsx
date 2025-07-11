import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Resell from './pages/Resell'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import SidebarLayout from './components/SidebarLayout' // (new)
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home stays as standalone */}
        <Route path="/" element={<Home />} />

        {/* Dashboard pages with sidebar layout */}
        <Route
          path="/dashboard"
          element={
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          }
        />
        <Route
          path="/resell"
          element={
            <SidebarLayout>
              <Resell />
            </SidebarLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <SidebarLayout>
              <Analytics />
            </SidebarLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <SidebarLayout>
              <Profile />
            </SidebarLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
