import { memo } from 'react'

function LoadingSpinner({ fullScreen = true, text = 'Loading...' }) {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white'
    : 'flex items-center justify-center py-20'

  return (
    <div className={containerClass} role="status" aria-label={text}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border-3 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-3 border-transparent border-t-primary rounded-full animate-spin" />
        </div>
        <span className="text-sm text-gray-400 font-medium">{text}</span>
      </div>
    </div>
  )
}

export default memo(LoadingSpinner)
