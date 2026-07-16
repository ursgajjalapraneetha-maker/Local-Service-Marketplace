import { memo, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SidebarItem from './SidebarItem'
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
} from 'lucide-react'

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

function MobileDrawer({ isOpen, onClose }) {
  const drawerRef = useRef(null)

  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
      drawerRef.current?.focus()
    } else {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  const handleNavClick = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            ref={drawerRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 flex flex-col focus:outline-none lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">LS</span>
                </div>
                <span className="text-sm font-heading font-bold text-secondary">
                  Provider Panel
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 space-y-0.5" role="navigation">
              {MENU_ITEMS.map((item) => (
                <SidebarItem key={item.path} {...item} collapsed={false} onClick={handleNavClick} />
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default memo(MobileDrawer)
