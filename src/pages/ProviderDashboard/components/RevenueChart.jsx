import { memo, useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee, TrendingUp } from 'lucide-react'
import { weeklyEarnings, monthlyEarnings } from '../data/dashboardData'

const TABS = [
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
]

function RevenueChart() {
  const [activeTab, setActiveTab] = useState('weekly')

  const handleTabChange = useCallback((key) => {
    setActiveTab(key)
  }, [])

  const { data, maxAmount } = useMemo(() => {
    const source = activeTab === 'weekly' ? weeklyEarnings : monthlyEarnings
    const amounts = source.map((d) => d.amount)
    return { data: source, maxAmount: Math.max(...amounts) }
  }, [activeTab])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
      role="region"
      aria-label="Revenue chart"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IndianRupee size={18} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Revenue</h2>
        </div>
        <div className="flex bg-gray-50 rounded-lg p-0.5" role="tablist" aria-label="Revenue period">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              role="tab"
              aria-selected={activeTab === key}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                activeTab === key
                  ? 'bg-white text-secondary shadow-sm'
                  : 'text-gray-500 hover:text-secondary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-40 sm:h-48 flex items-end gap-1.5 sm:gap-2">
        {data.map((item) => {
          const height = (item.amount / maxAmount) * 100
          return (
            <div
              key={item.day || item.month}
              className="flex-1 flex flex-col items-center gap-1.5 group"
            >
              <div className="relative w-full flex justify-center">
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                  ₹{item.amount.toLocaleString()}
                </div>
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-[32px] bg-gradient-to-t from-primary to-primary-light rounded-t-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ minHeight: height > 0 ? '4px' : '0' }}
                role="img"
                aria-label={`${item.day || item.month}: ₹${item.amount.toLocaleString()}`}
              />
              <span className="text-[10px] text-gray-400 font-medium">
                {item.day || item.month}
              </span>
            </div>
          )
        })}
      </div>

      {activeTab === 'weekly' && (
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <TrendingUp size={14} className="text-green-500" aria-hidden="true" />
            <span className="text-green-600 font-semibold">+12.5%</span>
            <span>vs last week</span>
          </div>
          <p className="text-xs text-gray-400">
            <span className="font-semibold text-secondary">₹28,100</span> this week
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default memo(RevenueChart)
