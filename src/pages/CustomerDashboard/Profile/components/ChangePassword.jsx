import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Lock, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import RegisterInput from '../../../../components/auth/RegisterInput'
import PasswordStrength from '../../../../components/auth/PasswordStrength'

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const newPassword = watch('newPassword', '')
  const currentPassword = watch('currentPassword', '')

  const onSubmit = useCallback(
    (data) => {
      if (data.currentPassword === data.newPassword) {
        toast.error('New password must be different from current password')
        return
      }
      toast.success('Password changed successfully')
      reset()
    },
    [reset],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Lock size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <RegisterInput
          label="Current Password"
          name="currentPassword"
          type="password"
          placeholder="Enter current password"
          register={register}
          error={errors.currentPassword?.message}
          validation={{ required: 'Current password is required' }}
        />

        <div>
          <RegisterInput
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            register={register}
            error={errors.newPassword?.message}
            validation={{
              required: 'New password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            }}
          />
          {newPassword && <PasswordStrength password={newPassword} />}
        </div>

        <RegisterInput
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          register={register}
          error={errors.confirmPassword?.message}
          validation={{
            required: 'Please confirm your password',
            validate: (value) => value === newPassword || 'Passwords do not match',
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting || !currentPassword || !newPassword}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Save size={16} />
          <span>{isSubmitting ? 'Updating...' : 'Update Password'}</span>
        </button>
      </form>
    </motion.div>
  )
}

export default memo(ChangePassword)
