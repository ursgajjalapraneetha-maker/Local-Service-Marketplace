import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Package, Calendar,  ChevronDown, ChevronUp } from 'lucide-react'

function ServiceCard({ service, booking }) {
  const [expanded, setExpanded] = useState(false)

  if (!service) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
            Service Information
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {service.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {service.category}
              </p>
              <p className={`text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
                {service.description}
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-primary hover:text-primary/80 mt-1 flex items-center gap-1"
                aria-label={expanded ? 'Show less' : 'Show more'}
              >
                {expanded ? (
                  <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show More <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                {service.packageName && (
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    {service.packageName} Package
                  </span>
                )}
                {booking?.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {booking.duration}
                  </span>
                )}
                {booking?.scheduledDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {booking.scheduledDate}
                  </span>
                )}
                {booking?.scheduledTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {booking.scheduledTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ServiceCard)
