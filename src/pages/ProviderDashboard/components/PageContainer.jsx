import { memo } from 'react'

function PageContainer({ title, subtitle, children }) {
  return (
    <div>
      {title && (
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export default memo(PageContainer)
