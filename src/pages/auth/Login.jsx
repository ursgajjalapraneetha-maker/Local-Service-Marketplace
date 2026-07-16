import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, Users, Shield, CreditCard } from 'lucide-react'
import InputField from '../../components/auth/InputField'
import PasswordInput from '../../components/auth/PasswordInput'
import { useAuth } from '../../hooks/useAuth'
import { COLORS, USER_ROLES } from '../../constants'
import toast from 'react-hot-toast'

//const { COLORS: { primary, secondary, danger, success } } = require('../../constants')

const ROLE_SELECTION_ROUTES = {
  [USER_ROLES.CUSTOMER]: '/customer-dashboard',
  [USER_ROLES.PROVIDER]: '/provider-dashboard',
  [USER_ROLES.ADMIN]: '/admin-dashboard',
}

const defaultRoleRoute = '/role-selection'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const email = watch('email')
  const password = watch('password')
  const rememberMe = watch('rememberMe')

  const redirectToDashboard = (userRole) => {
    const route = ROLE_SELECTION_ROUTES[userRole] || defaultRoleRoute
    navigate(route, { replace: true })
  }

  const onSubmit = async (formData) => {
    clearErrors()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      const userData = {
        email: formData.email,
        name: formData.email.split('@')[0],
        role: formData.email.includes('admin') ? USER_ROLES.ADMIN : USER_ROLES.CUSTOMER,
        isEmailVerified: true,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.email.split('@')[0])}&background=2563EB&color=fff`,
      }

      login(userData)
      
      if (formData.rememberMe) {
        localStorage.setItem('remember-me', formData.email)
      } else {
        localStorage.removeItem('remember-me')
      }

      toast.success('Welcome back!')
      redirectToDashboard(userData.role)
    } catch (error) {
      setError('email', { type: 'manual', message: error.message || 'Login failed. Please try again.' })
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    toast.success('Password reset link sent to your email')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white min-h-[600px]">
        
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-blue-700 p-12 flex-col justify-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-xl">LS</span>
              </div>
              <span className="text-3xl font-heading font-bold">Local Services</span>
            </div>
            
            <h1 className="text-4xl font-heading font-bold mb-4">
              Welcome Back!
            </h1>
            
            <p className="text-white/80 text-lg mb-8">
              Login to book trusted local service providers.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
                <span className="text-white/90">Verified Professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <Shield size={14} className="text-white" />
                </div>
                <span className="text-white/90">Secure Booking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <CreditCard size={14} className="text-white" />
                </div>
                <span className="text-white/90">Easy Payments</span>
              </div>
            </div>
            
            <div className="relative mt-12">
              <div className="aspect-video rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Sarah M.</div>
                      <div className="text-xs text-white/70">Home Cleaning</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/20 rounded-full" />
                    <div className="h-2 bg-white/20 rounded-full w-3/4" />
                    <div className="h-2 bg-white/20 rounded-full w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold text-secondary mb-2">
                Login to your account
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputField
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                id="email"
                icon={Mail}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 pr-12 border rounded-xl text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                      errors.password ? 'border-danger bg-danger/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-secondary transition-colors rounded-lg hover:bg-gray-100"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-1 text-sm text-danger flex items-center gap-1"
                    role="alert"
                  >
                    <span className="w-1 h-1 bg-danger rounded-full" />
                    {errors.password.message}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                    {...register('rememberMe')}
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-blue-700 font-medium hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Link>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Login<ArrowRight size={18} /></>
                )}
              </motion.button>
            </form>
            
            <div className="mt-6">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200" />
                <span className="flex-shrink-0 px-4 text-sm text-gray-500">Or continue with</span>
                <div className="flex-grow border-t border-gray-200" />
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-secondary"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-secondary"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary hover:text-blue-700 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}