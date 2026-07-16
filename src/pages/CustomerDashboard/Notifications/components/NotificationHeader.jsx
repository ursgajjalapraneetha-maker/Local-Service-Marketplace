import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, CheckCheck, Trash2 } from 'lucide-react'

function NotificationHeader({ unreadCount, totalCount, onMarkAllRead, onClearAll }) {
  const navigate = useNavigate()

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleMarkAllRead = useCallback(() => {
    onMarkAllRead?.()
  }, [onMarkAllRead])

  const handleClearAll = useCallback(() => {
    onClearAll?.()
  }, [onClearAll])

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-primary" aria-hidden="true" />
            <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">Notifications</h1>
            {unreadCount > 0 && (
              <span className="text-[11px] font-bold text-white bg-primary px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Stay updated with your activity</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-xl hover:bg-primary/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Mark all notifications as read"
          >
            <CheckCheck size={14} />
            <span className="hidden sm:inline">Mark All Read</span>
          </button>
        )}
        {totalCount > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-danger/10 text-danger text-xs font-semibold rounded-xl hover:bg-danger/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/30"
            aria-label="Clear all notifications"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(NotificationHeader)
