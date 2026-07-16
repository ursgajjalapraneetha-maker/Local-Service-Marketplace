import { memo } from 'react'
import { Wrench, Clock, IndianRupee, Tag } from 'lucide-react'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-gray-500" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-secondary">{value}</p>
      </div>
    </div>
  )
}

function ServiceInfo({ service }) {
  if (!service) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-gray-400">Service information not available.</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-50">
      <InfoRow icon={Wrench} label="Service Name" value={service.name} />
      <InfoRow icon={Tag} label="Category" value={service.category} />
      <InfoRow icon={IndianRupee} label="Price" value={`₹${service.price.toLocaleString()}`} />
      <InfoRow icon={Clock} label="Duration" value={service.duration} />
    </div>
  )
}

export default memo(ServiceInfo)
