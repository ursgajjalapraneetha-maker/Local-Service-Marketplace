import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { notifications as notifData, notificationSettings as settingsData } from '../data/messagesData'
import PageContainer from '../components/PageContainer'
import NotificationCard from './components/NotificationCard'
import NotificationFilters from './components/NotificationFilters'
import NotificationSettings from './components/NotificationSettings'
import EmptyNotifications from './components/EmptyNotifications'

export default function Notifications() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(notifData)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const filtered = useMemo(() => {
    if (filter === 'all') return notifications
    return notifications.filter((n) => n.type === filter)
  }, [notifications, filter])

  const handleMarkRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }, [])

  const handleSettingsUpdate = useCallback(() => {
    toast.success('Notification settings updated')
  }, [])

  if (loading) {
    return (
      <PageContainer title="Notifications" subtitle="Stay updated with bookings, payments and customer activity.">
        <div className="space-y-4" role="status" aria-label="Loading notifications">
          <div className="flex gap-2">
            {['All', 'Bookings', 'Payments'].map((l) => (
              <div key={l} className="h-8 w-20 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-40 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
                <div className="h-2 w-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
              </div>
            </div>
          ))}
          <span className="sr-only">Loading notifications...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="Notifications" subtitle="Stay updated with bookings, payments and customer activity.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <NotificationFilters active={filter} onChange={setFilter} />
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <span className="text-[10px] font-medium text-gray-400">{unreadCount} unread</span>
                )}
                <button
                  onClick={handleMarkAllRead}
                  disabled={unreadCount === 0}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1"
                >
                  <CheckCheck size={14} />
                  Mark All Read
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <EmptyNotifications hasFilters={filter !== 'all'} />
              ) : (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="divide-y divide-gray-50"
                >
                  {filtered.map((notif, i) => (
                    <NotificationCard
                      key={notif.id}
                      notification={notif}
                      index={i}
                      onMarkRead={handleMarkRead}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-heading font-semibold text-secondary">Notification Summary</h3>
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Total</span>
                <span className="font-medium text-secondary">{notifications.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Unread</span>
                <span className="font-medium text-primary">{unreadCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Read</span>
                <span className="font-medium text-secondary">{notifications.length - unreadCount}</span>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="mt-4 w-full py-2 text-xs font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              {showSettings ? 'Hide Settings' : 'Manage Notifications'}
            </button>
          </div>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white rounded-xl border border-gray-100 p-5"
              >
                <NotificationSettings onUpdate={handleSettingsUpdate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageContainer>
  )
}
