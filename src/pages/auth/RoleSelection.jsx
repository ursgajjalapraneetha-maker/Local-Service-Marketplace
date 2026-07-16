import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Briefcase, Shield, Check, ArrowRight, Building2, Users, Crown, Zap, Star, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { USER_ROLES } from '../../constants'
import toast from 'react-hot-toast'

const roles = [
  {
    value: USER_ROLES.CUSTOMER,
    label: 'Customer',
    subtitle: 'Book services',
    description: 'Find and book trusted local professionals for your home and business needs.',
    icon: User,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    features: [
      'Browse verified professionals',
      'Book appointments instantly',
      'Secure payments & reviews',
      'Track service history',
    ],
    benefits: ['Free to join', 'No subscriptions', 'Pay per service'],
  },
  {
    value: USER_ROLES.PROVIDER,
    label: 'Service Provider',
    subtitle: 'Offer services',
    description: 'Grow your business by connecting with customers looking for your expertise.',
    icon: Briefcase,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    features: [
      'Showcase your services',
      'Receive booking requests',
      'Manage your schedule',
      'Build your reputation',
    ],
    benefits: ['Free listing', 'Commission-based', 'Verified badge'],
  },
  {
    value: USER_ROLES.ADMIN,
    label: 'Admin',
    subtitle: 'Manage platform',
    description: 'Oversee platform operations, manage users, and ensure quality standards.',
    icon: Shield,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
    features: [
      'Manage users & providers',
      'Monitor platform analytics',
      'Handle disputes & reviews',
      'Configure platform settings',
    ],
    benefits: ['Full access', 'Admin dashboard', 'Priority support'],
  },
]

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setRole, user } = useAuth()
  const navigate = useNavigate()

  const handleContinue = async () => {
    if (!selectedRole) {
      toast.error('Please select a role')
      return
    }

    setIsLoading(true)

    try {
      await new Promise(r => setTimeout(r, 800))

      if (user) {
        setRole(selectedRole)
        localStorage.setItem('selected-role', selectedRole)
      }

      toast.success(`Welcome as ${roles.find(r => r.value === selectedRole)?.label}!`)

      const redirectPath = {
        [USER_ROLES.CUSTOMER]: '/customer-dashboard',
        [USER_ROLES.PROVIDER]: '/provider-dashboard',
        [USER_ROLES.ADMIN]: '/admin-dashboard',
      }[selectedRole] || '/customer-dashboard'

      navigate(redirectPath, { replace: true })
    } catch {
      toast.error('Failed to set role. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-heading font-bold text-secondary mb-4"
          >
            Choose Your Role
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Select how you want to use Local Services. You can switch roles later from your dashboard.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role, index) => (
            <motion.article
              key={role.value}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -8 }}
            >
              <label
                className={`relative group cursor-pointer rounded-3xl p-8 transition-all duration-300 border-2 ${
                  selectedRole === role.value
                    ? `border-${role.color}-500 bg-white shadow-2xl ring-4 ring-${role.color}-500/20`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={selectedRole === role.value}
                  onChange={() => handleRoleSelect(role.value)}
                  className="sr-only"
                />

                <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  selectedRole === role.value
                    ? `bg-gradient-to-br ${role.gradient} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                }`}>
                  {selectedRole === role.value ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <role.icon size={20} />
                  )}
                </div>

                <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${role.bgGradient} mb-6`}>
                  <role.icon size={36} className={`text-${role.color}-600`} />
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-heading font-bold text-secondary mb-1">
                    {role.label}
                  </h3>
                  <p className={`text-${role.color}-600 font-medium text-sm`}>
                    {role.subtitle}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {role.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className={`w-5 h-5 rounded-full bg-${role.color}-100 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check size={12} className={`text-${role.color}-600`} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">What you get:</p>
                  <div className="flex flex-wrap gap-2">
                    {role.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-${role.color}-50 text-${role.color}-700`}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </label>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: selectedRole ? 1 : 0, y: selectedRole ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <motion.button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full max-w-md mx-auto px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
              selectedRole
                ? `bg-gradient-to-r ${roles.find(r => r.value === selectedRole)?.gradient} hover:shadow-xl hover:shadow-${roles.find(r => r.value === selectedRole)?.color}-500/25`
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } disabled:opacity-50`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up your account...
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>

          <p className="mt-4 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-400">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}