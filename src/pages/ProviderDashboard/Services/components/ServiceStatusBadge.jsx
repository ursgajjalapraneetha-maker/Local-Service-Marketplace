import { memo } from 'react'
import { cn } from '../../../../utils'

const STYLES = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-gray-50 text-gray-500 border-gray-200',
  draft: 'bg-amber-50 text-amber-700 border-amber-200',
}

function ServiceStatusBadge({ status, className }) {
  const style = STYLES[status] || STYLES.inactive
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border',
        style,
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'active' ? 'bg-green-500' : 'bg-gray-400'
        )}
        aria-hidden="true"
      />
      {status === 'active' ? 'Active' : status === 'draft' ? 'Draft' : 'Inactive'}
    </span>
  )
}

export default memo(ServiceStatusBadge)
