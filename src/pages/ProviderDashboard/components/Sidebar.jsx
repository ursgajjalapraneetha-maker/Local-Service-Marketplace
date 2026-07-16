import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Wrench,
  CalendarCheck,
  Users,
  IndianRupee,
  CalendarRange,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '../../../utils'
import SidebarItem from './SidebarItem'

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/provider-dashboard' },
  { icon: Wrench, label: 'Services', path: '/provider-dashboard/services' },
  { icon: CalendarCheck, label: 'Bookings', path: '/provider-dashboard/bookings' },
  { icon: Users, label: 'Customers', path: '/provider-dashboard/customers' },
  { icon: IndianRupee, label: 'Earnings', path: '/provider-dashboard/earnings' },
  { icon: CalendarRange, label: 'Schedule', path: '/provider-dashboard/schedule' },
  { icon: MessageSquare, label: 'Messages', path: '/provider-dashboard/messages' },
  { icon: Bell, label: 'Notifications', path: '/provider-dashboard/notifications' },
  { icon: User, label: 'Profile', path: '/provider-dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/provider-dashboard/settings' },
]

function Sidebar({ collapsed, onToggleCollapse }) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-gray-200 transition-all duration-300 hidden lg:flex flex-col',
        collapsed ? 'w-[68px]' : 'w-64'
      )}
      aria-label="Provider dashboard navigation"
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-100">
        <div className={cn('flex items-center gap-2', collapsed && 'justify-center w-full')}>
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">LS</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-heading font-bold text-secondary whitespace-nowrap"
              >
                Provider Panel
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-0.5" role="navigation">
        {MENU_ITEMS.map((item) => (
          <SidebarItem key={item.path} {...item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="p-2 border-t border-gray-100">
        <button
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-danger transition-colors',
            collapsed && 'justify-center mx-2'
          )}
          title={collapsed ? 'Logout' : undefined}
          aria-label="Logout"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-secondary hover:border-gray-300 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}

export default memo(Sidebar)
