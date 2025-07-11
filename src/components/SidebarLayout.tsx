import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useStore from '../store'
import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

const SidebarLayout = ({ children }: Props) => {
  const location = useLocation()
  const { user } = useStore()

  const isActive = (path: string) =>
    location.pathname === path ? 'bg-primary-100 text-primary-600' : 'text-gray-700 hover:bg-gray-100'

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col py-8 px-4">
        <Link to="/" className="flex items-center text-2xl font-bold text-primary-600 px-2 mb-10">
          ReLoop 🌱
        </Link>
        <nav className="flex flex-col space-y-2">
          <Link to="/dashboard" className={`rounded-lg px-4 py-2 font-medium ${isActive('/dashboard')}`}>
            🏠 Dashboard
          </Link>
          <Link to="/resell" className={`rounded-lg px-4 py-2 font-medium ${isActive('/resell')}`}>
            🔁 Resell
          </Link>
          <Link to="/analytics" className={`rounded-lg px-4 py-2 font-medium ${isActive('/analytics')}`}>
            📊 Analytics
          </Link>
          <Link to="/profile" className={`rounded-lg px-4 py-2 font-medium ${isActive('/profile')}`}>
            👤 Profile
          </Link>
        </nav>
        <div className="mt-auto px-4 pt-6">
          <div className="text-sm text-gray-500">Eco Points</div>
          <div className="text-lg font-semibold text-green-600">{user.ecoPoints} 🪙</div>
        </div>
      </aside>

      {/* Main content + topbar */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <Navbar />
        <div className="flex-1 overflow-auto w-full">{children}</div>
      </main>
    </div>
  )
}

export default SidebarLayout
