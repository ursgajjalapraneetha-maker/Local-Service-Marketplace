import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, Users, Shield, CreditCard } from 'lucide-react'
import InputField from '../../components/auth/InputField'
import PasswordInput from '../../components/auth/PasswordInput'
import * as authService from '../../services/authService'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setErrors({})
    
    try {
      await authService.loginUser({ email, password })
      
      // Simulate successful login
      setTimeout(() => {
        // Redirect based on user type or role
        navigate('/customer-dashboard', { replace: true })
      }, 1500)
      
    } catch (error) {
      setErrors({
        general: error.message || 'Login failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login clicked')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white min-h-[600px]">
        
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark p-12 flex-col justify-center relative overflow-hidden"
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
            
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-lg"
              >
                <p className="text-sm text-danger font-medium">
                  {errors.general}
                </p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                id="email"
                icon={Mail}
              />
              
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                id="password"
              />
              
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                
                <Link
                  to="#"
                  className="text-sm text-primary hover:text-primary-dark font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <span className="flex-shrink-0 px-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-200" />
              </div>
            </div>
            
            <motion.button
              onClick={handleGoogleLogin}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-3 px-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.27H12v13.51h5.92c-.26 1.37-1.04 2.53-2.23 3.31v2.77h3.6c2.11-1.94 3.44-4.81 3.44-8.19z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.6-2.77c-1.02 0.69-2.33 1.09-3.68 1.09-2.82 0-5.21-1.9-6.07-4.47l-3.11 2.4c1.64 3.18 5.04 5.33 8.88 5.33z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.66c-.35-.66-.53-1.43-.53-2.21 0-.78.18-1.52.5-2.21L2.71 8.14C1.56 9.68 1 11.56 1 13.5 1 15.44 1.56 17.32 2.71 18.86l3.13-2.2z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.73 0 3.28.6 4.5 1.58L18.22 3.34C16.46 2.09 14.26 1.5 12 1.5 7.04 1.5 3.07 4.66 1.27 9.28l3.88 3.02c.71-2.6 2.74-4.63 5.14-5.16z"
                />
              </svg>
              Continue with Google
            </motion.button>
            
            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-primary-dark hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
