import { memo } from 'react'
import StatCard from './StatCard'

const STATS = [
  { icon: 'bookings', label: 'Upcoming Bookings', value: '3', trend: { direction: 'up', value: '12%' } },
  { icon: 'completed', label: 'Completed Services', value: '24', trend: { direction: 'up', value: '8%' } },
  { icon: 'wishlist', label: 'Wishlist Items', value: '7', trend: { direction: 'up', value: '3%' } },
  { icon: 'spending', label: 'Total Spending', value: '₹12,450', trend: { direction: 'up', value: '18%' } },
]

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
  )
}

export default memo(StatsCards)
