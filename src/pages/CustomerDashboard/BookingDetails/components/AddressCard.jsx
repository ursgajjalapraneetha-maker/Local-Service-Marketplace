import { memo } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, User, Navigation } from 'lucide-react'

function AddressCard({ address }) {
  if (!address) return null

  const fullAddress = [address.line1, address.line2, address.city, address.state, address.pincode]
    .filter(Boolean)
    .join(', ')

  const mapUrl = address.coordinates
    ? `https://maps.google.com/?q=${address.coordinates.lat},${address.coordinates.lng}`
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Service Location
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/5 text-primary flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {address.customerName}
              </p>
              {address.phone && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {address.phone}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/5 text-primary flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {fullAddress}
              </p>
              {address.landmark && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Landmark: {address.landmark}
                </p>
              )}
            </div>
          </div>
          {mapUrl && (
            <div className="flex justify-end">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Open in Google Maps"
              >
                <Navigation className="w-3 h-3" />
                View on Map
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(AddressCard)
