import { memo } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  ShieldCheck,
  Briefcase,
  CheckCircle,
  Phone,
  MessageSquare,
  ExternalLink,
} from 'lucide-react'

function ProviderCard({ provider }) {
  if (!provider) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Provider Information
        </h3>
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={provider.photo}
              alt={provider.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {provider.verified && (
              <div className="absolute bottom-0 right-0 bg-primary rounded-full p-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {provider.name}
              </h4>
              {provider.verified && (
                <span className="flex items-center gap-0.5 text-[10px] text-primary font-medium bg-primary/5 px-1.5 py-0.5 rounded-full">
                  <CheckCircle className="w-2.5 h-2.5" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
              {provider.rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  {provider.rating}
                </span>
              )}
              {provider.experience && (
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {provider.experience}
                </span>
              )}
              {provider.totalJobs && (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {provider.totalJobs.toLocaleString()} jobs
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors"
                aria-label={`Call ${provider.name}`}
              >
                <Phone className="w-3 h-3" />
                Call
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={`Message ${provider.name}`}
              >
                <MessageSquare className="w-3 h-3" />
                Message
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ml-auto"
                aria-label={`View ${provider.name} profile`}
              >
                <ExternalLink className="w-3 h-3" />
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ProviderCard)
