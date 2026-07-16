import { CalendarDays } from 'lucide-react'

const DUMMY_BOOKINGS = [
  { id: '#B-1025', customer: 'Alice Johnson', service: 'House Cleaning', amount: '$120', status: 'Completed' },
  { id: '#B-1026', customer: 'Bob Smith', service: 'Plumbing Repair', amount: '$85', status: 'In Progress' },
  { id: '#B-1027', customer: 'Charlie Davis', service: 'AC Maintenance', amount: '$150', status: 'Pending' },
]

export default function RecentBookings() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-5 border-b border-gray-100 flex items-center gap-2">
        <CalendarDays size={20} className="text-primary" />
        <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
      </div>
      <div className="p-5 space-y-4">
        {DUMMY_BOOKINGS.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{booking.customer}</p>
              <p className="text-xs text-gray-500">{booking.service} • {booking.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{booking.amount}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
