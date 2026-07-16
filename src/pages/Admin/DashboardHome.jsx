import { useState, useEffect } from 'react'
import { Users, Briefcase, CalendarDays, DollarSign } from 'lucide-react'
import WelcomeCard from './components/WelcomeCard'
import StatCard from './components/StatCard'
import RecentActivity from './components/RecentActivity'
import RecentBookings from './components/RecentBookings'
import QuickActions from './components/QuickActions'
import NotificationsPanel from './components/NotificationsPanel'
import DashboardSkeleton from './components/DashboardSkeleton'

export default function DashboardHome() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <WelcomeCard />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,248" icon={Users} trend="12%" trendUp={true} />
        <StatCard title="Total Providers" value="384" icon={Briefcase} trend="5%" trendUp={true} />
        <StatCard title="Total Bookings" value="8,492" icon={CalendarDays} trend="2%" trendUp={false} />
        <StatCard title="Revenue" value="$45,231" icon={DollarSign} trend="18%" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="xl:col-span-2 space-y-6">
          <RecentBookings />
          <RecentActivity />
        </div>
        
        {/* Sidebar Column */}
        <div className="space-y-6">
          <QuickActions />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  )
}
