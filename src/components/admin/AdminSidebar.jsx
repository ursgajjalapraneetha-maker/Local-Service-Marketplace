import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Tags, 
  Wrench, 
  CalendarDays, 
  BarChart3, 
  Settings,
  X
} from 'lucide-react'
import SidebarItem from './SidebarItem'
import { Link } from 'react-router-dom'

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard', end: true },
  { icon: Users, label: 'Users', path: '/admin-dashboard/users' },
  { icon: Briefcase, label: 'Providers', path: '/admin-dashboard/providers' },
  { icon: Tags, label: 'Categories', path: '/admin-dashboard/categories' },
  { icon: Wrench, label: 'Services', path: '/admin-dashboard/services' },
  { icon: CalendarDays, label: 'Bookings', path: '/admin-dashboard/bookings' },
  { icon: BarChart3, label: 'Reports', path: '/admin-dashboard/reports' },
  { icon: Settings, label: 'Settings', path: '/admin-dashboard/settings' },
]

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
          <Link to="/" className="text-xl font-bold text-primary">
            AdminPanel
          </Link>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {MENU_ITEMS.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              end={item.end}
              onClick={() => {
                if (window.innerWidth < 1024) onClose()
              }}
            />
          ))}
        </div>
      </aside>
    </>
  )
}
