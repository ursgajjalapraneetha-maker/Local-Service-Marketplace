import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const PRIVACY_ITEMS = [
  { key: 'showProfile', label: 'Public Profile', description: 'Allow others to see your profile' },
  { key: 'showBookings', label: 'Show Booking History', description: 'Display your past bookings on your profile' },
  { key: 'showReviews', label: 'Show Reviews', description: 'Display reviews you have received' },
  { key: 'activityStatus', label: 'Activity Status', description: 'Show when you are active on the platform' },
]

function ToggleSwitch({ checked, onChange, id }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
        checked ? 'bg-primary' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function PrivacySettings({ preferences, onPrivacyChange }) {
  const handleToggle = useCallback(
    (key) => {
      onPrivacyChange(key)
    },
    [onPrivacyChange],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Shield size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Privacy Settings</h2>
      </div>

      <div className="space-y-3">
        {PRIVACY_ITEMS.map(({ key, label, description }) => (
          <div
            key={key}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-secondary">{label}</p>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
            <ToggleSwitch
              checked={preferences?.[key] ?? false}
              onChange={() => handleToggle(key)}
              id={`privacy-${key}`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default memo(PrivacySettings)
