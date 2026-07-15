import { motion } from 'framer-motion'

export default function PasswordStrength({ password }) {
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '' }
    
    let score = 0
    let label = ''
    
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 10
    
    if (/[A-Z]/.test(pwd)) score += 25
    
    if (/[a-z]/.test(pwd)) score += 25
    
    if (/\d/.test(pwd)) score += 10
    
    if (/[^A-Za-z0-9]/.test(pwd)) score += 10
    
    if (score < 40) label = 'Weak'
    else if (score < 60) label = 'Medium'
    else if (score < 80) label = 'Strong'
    else label = 'Very Strong'
    
    return { score, label }
  }

  const { score, label } = calculateStrength(password)

  const getColor = () => {
    if (score < 40) return 'bg-danger'
    if (score < 60) return 'bg-warning'
    if (score < 80) return 'bg-blue-500'
    return 'bg-success'
  }

  const getBgColor = () => {
    if (score < 40) return 'bg-danger/10'
    if (score < 60) return 'bg-warning/10'
    if (score < 80) return 'bg-blue-500/10'
    return 'bg-success/10'
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Password Strength</span>
        {label && (
          <span className={`text-xs font-medium ${getColor().replace('bg-', 'text-')} ${label === 'Very Strong' ? 'text-lg' : ''}`}>
            {label}
          </span>
        )}
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor()} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(score, 100)}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
        <div className={`flex items-center gap-1 ${password.length >= 8 ? 'text-success' : 'text-gray-400'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          At least 8 chars
        </div>
        <div className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-success' : 'text-gray-400'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Uppercase
        </div>
        <div className={`flex items-center gap-1 ${/[a-z]/.test(password) ? 'text-success' : 'text-gray-400'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Lowercase
        </div>
        <div className={`flex items-center gap-1 ${/\d/.test(password) ? 'text-success' : 'text-gray-400'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Number
        </div>
        <div className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-success' : 'text-gray-400'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Special char
        </div>
      </div>
    </div>
  )
}