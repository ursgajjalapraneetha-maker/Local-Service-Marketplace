import { useState, useEffect } from 'react'
import WelcomeCard from './components/WelcomeCard'
import StatsCards from './components/StatsCards'
import UpcomingBookings from './components/UpcomingBookings'
import RecentActivity from './components/RecentActivity'
import NotificationsPreview from './components/NotificationsPreview'
import RecommendedServices from './components/RecommendedServices'
import QuickActions from './components/QuickActions'
import DashboardSkeleton from './components/DashboardSkeleton'

export default function DashboardHome() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      <WelcomeCard />
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingBookings />
        <RecentActivity />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationsPreview />
        <RecommendedServices />
      </div>

      <QuickActions />
    </div>
  )
}
