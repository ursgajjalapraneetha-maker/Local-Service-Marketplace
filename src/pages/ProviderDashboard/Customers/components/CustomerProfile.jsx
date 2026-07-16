import { memo } from 'react'
import { User, Phone, Mail, MapPin, CalendarDays, BadgeCheck } from 'lucide-react'
import { cn, formatDate } from '../../../../utils'

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

function CustomerProfile({ customer }) {
  if (!customer) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-gray-400">Customer information not available.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-gray-50">
        <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-3 ring-4 ring-primary/10">
          <span className="text-2xl font-bold text-primary">{customer.name.charAt(0)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-heading font-semibold text-secondary">{customer.name}</h3>
          {customer.status === 'returning' && (
            <BadgeCheck size={16} className="text-blue-500" aria-label="Verified returning customer" />
          )}
        </div>
        <span className={cn(
          'text-xs font-semibold px-2 py-0.5 rounded-full mt-1',
          customer.status === 'returning' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
        )}>
          {customer.status === 'returning' ? 'Returning Customer' : 'New Customer'}
        </span>
      </div>

      <div className="divide-y divide-gray-50">
        <InfoRow icon={User} label="Full Name" value={customer.name} />
        <InfoRow icon={Phone} label="Phone" value={customer.phone} />
        <InfoRow icon={Mail} label="Email" value={customer.email} />
        <InfoRow icon={MapPin} label="Location" value={customer.location} />
        <InfoRow icon={CalendarDays} label="Customer Since" value={formatDate(customer.customerSince)} />
      </div>
    </div>
  )
}

export default memo(CustomerProfile)
