import { memo } from 'react'
import { Bell } from 'lucide-react'

function NotificationEmptyState() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
      <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
        <Bell size={32} className="text-primary/40" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-secondary">No Notifications Found</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
        We couldn&apos;t find any notifications matching your criteria. Try adjusting your search or filters.
      </p>
    </div>
  )
}

export default memo(NotificationEmptyState)
