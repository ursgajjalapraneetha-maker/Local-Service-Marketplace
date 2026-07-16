import { useLocation } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import UserProfileDropdown from './UserProfileDropdown'

const BREADCRUMB_LABELS = {
  '/admin-dashboard': 'Dashboard',
  '/admin-dashboard/users': 'Users',
  '/admin-dashboard/providers': 'Providers',
  '/admin-dashboard/categories': 'Categories',
  '/admin-dashboard/services': 'Services',
  '/admin-dashboard/bookings': 'Bookings',
  '/admin-dashboard/reports': 'Analytics',
  '/admin-dashboard/settings': 'Settings',
}

export default function AdminTopbar({ onMenuClick }) {
  const location = useLocation()
  const currentLabel = BREADCRUMB_LABELS[location.pathname] || 'Dashboard'

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <nav className="text-sm text-gray-500">
              <span>Home</span> / <span className="text-gray-900">{currentLabel}</span>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>
          
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  )
}
