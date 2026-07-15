import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '../../utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '.' },
  { icon: CalendarCheck, label: 'Appointments', path: 'appointments' },
  { icon: Clock, label: 'History', path: 'history' },
  { icon: Users, label: 'Profile', path: 'profile' },
  { icon: Settings, label: 'Settings', path: 'settings' },
]

export default function Sidebar({ role = 'customer' }) {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const basePath = pathname.split('/').slice(0, -1).join('/') || `/${role}-dashboard`

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 hidden lg:block ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      aria-label="Sidebar navigation"
    >
      <div className="flex flex-col h-full">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="self-end p-3 text-gray-400 hover:text-secondary transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <nav className="flex-1 px-2 pb-4 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path }) => {
            const fullPath = path === '.' ? basePath : `${basePath}/${path}`
            const isActive = pathname === fullPath
            return (
              <Link
                key={label}
                to={fullPath}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  collapsed && 'justify-center px-2',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-secondary'
                )}
                title={collapsed ? label : undefined}
              >
                <Icon size={18} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        <div className="p-2 border-t border-gray-200">
          <button
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-danger transition-colors',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut size={18} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </aside>
  )
}
