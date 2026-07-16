import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react'

const PROFILE_MENU = [
  { icon: User, label: 'My Profile', path: '/customer-dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/customer-dashboard/settings' },
  { icon: HelpCircle, label: 'Help', path: '/customer-dashboard/help' },
]

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) close()
    }
    const handleEsc = (e) => {
      if (e.key === 'Escape') close()
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, close])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggle}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Profile menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-xs font-heading font-semibold text-primary">RK</span>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-medium text-secondary leading-tight">Rahul Kumar</p>
          <p className="text-[10px] text-gray-400 leading-tight">rahul@example.com</p>
        </div>
        <ChevronDown
          size={14}
          className={`hidden sm:block text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
            role="menu"
            aria-label="Profile options"
          >
            <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
              <p className="text-sm font-medium text-secondary">Rahul Kumar</p>
              <p className="text-xs text-gray-400 mt-0.5">rahul@example.com</p>
            </div>
            {PROFILE_MENU.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={close}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                role="menuitem"
              >
                <Icon size={16} className="text-gray-400" />
                {label}
              </Link>
            ))}
            <div className="border-t border-gray-100">
              <button
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-danger transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                role="menuitem"
              >
                <LogOut size={16} className="text-gray-400" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(ProfileDropdown)
