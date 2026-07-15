import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function FilterChip({ label, onRemove }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
    >
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-primary/10 rounded-full p-0.5 transition-colors"
        aria-label={`Remove filter: ${label}`}
      >
        <X size={12} />
      </button>
    </motion.span>
  )
}
