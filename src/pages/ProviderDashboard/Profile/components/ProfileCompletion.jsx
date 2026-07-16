import { memo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle } from 'lucide-react'

const SECTIONS = [
  { key: 'personal', label: 'Personal Information', field: 'fullName' },
  { key: 'business', label: 'Business Details', field: 'businessName' },
  { key: 'serviceArea', label: 'Service Area', field: 'cities' },
  { key: 'kyc', label: 'KYC Verification', field: 'status' },
  { key: 'bank', label: 'Bank Details', field: 'accountNumber' },
]

function ProfileCompletion({ profile }) {
  const completed = SECTIONS.filter((s) => {
    if (s.key === 'personal') return profile?.personalInfo?.fullName
    if (s.key === 'business') return profile?.businessInfo?.businessName
    if (s.key === 'serviceArea') return profile?.serviceArea?.cities?.length > 0
    if (s.key === 'kyc') return profile?.verification?.status === 'verified'
    if (s.key === 'bank') return profile?.bankDetails?.accountNumber
    return false
  }).length

  const percentage = Math.round((completed / SECTIONS.length) * 100)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-heading font-semibold text-secondary">Profile Completion</h3>
        <span className="text-xs font-bold text-primary">{percentage}%</span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full bg-primary rounded-full"
        />
      </div>

      <div className="space-y-1.5">
        {SECTIONS.map((s) => {
          const done = completed > SECTIONS.indexOf(s)
          return (
            <div key={s.key} className="flex items-center gap-2 text-xs">
              {done ? (
                <CheckCircle2 size={12} className="text-green-500 shrink-0" aria-hidden="true" />
              ) : (
                <Circle size={12} className="text-gray-300 shrink-0" aria-hidden="true" />
              )}
              <span className={done ? 'text-secondary font-medium' : 'text-gray-400'}>{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(ProfileCompletion)
