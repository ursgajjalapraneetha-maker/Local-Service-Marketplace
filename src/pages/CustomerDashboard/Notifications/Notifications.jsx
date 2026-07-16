import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import NotificationHeader from './components/NotificationHeader'
import NotificationSummary from './components/NotificationSummary'
import NotificationToolbar from './components/NotificationToolbar'
import NotificationList from './components/NotificationList'
import NotificationSkeleton from './components/NotificationSkeleton'
import NOTIFICATIONS_DATA from './components/notificationsData'

const LS_NOTIFICATIONS_KEY = 'local_marketplace_notifications'

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(LS_NOTIFICATIONS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return NOTIFICATIONS_DATA
}

function saveToStorage(data) {
  try {
    localStorage.setItem(LS_NOTIFICATIONS_KEY, JSON.stringify(data))
  } catch {}
}

function computeSummary(items) {
  return {
    unread: items.filter((n) => !n.read).length,
    read: items.filter((n) => n.read).length,
    bookings: items.filter((n) => n.category === 'bookings').length,
    offers: items.filter((n) => n.category === 'offers').length,
  }
}

export default function Notifications() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [sortValue, setSortValue] = useState('newest')
  const [notifications, setNotifications] = useState([])
  const initialized = useRef(false)

  useEffect(() => {
    setNotifications(loadFromStorage())
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (initialized.current) {
      saveToStorage(notifications)
    }
  }, [notifications])

  useEffect(() => {
    initialized.current = true
  }, [])

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  )

  const filteredNotifications = useMemo(() => {
    let result = [...notifications]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      )
    }

    if (typeFilter) {
      if (typeFilter === 'unread') {
        result = result.filter((n) => !n.read)
      } else if (typeFilter === 'read') {
        result = result.filter((n) => n.read)
      } else {
        result = result.filter((n) => n.category === typeFilter)
      }
    }

    result.sort((a, b) => {
      switch (sortValue) {
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
        case 'unread_first': return (a.read === b.read ? 0 : a.read ? 1 : -1)
        case 'read_first': return (a.read === b.read ? 0 : a.read ? -1 : 1)
        default: return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return result
  }, [notifications, searchQuery, typeFilter, sortValue])

  const summary = useMemo(() => computeSummary(notifications), [notifications])

  const handleMarkRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
  }, [])

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }, [])

  const handleDelete = useCallback((notificationId) => {
    setNotifications((prev) => {
      const item = prev.find((n) => n.id === notificationId)
      if (item) toast.success('Notification deleted')
      return prev.filter((n) => n.id !== notificationId)
    })
  }, [])

  const handleClearAll = useCallback(() => {
    setNotifications([])
    toast.success('All notifications cleared')
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setTypeFilter('')
    setSortValue('newest')
  }, [])

  if (loading) return <NotificationSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <NotificationHeader
        unreadCount={unreadCount}
        totalCount={notifications.length}
        onMarkAllRead={handleMarkAllRead}
        onClearAll={handleClearAll}
      />

      <NotificationSummary summary={summary} />

      <NotificationToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        sortValue={sortValue}
        onTypeChange={setTypeFilter}
        onSortChange={setSortValue}
        onResetFilters={handleResetFilters}
        resultsCount={filteredNotifications.length}
      />

      <NotificationList
        notifications={filteredNotifications}
        onMarkRead={handleMarkRead}
        onDelete={handleDelete}
      />
    </motion.div>
  )
}
