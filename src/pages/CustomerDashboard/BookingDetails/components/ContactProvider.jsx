import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageSquare, AlertCircle, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

function ContactProvider({ provider }) {
  const handleCall = useCallback(() => {
    if (provider?.phone) {
      toast.success(`Calling ${provider.name}...`)
    }
  }, [provider])

  const handleMessage = useCallback(() => {
    toast.success('Opening chat...')
  }, [])

  const handleEmergency = useCallback(() => {
    if (provider?.emergencyContact) {
      toast.success('Emergency contact dialed')
    }
  }, [provider])

  if (!provider) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Contact Provider
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={provider.photo}
                alt={provider.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {provider.verified && (
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-0.5">
                  <Shield className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {provider.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {provider.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/5 text-primary text-sm font-medium rounded-xl hover:bg-primary/10 transition-colors"
              aria-label={`Call ${provider.name}`}
            >
              <Phone className="w-4 h-4" />
              Call
            </button>
            <button
              onClick={handleMessage}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Message ${provider.name}`}
            >
              <MessageSquare className="w-4 h-4" />
              Message
            </button>
          </div>

          {provider.emergencyContact && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={handleEmergency}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-danger/5 text-danger text-sm font-medium rounded-xl hover:bg-danger/10 transition-colors"
                aria-label="Emergency contact"
              >
                <AlertCircle className="w-4 h-4" />
                Emergency Contact: {provider.emergencyContact}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ContactProvider)
