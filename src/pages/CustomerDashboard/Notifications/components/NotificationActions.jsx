import { memo, useCallback } from 'react'
import { Check, Trash2 } from 'lucide-react'

function NotificationActions({ notification, onMarkRead, onDelete }) {
  const handleMarkRead = useCallback(() => {
    onMarkRead?.(notification.id)
  }, [onMarkRead, notification.id])

  const handleDelete = useCallback(() => {
    onDelete?.(notification.id)
  }, [onDelete, notification.id])

  return (
    <div className="flex items-center gap-1">
      {!notification.read && (
        <button
          onClick={handleMarkRead}
          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Mark ${notification.title} as read`}
        >
          <Check size={11} />
          <span className="hidden sm:inline">Mark Read</span>
        </button>
      )}
      <button
        onClick={handleDelete}
        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/30"
        aria-label={`Delete ${notification.title}`}
      >
        <Trash2 size={11} />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  )
}

export default memo(NotificationActions)
