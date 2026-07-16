import { Download, Filter } from 'lucide-react'
import AnalyticsCards from './components/analytics/AnalyticsCards'
import RevenueChart from './components/analytics/RevenueChart'
import UsersGrowthChart from './components/analytics/UsersGrowthChart'
import BookingsPieChart from './components/analytics/BookingsPieChart'

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-500 mt-1">Detailed metrics and growth statistics across your platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
            <Filter size={16} />
            This Year
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <AnalyticsCards />

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <BookingsPieChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersGrowthChart />
        {/* Placeholder for future chart or table */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center h-96 text-center text-gray-400">
          <p>More Analytics Coming Soon</p>
        </div>
      </div>
    </div>
  )
}
