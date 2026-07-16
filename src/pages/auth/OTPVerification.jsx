import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Clock, RefreshCw, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { COLORS } from '../../constants'
import toast from 'react-hot-toast'

export default function OTPVerification() {
  const [timeLeft, setTimeLeft] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  
  const { register: authRegister } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm()
  
  const email = location.state?.email || 'user@example.com'
  const name = location.state?.name || 'User'
  const role = location.state?.role || 'customer'
  const password = location.state?.password || ''
  const isPasswordReset = location.state?.isPasswordReset || false
  
  const otpValue = otpDigits.join('')
  const isComplete = otpValue.length === 6
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])
  
  const formatTime = (seconds) => {
    const secs = seconds % 60
    return `00:${secs.toString().padStart(2, '0')}`
  }
  
  const handleOtpChange = (index, value) => {
    const numericValue = value.replace(/\D/g, '')
    if (numericValue.length > 1) return
    
    const newDigits = [...otpDigits]
    newDigits[index] = numericValue
    setOtpDigits(newDigits)
    
    if (numericValue && index < 5) {
      setFocusedIndex(index + 1)
    } else if (!numericValue && index > 0) {
      setFocusedIndex(index - 1)
    }
  }
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      setFocusedIndex(index - 1)
    }
  }
  
  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newDigits = pasted.split('').concat(Array(6 - pasted.length).fill(''))
    setOtpDigits(newDigits)
    setFocusedIndex(Math.min(pasted.length, 5))
  }
  
  const handleResend = async () => {
    if (timeLeft > 0) return
    setIsResending(true)
    try {
      await new Promise(r => setTimeout(r, 1000))
      setTimeLeft(60)
      toast.success('New OTP sent to your email')
    } catch {
      toast.error('Failed to resend OTP')
    } finally {
      setIsResending(false)
    }
  }
  
  const onSubmit = async (data) => {
    if (!isComplete) return
    
    setIsVerifying(true)
    setError('otp', { type: 'manual', message: '' })
    
    try {
      await new Promise(r => setTimeout(r, 1500))
      
      if (isPasswordReset) {
        navigate('/reset-password', {
          state: { email, otp: otpValue },
          replace: true
        })
      } else {
        const userData = {
          name,
          email,
          role,
          isEmailVerified: true,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff`,
        }
        
        authRegister(userData)
        toast.success('Account verified successfully!')
        
        const redirectPath = role === 'provider' ? '/provider-dashboard' : 
                           role === 'admin' ? '/admin-dashboard' : '/customer-dashboard'
        navigate(redirectPath, { replace: true })
      }
    } catch (error) {
      setError('otp', { type: 'manual', message: 'Invalid OTP. Please try again.' })
      toast.error('Invalid OTP. Please try again.')
    } finally {
      setIsVerifying(false)
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
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center"
            >
              <Mail size={32} className="text-primary" />
            </motion.div>
            
            <h1 className="text-3xl font-heading font-bold text-secondary mb-2">
              {isPasswordReset ? 'Reset Your Password' : 'Verify Your Email'}
            </h1>
            <p className="text-gray-600 text-lg">
              We've sent a 6-digit code to
            </p>
            <p className="text-primary font-semibold text-lg mt-1">{email}</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={otpDigits[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={() => setFocusedIndex(index)}
                  onPaste={handlePaste}
                  ref={index === 0 ? register('otp', { required: 'Please enter the OTP' }) : undefined}
                  className={`w-full h-14 text-center text-2xl font-semibold rounded-xl border-2 transition-all duration-200 outline-none ${
                    focusedIndex === index
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                      : otpDigits[index]
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={isVerifying}
                  autoComplete="one-time-code"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
            
            {errors.otp && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-danger flex items-center justify-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.otp.message}
              </motion.p>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <Link
                to="/login"
                className="text-primary hover:underline font-medium flex items-center gap-1"
              >
                <ArrowRight size={14} className="rotate-180" />
                Back to Login
              </Link>
              
              <div className="flex items-center gap-2 text-gray-500">
                <Clock size={14} />
                <span className="font-mono font-semibold text-secondary">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            
            <motion.button
              type="submit"
              disabled={!isComplete || isVerifying || timeLeft <= 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                isComplete && !isVerifying && timeLeft > 0
                  ? 'bg-primary hover:bg-primary-dark'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>Verify<ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={timeLeft > 0 || isResending}
                className="text-primary hover:underline font-medium flex items-center justify-center gap-1 mx-auto mt-2"
              >
                {isResending ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : timeLeft > 0 ? (
                  <>
                    <Clock size={14} />
                    Resend in {formatTime(timeLeft)}
                  </>
                ) : (
                  <>
                    <RefreshCw size={14} />
                    Resend Code
                  </>
                )}
              </button>
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle size={18} className="text-primary" />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium text-secondary mb-1">Quick Tips</p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>\u2022 Check your spam/junk folder</li>
                  <li>\u2022 The code expires in 60 seconds</li>
                  <li>\u2022 You can request a new code after expiry</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          Back to <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}