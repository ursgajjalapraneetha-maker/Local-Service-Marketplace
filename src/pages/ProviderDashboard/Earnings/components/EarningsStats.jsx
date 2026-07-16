import { memo } from 'react'
import { IndianRupee, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import StatsCard from '../../components/StatsCard'

function EarningsStats({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatsCard
        icon={IndianRupee}
        label="Total Earnings"
        value={`₹${(stats.totalEarnings / 1000).toFixed(1)}K`}
        color="bg-green-50 text-green-600"
        trend={{ direction: 'up', value: `${stats.growthPercentage}%` }}
        index={0}
      />
      <StatsCard
        icon={TrendingUp}
        label="This Month"
        value={`₹${(stats.thisMonthRevenue / 1000).toFixed(1)}K`}
        color="bg-blue-50 text-blue-600"
        index={1}
      />
      <StatsCard
        icon={Clock}
        label="Pending"
        value={`₹${(stats.pendingPayments / 1000).toFixed(1)}K`}
        color="bg-amber-50 text-amber-600"
        index={2}
      />
      <StatsCard
        icon={CheckCircle}
        label="Completed"
        value={`₹${(stats.completedPayments / 1000).toFixed(1)}K`}
        color="bg-green-50 text-green-600"
        index={3}
      />
    </div>
  )
}

export default memo(EarningsStats)
