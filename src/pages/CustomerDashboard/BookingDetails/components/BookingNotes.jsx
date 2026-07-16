import { memo } from 'react'
import { motion } from 'framer-motion'
import { FileText, MessageSquare, AlertTriangle } from 'lucide-react'

function NoteItem({ icon: Icon, title, content, color }) {
  if (!content) return null

  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg ${color} flex-shrink-0`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          {title}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {content || 'No notes provided'}
        </p>
      </div>
    </div>
  )
}

function BookingNotes({ notes }) {
  if (!notes) return null

  const hasAnyNote = notes.customerNotes || notes.providerNotes || notes.specialInstructions
  if (!hasAnyNote) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Booking Notes
        </h3>
        <div className="space-y-4">
          <NoteItem
            icon={FileText}
            title="Your Note"
            content={notes.customerNotes}
            color="bg-primary/5 text-primary"
          />
          <NoteItem
            icon={MessageSquare}
            title="Provider Note"
            content={notes.providerNotes}
            color="bg-blue-100 text-blue-600"
          />
          <NoteItem
            icon={AlertTriangle}
            title="Special Instructions"
            content={notes.specialInstructions}
            color="bg-warning/10 text-warning"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default memo(BookingNotes)
