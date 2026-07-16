import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, IndianRupee, CalendarCheck, Clock, Star, Sun, Moon, Coffee } from 'lucide-react'
import { providerStats } from './data/dashboardData'
import StatsCard from './components/StatsCard'
import RevenueChart from './components/RevenueChart'
import BookingOverview from './components/BookingOverview'
import UpcomingBookings from './components/UpcomingBookings'
import RecentActivity from './components/RecentActivity'
import RatingOverview from './components/RatingOverview'
import QuickActions from './components/QuickActions'
import AvailabilityCard from './components/AvailabilityCard'
import { cn } from '../../utils'

function SkeletonBlock({ className }) {
  return <div className={`bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg ${className}`} aria-hidden="true" />
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading dashboard">
      <SkeletonBlock className="w-full h-32 rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
            <SkeletonBlock className="w-10 h-10" />
            <SkeletonBlock className="w-16 h-7" />
            <SkeletonBlock className="w-20 h-3" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <SkeletonBlock className="w-28 h-5" />
          <SkeletonBlock className="w-full h-40" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <SkeletonBlock className="w-28 h-5" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonBlock className="w-9 h-9 rounded-lg" />
              <div className="flex-1 space-y-1">
                <SkeletonBlock className="w-3/4 h-3" />
                <SkeletonBlock className="w-full h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading dashboard...</span>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Good Morning', icon: Coffee }
  if (hour < 18) return { text: 'Good Afternoon', icon: Sun }
  return { text: 'Good Evening', icon: Moon }
}

export default function DashboardHome() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const { greeting, GreetingIcon, today } = useMemo(() => {
    const g = getGreeting()
    const d = new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
    return { greeting: g.text, GreetingIcon: g.icon, today: d }
  }, [])

  const handleQuickAction = useCallback(() => {
    navigate('/provider-dashboard/services')
  }, [navigate])

  if (loading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6"
        role="region"
        aria-label="Dashboard header"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20 shrink-0">
              <GreetingIcon size={22} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-heading font-bold text-secondary">
                Welcome back, Provider
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your services, bookings and earnings from one place.
              </p>
              <p className="text-xs text-gray-400 mt-1">{today}</p>
            </div>
          </div>
          <button
            onClick={handleQuickAction}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl',
              'hover:bg-primary-dark transition-all active:scale-[0.97]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
              'shadow-lg shadow-primary/20'
            )}
            aria-label="Create new service"
          >
            <span>Create Service</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatsCard
          icon={IndianRupee}
          label="Total Earnings"
          value={`₹${providerStats.totalEarnings.toLocaleString()}`}
          color="bg-green-50 text-green-600"
          trend={{ direction: 'up', value: `${providerStats.earningsGrowth}%` }}
          index={0}
        />
        <StatsCard
          icon={CalendarCheck}
          label="Total Bookings"
          value={providerStats.totalBookings}
          subtext={`${providerStats.completedBookings} completed`}
          color="bg-blue-50 text-blue-600"
          index={1}
        />
        <StatsCard
          icon={Clock}
          label="Pending Requests"
          value={providerStats.pendingRequests}
          subtext="Awaiting response"
          color="bg-amber-50 text-amber-600"
          index={2}
        />
        <StatsCard
          icon={Star}
          label="Average Rating"
          value={providerStats.averageRating}
          subtext={`${providerStats.totalReviews} reviews`}
          color="bg-purple-50 text-purple-600"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <BookingOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingBookings />
        <RecentActivity />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RatingOverview />
        <QuickActions />
        <AvailabilityCard />
      </div>
    </div>
  )
}
