import { memo } from 'react'

function SidebarSection({ label, children, collapsed }) {
  if (collapsed) return <>{children}</>

  return (
    <div className="mb-1">
      <p className="px-5 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
        {label}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

export default memo(SidebarSection)
