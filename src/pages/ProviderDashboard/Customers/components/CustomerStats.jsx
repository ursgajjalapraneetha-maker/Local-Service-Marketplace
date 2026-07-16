import { memo } from 'react'
import { Users, UserPlus, Repeat, Star } from 'lucide-react'
import StatsCard from '../../components/StatsCard'

function CustomerStats({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatsCard
        icon={Users}
        label="Total Customers"
        value={stats.totalCustomers}
        color="bg-primary/10 text-primary"
        index={0}
      />
      <StatsCard
        icon={UserPlus}
        label="New Customers"
        value={stats.newCustomers}
        color="bg-blue-50 text-blue-600"
        index={1}
      />
      <StatsCard
        icon={Repeat}
        label="Returning"
        value={stats.returningCustomers}
        color="bg-green-50 text-green-600"
        index={2}
      />
      <StatsCard
        icon={Star}
        label="Avg. Rating"
        value={stats.averageRating}
        color="bg-amber-50 text-amber-600"
        index={3}
      />
    </div>
  )
}

export default memo(CustomerStats)
