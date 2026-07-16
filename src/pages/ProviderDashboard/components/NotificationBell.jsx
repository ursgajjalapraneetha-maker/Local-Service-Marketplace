import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, ArrowRight } from 'lucide-react'

const DUMMY_NOTIFICATIONS = [
  { id: 1, title: 'New Booking Request', message: 'Sarah booked your Home Cleaning service for tomorrow.', time: '2 min ago', unread: true },
  { id: 2, title: 'Payment Received', message: '₹2,499 credited for Office Deep Cleaning.', time: '1 hour ago', unread: true },
  { id: 3, title: 'Review Received', message: 'John rated your AC Repair service 5 stars.', time: '3 hours ago', unread: false },
  { id: 4, title: 'Schedule Update', message: 'Your availability for next week has been updated.', time: '1 day ago', unread: false },
]

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const unreadCount = DUMMY_NOTIFICATIONS.filter((n) => n.unread).length

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleClick = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) close() }
    const handleEsc = (e) => { if (e.key === 'Escape') close() }
    if (isOpen) { document.addEventListener('mousedown', handleClick); document.addEventListener('keydown', handleEsc) }
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleEsc) }
  }, [isOpen, close])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggle}
        className="relative p-2 text-gray-500 hover:text-secondary hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell size={18} aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
            role="menu"
            aria-label="Notifications"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-semibold text-secondary">Notifications</span>
              <button onClick={close} className="p-0.5 text-gray-400 hover:text-gray-600 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30" aria-label="Close notifications">
                <X size={14} />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {DUMMY_NOTIFICATIONS.map((n) => (
                <button key={n.id} className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${n.unread ? 'bg-primary/[0.02]' : ''}`} role="menuitem">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary truncate">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                    </div>
                    {n.unread && <span className="mt-1.5 w-2 h-2 bg-primary rounded-full shrink-0" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-gray-100">
              <button
                onClick={() => { close(); navigate('/provider-dashboard/notifications') }}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                View all notifications
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(NotificationBell)
