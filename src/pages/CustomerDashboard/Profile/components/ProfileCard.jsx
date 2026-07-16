import { memo } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, MapPin, Edit2 } from 'lucide-react'

const PROFILE_FIELDS = [
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'phone', label: 'Phone', icon: Phone },
  { key: 'location', label: 'Location', icon: MapPin },
  { key: 'memberSince', label: 'Member Since', icon: Calendar },
]

function ProfileCard({ profile, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-heading font-semibold text-secondary">Personal Information</h2>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-xl hover:bg-primary/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Edit profile"
        >
          <Edit2 size={14} />
          <span>Edit</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROFILE_FIELDS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-gray-400" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-medium text-secondary truncate">
                {key === 'memberSince'
                  ? new Date(profile[key]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : profile[key] || 'Not provided'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default memo(ProfileCard)
