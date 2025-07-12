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
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-md flex flex-col pt-8 px-4 transition-all duration-300 ease-in-out relative`}>
        {/* User Info and Toggle Button */}
        <div className="flex items-center mb-10 relative">
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
            alt="avatar"
            className={`rounded-full border mr-3 transition-all duration-300 ${isCollapsed ? 'h-8 w-8' : 'h-12 w-12'}`}
          />
          {!isCollapsed && (
            <div>
              <div className="text-lg font-bold text-lime-700">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="absolute opacity-50 p-0.5 rounded-lg bg-lime-700 text-white hover:bg-white hover:text-lime-700 border border-lime-700 shadow transition-all duration-300 z-20 h-6 w-5 flex items-center justify-center"
            style={{ minWidth: 0, top: 'calc(105% + 4px)', right: '-26px' }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
            <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: 'wght 700' }}>home</span>
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
          </Link>
          <Link 
            to="/resell" 
            className={`rounded-lg ${isCollapsed ? 'px-0 justify-center' : 'px-4'} py-2 font-medium text-left flex items-center ${isActive('/resell')}`}
            title={isCollapsed ? 'Resell' : ''}
          >
            <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: 'wght 700' }}>store</span>
            {!isCollapsed && <span className="ml-2">Resell</span>}
          </Link>
          <Link 
            to="/analytics" 
            className={`rounded-lg ${isCollapsed ? 'px-0 justify-center' : 'px-4'} py-2 font-medium text-left flex items-center ${isActive('/analytics')}`}
            title={isCollapsed ? 'Analytics' : ''}
          >
            <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: 'wght 700' }}>analytics</span>
            {!isCollapsed && <span className="ml-2">Analytics</span>}
          </Link>
          <Link 
            to="/profile" 
            className={`rounded-lg ${isCollapsed ? 'px-0 justify-center' : 'px-4'} py-2 font-medium text-left flex items-center ${isActive('/profile')}`}
            title={isCollapsed ? 'Profile' : ''}
          >
            <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: 'wght 700' }}>person</span>
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