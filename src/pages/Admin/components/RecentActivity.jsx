import { Activity } from 'lucide-react'

const DUMMY_ACTIVITY = [
  { id: 1, action: 'New provider registration', time: '10 mins ago', status: 'pending' },
  { id: 2, action: 'Payment received for Booking #1024', time: '1 hour ago', status: 'success' },
  { id: 3, action: 'Service category updated', time: '3 hours ago', status: 'info' },
  { id: 4, action: 'User reported an issue', time: '5 hours ago', status: 'warning' },
]

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-5 border-b border-gray-100 flex items-center gap-2">
        <Activity size={20} className="text-primary" />
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-5 space-y-4">
        {DUMMY_ACTIVITY.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
              activity.status === 'success' ? 'bg-green-500' :
              activity.status === 'warning' ? 'bg-yellow-500' :
              activity.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'
            }`} />
            <div>
              <p className="text-sm text-gray-800">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
