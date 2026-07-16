import { memo } from 'react'
import { User, Phone, MapPin, CalendarCheck } from 'lucide-react'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-gray-500" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-secondary">{value || 'Not provided'}</p>
      </div>
    </div>
  )
}

function CustomerInfo({ customer }) {
  if (!customer) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-gray-400">Customer information not available.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-primary">{customer.name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-secondary">{customer.name}</p>
          <span className="text-xs text-gray-400">Customer since 2026</span>
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        <InfoRow icon={User} label="Full Name" value={customer.name} />
        <InfoRow icon={Phone} label="Phone" value={customer.phone} />
        <InfoRow icon={MapPin} label="Address" value={customer.address} />
        <InfoRow icon={CalendarCheck} label="Total Bookings" value={`${customer.totalBookings} bookings`} />
      </div>
    </div>
  )
}

export default memo(CustomerInfo)
