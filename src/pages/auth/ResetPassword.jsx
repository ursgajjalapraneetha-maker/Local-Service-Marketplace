import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import RegisterInput from "../../components/auth/RegisterInput";
import PasswordInput from "../../components/auth/PasswordInput";
import PasswordStrength from "../../components/auth/PasswordStrength";
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const { register, handleSubmit, formState: { errors }, watch, setError, setValue } = useForm()
  
  const email = location.state?.email || ''
  const otp = location.state?.otp || ''
  
  const onSubmit = async (data) => {
    setIsResetting(true)
    setError('password', { type: 'manual', message: '' })
    setError('confirmPassword', { type: 'manual', message: '' })
    
    try {
      await new Promise(r => setTimeout(r, 1500))
      
      toast.success('Password reset successfully!')
      
      const userData = {
        email,
        name: email.split('@')[0],
        role: 'customer',
        isEmailVerified: true,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=2563EB&color=fff`,
      }
      
      authLogin(userData)
      navigate('/customer-dashboard', { replace: true })
    } catch {
      setError('password', { type: 'manual', message: 'Failed to reset password. Please try again.' })
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Login
          </Link>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-2xl flex items-center justify-center"
            >
              <CheckCircle size={32} className="text-success" />
            </motion.div>

            <h1 className="text-3xl font-heading font-bold text-secondary mb-2">Set New Password</h1>
            <p className="text-gray-600 text-lg">
              Your OTP has been verified. Enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <PasswordInput
                label="New Password"
                id="password"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Minimum 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: 'Must contain uppercase, lowercase & number'
                  }
                })}
              />
              <PasswordStrength password={watch('password') || ''} />
            </div>

            <PasswordInput
              label="Confirm New Password"
              id="confirmPassword"
              type="password"
              error={errors.confirmPassword?.message || (watch('password') !== watch('confirmPassword') ? 'Passwords do not match' : '')}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === watch('password') || 'Passwords do not match'
              })}
              showToggle={true}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              showPassword={showConfirmPassword}
            />

            <motion.button
              type="submit"
              disabled={isResetting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isResetting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}