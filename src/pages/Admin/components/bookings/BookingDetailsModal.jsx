import { X, User, Briefcase, Calendar, Clock, DollarSign, MapPin, Activity } from 'lucide-react'

export default function BookingDetailsModal({ booking, onClose }) {
  if (!booking) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Booking Details</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">{booking.id}</h3>
            <p className="text-sm text-gray-500">{booking.service}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><User size={14}/> Customer</label>
              <p className="text-sm text-gray-900 font-medium">{booking.customer}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Briefcase size={14}/> Provider</label>
              <p className="text-sm text-gray-900 font-medium">{booking.provider}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Calendar size={14}/> Date</label>
              <p className="text-sm text-gray-900 font-medium">{booking.date}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Clock size={14}/> Time</label>
              <p className="text-sm text-gray-900 font-medium">{booking.time}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><DollarSign size={14}/> Amount</label>
              <p className="text-sm text-gray-900 font-medium">{booking.amount}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Activity size={14}/> Status</label>
              <p className="text-sm text-gray-900 font-medium capitalize">{booking.status}</p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><MapPin size={14}/> Location</label>
              <p className="text-sm text-gray-900 font-medium">123 Dummy Street, New York, NY 10001</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
