import { Eye, UserPlus, XCircle } from 'lucide-react'

export default function BookingTable({ bookings, onView, onAssign, onCancel }) {
  if (bookings.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No bookings found matching your criteria.
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'confirmed': return 'bg-blue-100 text-blue-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <th className="p-4 font-medium whitespace-nowrap">Booking ID</th>
            <th className="p-4 font-medium whitespace-nowrap">Customer</th>
            <th className="p-4 font-medium whitespace-nowrap">Service</th>
            <th className="p-4 font-medium whitespace-nowrap">Provider</th>
            <th className="p-4 font-medium whitespace-nowrap">Date & Time</th>
            <th className="p-4 font-medium whitespace-nowrap">Amount</th>
            <th className="p-4 font-medium whitespace-nowrap">Status</th>
            <th className="p-4 font-medium text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.map(booking => (
            <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{booking.id}</td>
              <td className="p-4 text-sm text-gray-800 whitespace-nowrap">{booking.customer}</td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{booking.service}</td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                {booking.provider === 'Unassigned' ? (
                  <span className="text-gray-400 italic">Unassigned</span>
                ) : booking.provider}
              </td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                {booking.date}<br/><span className="text-xs">{booking.time}</span>
              </td>
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{booking.amount}</td>
              <td className="p-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </td>
              <td className="p-4 text-right space-x-2 whitespace-nowrap flex items-center justify-end">
                <button onClick={() => onView(booking)} className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="View Details">
                  <Eye size={18} />
                </button>
                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                  <button onClick={() => onAssign(booking)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50" title="Assign Provider">
                    <UserPlus size={18} />
                  </button>
                )}
                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                  <button onClick={() => onCancel(booking)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Cancel Booking">
                    <XCircle size={18} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
