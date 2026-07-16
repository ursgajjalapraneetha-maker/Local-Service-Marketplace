import { DollarSign, CalendarDays, Users, Briefcase } from 'lucide-react'

const CARDS = [
  { id: 1, title: 'Total Revenue', value: '$45,231', trend: '+15.3%', trendUp: true, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  { id: 2, title: 'Total Bookings', value: '1,248', trend: '+8.2%', trendUp: true, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 3, title: 'Total Users', value: '8,492', trend: '+12.5%', trendUp: true, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 4, title: 'Active Providers', value: '384', trend: '-2.1%', trendUp: false, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100' },
]

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {CARDS.map(card => (
        <div key={card.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${card.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {card.trend}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
