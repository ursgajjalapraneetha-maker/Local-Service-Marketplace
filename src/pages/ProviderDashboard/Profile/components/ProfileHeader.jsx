import { memo } from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, Star, ShieldCheck, ShieldAlert, ShieldOff, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const VERIFICATION_CONFIG = {
  verified: { icon: ShieldCheck, bg: 'bg-green-50', text: 'text-green-600', label: 'Verified' },
  pending: { icon: ShieldAlert, bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' },
  rejected: { icon: ShieldOff, bg: 'bg-red-50', text: 'text-red-600', label: 'Rejected' },
}

function ProfileHeader({ personalInfo, businessInfo, verification, stats }) {
  const navigate = useNavigate()
  const vConfig = VERIFICATION_CONFIG[verification?.status] || VERIFICATION_CONFIG.pending
  const VIcon = vConfig.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden"
    >
      <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-blue-50 relative" />

      <div className="px-5 pb-5 -mt-10 sm:-mt-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border-4 border-white shadow-md flex items-center justify-center shrink-0">
            <User size={36} className="text-primary/60 sm:text-5xl" aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0 pt-2 sm:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-secondary truncate">
                {personalInfo?.fullName}
              </h1>
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium w-fit ${vConfig.bg} ${vConfig.text}`}>
                <VIcon size={12} aria-hidden="true" />
                {vConfig.label}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
              <span className="text-sm text-gray-500">{businessInfo?.category}</span>
              <span className="text-gray-300 hidden sm:inline">&middot;</span>
              <span className="text-sm text-gray-500 truncate">{businessInfo?.businessName}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={13} aria-hidden="true" />
                {personalInfo?.address?.split(',').slice(0, 2).join(',')}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star size={13} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                <span className="font-semibold text-secondary">{stats?.rating}</span>
                <span className="text-gray-400 text-xs">({stats?.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/provider-dashboard/profile/edit')}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 shrink-0"
          >
            <Pencil size={14} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-gray-50">
          {[
            { label: 'Completed Jobs', value: stats?.completedServices?.toLocaleString() },
            { label: 'Experience', value: `${personalInfo?.experience} years` },
            { label: 'Response Rate', value: `${stats?.responseRate}%` },
            { label: 'Member Since', value: new Date(stats?.memberSince).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) },
          ].map(({ label, value }) => (
            <div key={label} className="text-center p-2 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-bold text-secondary mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ProfileHeader)
