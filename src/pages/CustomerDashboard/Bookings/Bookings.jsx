import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarCheck,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react'
import toast from 'react-hot-toast'
import BookingToolbar from './components/BookingToolbar'
import BookingList from './components/BookingList'
import BookingSkeleton from './components/BookingSkeleton'
import BOOKINGS_DATA from './components/bookingsData'

const SUMMARY_STATS = [
  { key: 'total', label: 'Total Bookings', icon: CalendarCheck, color: 'bg-primary/10 text-primary' },
  { key: 'upcoming', label: 'Upcoming', icon: ArrowUpRight, color: 'bg-blue-100 text-blue-600' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'bg-success/10 text-success' },
  { key: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'bg-danger/10 text-danger' },
]

function computeSummary(bookings) {
  return {
    total: bookings.length,
    upcoming: bookings.filter((b) => b.status === 'pending' || b.status === 'confirmed' || b.status === 'in_progress').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled' || b.status === 'rejected').length,
  }
}

export default function Bookings() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortValue, setSortValue] = useState('newest')
  const [bookings, setBookings] = useState(BOOKINGS_DATA)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredBookings = useMemo(() => {
    let result = [...bookings]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (b) =>
          b.serviceName.toLowerCase().includes(q) ||
          b.providerName.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
      )
    }

    if (statusFilter) {
      if (statusFilter === 'upcoming') {
        result = result.filter((b) => b.status === 'pending' || b.status === 'confirmed' || b.status === 'in_progress')
      } else {
        result = result.filter((b) => b.status === statusFilter)
      }
    }

    if (dateFilter) {
      const now = new Date()
      const today = now.toDateString()
      result = result.filter((b) => {
        const bDate = new Date(b.bookingDate)
        if (dateFilter === 'today') return bDate.toDateString() === today
        if (dateFilter === 'week') {
          const weekStart = new Date(now)
          weekStart.setDate(now.getDate() - now.getDay())
          const weekEnd = new Date(weekStart)
          weekEnd.setDate(weekStart.getDate() + 6)
          return bDate >= weekStart && bDate <= weekEnd
        }
        if (dateFilter === 'month') {
          return bDate.getMonth() === now.getMonth() && bDate.getFullYear() === now.getFullYear()
        }
        return true
      })
    }

    if (categoryFilter) {
      result = result.filter((b) => b.category === categoryFilter)
    }

    result.sort((a, b) => {
      switch (sortValue) {
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
        case 'name': return a.serviceName.localeCompare(b.serviceName)
        case 'date': return new Date(b.bookingDate) - new Date(a.bookingDate)
        case 'price_high': return b.price - a.price
        case 'price_low': return a.price - b.price
        default: return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return result
  }, [bookings, searchQuery, statusFilter, dateFilter, categoryFilter, sortValue])

  const summary = useMemo(() => computeSummary(filteredBookings), [filteredBookings])

  const handleCancel = useCallback((bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'cancelled',
              paymentStatus: b.paymentStatus === 'paid' ? 'refunded' : 'unpaid',
              timeline: [
                ...b.timeline.filter((t) => t.status !== 'completed' && t.status !== 'cancelled'),
                { status: 'cancelled', date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), label: 'Booking Cancelled' },
              ],
            }
          : b
      )
    )
    toast.success('Booking cancelled successfully')
  }, [])

  const handleReschedule = useCallback((bookingId) => {
    toast.success('Rescheduling link sent to your email')
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('')
    setDateFilter('')
    setCategoryFilter('')
    setSortValue('newest')
  }, [])

  if (loading) return <BookingSkeleton />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your service bookings</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SUMMARY_STATS.map(({ key, label, icon: Icon, color }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.06 * i }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-xl border border-gray-100 p-4"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <p className="mt-2 text-xl font-heading font-bold text-secondary">
              {summary[key] ?? 0}
            </p>
            <p className="text-xs text-gray-500">{label}</p>
          </motion.div>
        ))}
      </div>

      <BookingToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        categoryFilter={categoryFilter}
        onStatusChange={setStatusFilter}
        onDateChange={setDateFilter}
        onCategoryChange={setCategoryFilter}
        onResetFilters={handleResetFilters}
        sortValue={sortValue}
        onSortChange={setSortValue}
        resultsCount={filteredBookings.length}
      />

      <BookingList
        bookings={filteredBookings}
        onCancel={handleCancel}
        onReschedule={handleReschedule}
      />
    </div>
  )
}
