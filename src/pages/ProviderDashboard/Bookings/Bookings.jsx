import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, Clock, CheckCircle, PlayCircle, IndianRupee } from 'lucide-react'
import { providerBookings, bookingStats } from '../data/bookingsData'
import PageContainer from '../components/PageContainer'
import BookingCard from './components/BookingCard'
import BookingTable from './components/BookingTable'
import BookingFilters from './components/BookingFilters'
import EmptyBookings from './components/EmptyBookings'
import StatsCard from '../components/StatsCard'

const DEFAULT_FILTERS = { search: '', status: 'all', dateRange: 'all' }

function filterByDateRange(bookings, range) {
  if (range === 'all') return bookings
  const now = new Date()
  const start = new Date(now)
  if (range === 'today') {
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 1)
    return bookings.filter((b) => {
      const d = new Date(b.date)
      return d >= start && d < end
    })
  }
  if (range === 'week') {
    const dayOfWeek = start.getDay()
    start.setDate(start.getDate() - dayOfWeek)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 7)
    return bookings.filter((b) => {
      const d = new Date(b.date)
      return d >= start && d < end
    })
  }
  if (range === 'month') {
    start.setDate(1)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
    return bookings.filter((b) => {
      const d = new Date(b.date)
      return d >= start && d < end
    })
  }
  return bookings
}

export default function Bookings() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings(providerBookings)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const filteredBookings = useMemo(() => {
    let result = [...bookings]
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.customer.name.toLowerCase().includes(q) ||
          b.service.name.toLowerCase().includes(q)
      )
    }
    if (filters.status !== 'all') {
      result = result.filter((b) => b.bookingStatus === filters.status)
    }
    if (filters.dateRange !== 'all') {
      result = filterByDateRange(result, filters.dateRange)
    }
    return result
  }, [bookings, filters])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  const stats = useMemo(() => {
    const b = bookings
    return {
      total: b.length,
      pending: b.filter((x) => x.bookingStatus === 'pending').length,
      upcoming: b.filter((x) => ['accepted', 'scheduled', 'in-progress'].includes(x.bookingStatus)).length,
      completed: b.filter((x) => x.bookingStatus === 'completed').length,
    }
  }, [bookings])

  if (loading) {
    return (
      <PageContainer title="My Bookings" subtitle="Manage customer requests, active jobs and completed services.">
        <div className="space-y-4" role="status" aria-label="Loading bookings">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
                <div className="h-10 w-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" aria-hidden="true" />
                <div className="h-8 w-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" aria-hidden="true" />
                <div className="h-3 w-20 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="h-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-full max-w-xs mb-3" aria-hidden="true" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded mb-2" aria-hidden="true" />
            ))}
          </div>
          <span className="sr-only">Loading bookings...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="My Bookings"
      subtitle="Manage customer requests, active jobs and completed services."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatsCard
            icon={CalendarCheck}
            label="Total Bookings"
            value={stats.total}
            color="bg-primary/10 text-primary"
            index={0}
          />
          <StatsCard
            icon={Clock}
            label="Pending"
            value={stats.pending}
            color="bg-amber-50 text-amber-600"
            index={1}
          />
          <StatsCard
            icon={PlayCircle}
            label="Upcoming Jobs"
            value={stats.upcoming}
            color="bg-blue-50 text-blue-600"
            index={2}
          />
          <StatsCard
            icon={CheckCircle}
            label="Completed"
            value={stats.completed}
            color="bg-green-50 text-green-600"
            index={3}
          />
        </div>

        <BookingFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-semibold text-secondary">{filteredBookings.length}</span>
          booking{filteredBookings.length !== 1 ? 's' : ''} found
        </div>

        {filteredBookings.length === 0 ? (
          <EmptyBookings hasFilters={filters.search || filters.status !== 'all' || filters.dateRange !== 'all'} />
        ) : (
          <>
            <div className="hidden sm:block">
              <BookingTable bookings={filteredBookings} />
            </div>
            <div className="sm:hidden space-y-3">
              {filteredBookings.map((booking, i) => (
                <BookingCard key={booking.id} booking={booking} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </PageContainer>
  )
}
