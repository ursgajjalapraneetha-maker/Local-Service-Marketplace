import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { X, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import RegisterInput from '../../../../components/auth/RegisterInput'

function EditProfileForm({ profile, onSave, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
    },
  })

  const onSubmit = useCallback(
    (data) => {
      onSave(data)
      toast.success('Profile updated successfully')
    },
    [onSave],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-heading font-semibold text-secondary">Edit Profile</h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Cancel editing"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <RegisterInput
          label="Full Name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          register={register}
          error={errors.name?.message}
          validation={{ required: 'Full name is required' }}
        />

        <RegisterInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email?.message}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          }}
        />

        <RegisterInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          register={register}
          error={errors.phone?.message}
          validation={{
            required: 'Phone number is required',
            pattern: {
              value: /^[\d\s+\-()]{7,}$/,
              message: 'Invalid phone number',
            },
          }}
        />

        <RegisterInput
          label="Location"
          name="location"
          type="text"
          placeholder="e.g. New York, NY"
          register={register}
          error={errors.location?.message}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-semibold text-secondary bg-gray-100 rounded-xl hover:bg-gray-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <Save size={16} />
            <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default memo(EditProfileForm)
