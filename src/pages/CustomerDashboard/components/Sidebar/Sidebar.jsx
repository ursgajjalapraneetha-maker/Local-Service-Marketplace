import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Bell,
  MessageSquare,
  CreditCard,
  FileText,
  MapPin,
  Star,
  User,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '../../../../utils'
import SidebarItem from './SidebarItem'
import SidebarSection from './SidebarSection'
import SidebarFooter from './SidebarFooter'

const MAIN_MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/customer-dashboard' },
  { icon: CalendarCheck, label: 'My Bookings', path: '/customer-dashboard/bookings' },
  { icon: Heart, label: 'Wishlist', path: '/customer-dashboard/wishlist' },
  { icon: Bell, label: 'Notifications', path: '/customer-dashboard/notifications' },
  { icon: MessageSquare, label: 'Messages', path: '/customer-dashboard/messages' },
]

const FINANCIAL_MENU = [
  { icon: CreditCard, label: 'Payments', path: '/customer-dashboard/payments' },
  { icon: FileText, label: 'Invoices', path: '/customer-dashboard/invoices' },
]

const ACCOUNT_MENU = [
  { icon: MapPin, label: 'Addresses', path: '/customer-dashboard/addresses' },
  { icon: Star, label: 'Reviews', path: '/customer-dashboard/reviews' },
  { icon: User, label: 'Profile', path: '/customer-dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/customer-dashboard/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/customer-dashboard/help' },
]

function Sidebar({ collapsed, onToggleCollapse }) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-gray-200 transition-all duration-300 hidden lg:flex flex-col',
        collapsed ? 'w-[68px]' : 'w-64'
      )}
      aria-label="Customer dashboard navigation"
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
                LocalServices
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-4" role="navigation">
        <SidebarSection label="Main" collapsed={collapsed}>
          {MAIN_MENU.map((item) => (
            <SidebarItem key={item.path} {...item} collapsed={collapsed} />
          ))}
        </SidebarSection>

        <SidebarSection label="Finance" collapsed={collapsed}>
          {FINANCIAL_MENU.map((item) => (
            <SidebarItem key={item.path} {...item} collapsed={collapsed} />
          ))}
        </SidebarSection>

        <SidebarSection label="Account" collapsed={collapsed}>
          {ACCOUNT_MENU.map((item) => (
            <SidebarItem key={item.path} {...item} collapsed={collapsed} />
          ))}
        </SidebarSection>
      </nav>

      <SidebarFooter collapsed={collapsed} />

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
