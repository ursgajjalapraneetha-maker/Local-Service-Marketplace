import { motion } from 'framer-motion'
import { UserX } from 'lucide-react'

export default function EmptyProfile({ message = 'No profile information available.' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
        <UserX size={28} className="text-gray-300" aria-hidden="true" />
      </div>
      <h3 className="text-base font-heading font-semibold text-secondary mb-1">Profile Not Found</h3>
      <p className="text-sm text-gray-500 text-center max-w-xs">{message}</p>
    </motion.div>
  )
}
