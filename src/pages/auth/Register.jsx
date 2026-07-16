import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, User, Briefcase, Shield, CheckCircle } from 'lucide-react'
import RegisterInput from "../../components/auth/RegisterInput";
import PasswordInput from "../../components/auth/PasswordInput";
import PasswordStrength from "../../components/auth/PasswordStrength";
import RoleCard from "../../components/auth/RoleCard";
import { useAuth } from "../../hooks/useAuth";
import { USER_ROLES } from "../../constants";
import toast from 'react-hot-toast'

const roles = [
  {
    value: USER_ROLES.CUSTOMER,
    label: 'Customer',
    desc: 'Book services from verified professionals',
    icon: User,
    color: 'blue',
  },
  {
    value: USER_ROLES.PROVIDER,
    label: 'Service Provider',
    desc: 'Offer your services and earn money',
    icon: Briefcase,
    color: 'green',
  }
]

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: authRegister } = useAuth()
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm()
  const selectedRole = watch('role')
  const navigate = useNavigate()

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'password') {
        setValue('confirmPassword', '', { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue])

  const onSubmit = async (data) => {
    try {
      await new Promise(r => setTimeout(r, 1000))
      
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
      }
      
      authRegister(userData)
      
      navigate('/otp-verification', {
        state: {
          email: data.email,
          name: data.name,
          role: data.role,
          password: data.password,
        }
      })
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    }
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length <= 3) {
      value = value
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`
    } else {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
    }
    setValue('phone', value, { shouldValidate: true })
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 hidden lg:block"
          >
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-secondary mb-4">Join our Local Services Marketplace</h1>
              <p className="text-lg text-gray-600 mb-6">Find trusted professionals or grow your service business.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">For Customers</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Book trusted professionals</li>
                    <li>✓ Manage appointments</li>
                    <li>✓ Secure payments</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">For Service Providers</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Showcase your services</li>
                    <li>✓ Receive booking requests</li>
                    <li>✓ Grow your business</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">Your security matters</h3>
                  <p className="text-sm text-gray-600 mt-1">Email verification required. We never share your data.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 max-w-md mx-auto lg:mx-0"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-secondary">Create Account</h2>
              <p className="mt-2 text-gray-600">Join our marketplace today</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
              <RegisterInput
                label="Full Name"
                type="text"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name', {
                  required: 'Full name is required',
                  minLength: { value: 3, message: 'Minimum 3 characters' }
                })}
                id="name"
              />

              <RegisterInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Please enter a valid email'
                  }
                })}
                id="email"
              />

              <RegisterInput
                label="Phone Number"
                type="tel"
                placeholder="(123) 456-7890"
                error={errors.phone?.message}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\(\d{3}\) \d{3}-\d{4}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
                id="phone"
                onChange={handlePhoneChange}
              />

              <div className="relative">
                <PasswordInput
                  label="Password"
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
                label="Confirm Password"
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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary mb-2">I want to be a</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map(({ value, label, desc, icon: Icon, color }) => (
                    <RoleCard
                      key={value}
                      title={label}
                      description={desc}
                      value={value}
                      selected={selectedRole === value}
                      onClick={() => setValue('role', value)}
                      Icon={Icon}
                      color={color}
                    />
                  ))}
                </div>
                {errors.role && <p className="text-xs text-danger mt-1">Please select a role</p>}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  {...register('terms', { required: 'You must accept the terms' })}
                  className="w-4 h-4 mt-0.5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
                </label>
              </div>
              {errors.terms && <p className="text-xs text-danger mt-1 ml-7">You must accept the terms</p>}

              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Create Account
                <CheckCircle size={18} />
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}