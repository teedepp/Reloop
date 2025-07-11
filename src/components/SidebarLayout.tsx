import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useStore from '../store'
import Navbar from './Navbar'
import ReloopLogo from '../assets/Reloop.svg'

type Props = {
  children: ReactNode
}

const SidebarLayout = ({ children }: Props) => {
  const location = useLocation()
  const { user } = useStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (path: string) =>
    location.pathname === path ? 'bg-lime-100 text-lime-700' : 'text-gray-700 hover:bg-gray-100'

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-md flex flex-col py-8 px-4 transition-all duration-300 ease-in-out`}>
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className={`flex items-center text-2xl font-bold text-lime-700 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
            {isCollapsed ? <img src={ReloopLogo} alt="Reloop Logo" style={{ height: 32, width: 'auto' }} /> : <><img src={ReloopLogo} alt="Reloop Logo" style={{ height: 32, width: 'auto', marginRight: 8 }} /> <span className="sr-only">Reloop</span></>}
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg bg-lime-700 text-white hover:bg-white hover:text-lime-700 border border-lime-700 transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <Link 
            to="/dashboard" 
            className={`rounded-lg ${isCollapsed ? 'px-0 justify-center' : 'px-4'} py-2 font-medium text-left flex items-center ${isActive('/dashboard')}`}
            title={isCollapsed ? 'Dashboard' : ''}
          >
            <span className="text-lg">🏠</span>
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
          </Link>
          <Link 
            to="/resell" 
            className={`rounded-lg ${isCollapsed ? 'px-0 justify-center' : 'px-4'} py-2 font-medium text-left flex items-center ${isActive('/resell')}`}
            title={isCollapsed ? 'Resell' : ''}
          >
            <span className="text-lg">🔁</span>
            {!isCollapsed && <span className="ml-2">Resell</span>}
          </Link>
          <Link 
            to="/analytics" 
            className={`rounded-lg ${isCollapsed ? 'px-0 justify-center' : 'px-4'} py-2 font-medium text-left flex items-center ${isActive('/analytics')}`}
            title={isCollapsed ? 'Analytics' : ''}
          >
            <span className="text-lg">📊</span>
            {!isCollapsed && <span className="ml-2">Analytics</span>}
          </Link>
          <Link 
            to="/profile" 
            className={`rounded-lg ${isCollapsed ? 'px-0 justify-center' : 'px-4'} py-2 font-medium text-left flex items-center ${isActive('/profile')}`}
            title={isCollapsed ? 'Profile' : ''}
          >
            <span className="text-lg">👤</span>
            {!isCollapsed && <span className="ml-2">Profile</span>}
          </Link>
        </nav>

        {/* Eco Points */}
        {!isCollapsed && (
          <div className="mt-auto px-4 pt-6">
            <div className="text-sm text-gray-500">Eco Points</div>
            <div className="text-lg font-semibold text-green-600">{user.ecoPoints} 🪙</div>
          </div>
        )}
        
        {/* Collapsed Eco Points */}
        {isCollapsed && (
          <div className="mt-auto flex flex-col items-center pt-6" title={`${user.ecoPoints} Eco Points`}>
            <div className="text-lg">🪙</div>
            <div className="text-xs font-semibold text-green-600">{user.ecoPoints}</div>
          </div>
        )}
      </aside>

      {/* Main content + topbar */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  )
}

export default SidebarLayout