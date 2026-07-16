import { memo } from 'react'
import { motion } from 'framer-motion'
import { Shield, Calendar, BadgeCheck } from 'lucide-react'

const ACCOUNT_INFO = [
  { key: 'role', label: 'Account Type', icon: BadgeCheck },
  { key: 'memberSince', label: 'Member Since', icon: Calendar },
  { key: 'lastLogin', label: 'Last Login', icon: Shield },
]

function AccountInformation({ profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <h2 className="text-base font-heading font-semibold text-secondary mb-5">Account Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ACCOUNT_INFO.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-gray-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-medium text-secondary">
                {key === 'memberSince'
                  ? new Date(profile[key]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : profile[key] || 'Not available'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default memo(AccountInformation)
