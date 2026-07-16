import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Shield, Smartphone, Monitor, Globe, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

function LoginRow({ login, index }) {
  const time = new Date(login.date)
  const timeStr = time.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  const isCurrent = index === 0
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-start gap-3 p-2.5 rounded-lg border ${isCurrent ? 'border-primary/20 bg-primary/[0.02]' : 'border-gray-100'}`}
    >
      <div className={`w-8 h-8 rounded-lg ${isCurrent ? 'bg-primary/10' : 'bg-gray-50'} flex items-center justify-center shrink-0`}>
        <Monitor size={14} className={isCurrent ? 'text-primary' : 'text-gray-500'} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-medium text-secondary truncate">{login.device}</p>
          {isCurrent && <span className="text-[9px] font-medium text-primary bg-primary/5 px-1 py-0.5 rounded">Current</span>}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Globe size={10} className="text-gray-400" aria-hidden="true" />
          <span className="text-[10px] text-gray-500">{login.location}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Clock size={9} className="text-gray-400" aria-hidden="true" />
          <span className="text-[9px] text-gray-400">{timeStr}</span>
        </div>
      </div>
    </motion.div>
  )
}

function SecuritySettings({ security, onToggle2FA }) {
  const [twoFactor, setTwoFactor] = useState(security?.twoFactorEnabled)

  const handleToggle2FA = useCallback(() => {
    const next = !twoFactor
    setTwoFactor(next)
    onToggle2FA?.(next)
    toast.success(next ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled')
  }, [twoFactor, onToggle2FA])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Shield size={16} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Security</h2>
      </div>

      <div className="flex items-center justify-between py-3 border-b border-gray-50">
        <div className="flex items-center gap-2.5">
          <Smartphone size={16} className="text-gray-500" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-secondary">Two-Factor Authentication</p>
            <p className="text-[10px] text-gray-400">Add extra security to your account</p>
          </div>
        </div>
        <button
          onClick={handleToggle2FA}
          className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${twoFactor ? 'bg-primary' : 'bg-gray-300'}`}
          role="switch"
          aria-checked={twoFactor}
          aria-label="Toggle two-factor authentication"
        >
          <motion.span
            animate={{ x: twoFactor ? 22 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-3 border-b border-gray-50">
        <div>
          <p className="text-sm font-medium text-secondary">Last Password Change</p>
          <p className="text-[10px] text-gray-400">
            {security?.lastPasswordChange ? new Date(security.lastPasswordChange).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Never'}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Login Activity</h3>
        <div className="space-y-1.5">
          {security?.loginHistory?.map((login, i) => (
            <LoginRow key={i} login={login} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(SecuritySettings)
