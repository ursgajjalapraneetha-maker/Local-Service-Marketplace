import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import RegisterInput from "../../components/auth/RegisterInput";
import { COLORS } from "../../constants";
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setError('email', { type: 'manual', message: '' })

    try {
      await new Promise(r => setTimeout(r, 1500))
      
      setSubmittedEmail(data.email)
      setIsSuccess(true)
      toast.success('Password reset link sent!')
    } catch {
      setError('email', { type: 'manual', message: 'Failed to send reset link. Please try again.' })
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNavigateToOTP = () => {
    navigate('/otp-verification', {
      state: {
        email: submittedEmail,
        name: submittedEmail.split('@')[0],
        role: 'customer',
        isPasswordReset: true,
      }
    })
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
          {!isSuccess ? (
            <>
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
                  className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center"
                >
                  <Mail size={32} className="text-primary" />
                </motion.div>

                <h1 className="text-3xl font-heading font-bold text-secondary mb-2">Forgot Password?</h1>
                <p className="text-gray-600 text-lg">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <RegisterInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  id="email"
                  autoComplete="email"
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-2xl flex items-center justify-center"
              >
                <CheckCircle size={32} className="text-success" />
              </motion.div>

              <h1 className="text-3xl font-heading font-bold text-secondary mb-2">Check Your Email</h1>
              <p className="text-gray-600 text-lg mb-2">
                We've sent a password reset link to
              </p>
              <p className="text-primary font-semibold text-lg mb-6">{submittedEmail}</p>

              <div className="p-4 bg-gray-50 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div className="text-sm text-gray-700 text-left">
                    <p className="font-medium text-secondary mb-1">What's next?</p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>\u2022 Check your inbox (and spam folder)</li>
                      <li>\u2022 Click the reset link in the email</li>
                      <li>\u2022 Enter the 6-digit code to verify</li>
                      <li>\u2022 Set your new password</li>
                    </ul>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleNavigateToOTP}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                I've Received the Code
                <ArrowLeft size={18} className="rotate-180" />
              </motion.button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Didn't receive it?{' '}
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Resend Email
                </button>
              </p>

              <p className="mt-6 text-center text-sm text-gray-600">
                Back to <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}