import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useStore from '../store'
import Navbar from './Navbar'

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
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-md flex flex-col pt-8 px-4 transition-all duration-300 ease-in-out fixed top-0 left-0 h-screen z-30`} style={{height: '100vh'}}>
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

        {/* Switch User Button */}
        <div className={`mt-auto ${isCollapsed ? 'flex flex-col items-center pt-6' : 'px-4 pt-6'}`} style={{ paddingBottom: 20 }}>
          <button
            className={`flex items-center w-full bg-white text-lime-700 border border-lime-700 hover:bg-lime-50 rounded-lg transition-colors font-semibold ${isCollapsed ? 'justify-center p-2' : 'px-3 py-2'}`}
            style={{ fontSize: isCollapsed ? '1.5rem' : '1rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1, wght 400, GRAD 0, opsz 24', fontSize: isCollapsed ? '1.25rem' : '1.5rem', marginRight: isCollapsed ? 0 : 8, color: '#4d7c0f' }}>change_circle</span>
            {!isCollapsed && <span className="ml-2">Switch User</span>}
          </button>
        </div>
      </aside>

      {/* Main content + topbar */}
      <main className="flex-1 flex flex-col overflow-hidden ml-16 md:ml-64" style={{marginLeft: isCollapsed ? '4rem' : '16rem'}}>
        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <Navbar />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  )
}

export default SidebarLayout