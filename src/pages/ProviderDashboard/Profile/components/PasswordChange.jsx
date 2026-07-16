import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

function PasswordChange({ onChangePassword }) {
  const [form, setForm] = useState({ current: '', new: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState({ current: false, new: false, confirm: false })

  const validate = () => {
    const e = {}
    if (!form.current) e.current = 'Current password is required'
    if (!form.new) e.new = 'New password is required'
    else if (form.new.length < 8) e.new = 'Minimum 8 characters'
    else if (form.new === form.current) e.new = 'New password must differ from current'
    if (form.new !== form.confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onChangePassword?.({ currentPassword: form.current, newPassword: form.new })
      setForm({ current: '', new: '', confirm: '' })
      toast.success('Password updated successfully')
    }, 800)
  }, [form, onChangePassword])

  const toggleShow = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }))

  const renderField = (name, label, placeholder) => (
    <div>
      <label htmlFor={`pw-${name}`} className="block text-xs text-gray-500 mb-0.5">{label}</label>
      <div className="relative">
        <input
          id={`pw-${name}`}
          type={show[name] ? 'text' : 'password'}
          value={form[name]}
          onChange={(e) => { setForm((p) => ({ ...p, [name]: e.target.value })); if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })) }}
          placeholder={placeholder}
          className={`w-full text-sm border rounded-lg px-3 py-2 pr-9 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${errors[name] ? 'border-red-300' : 'border-gray-200'}`}
          aria-invalid={!!errors[name]}
        />
        <button type="button" onClick={() => toggleShow(name)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors focus:outline-none" aria-label={`${show[name] ? 'Hide' : 'Show'} ${label}`}>
          {show[name] ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {errors[name] && <p className="text-[10px] text-red-500 mt-0.5">{errors[name]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Lock size={16} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Change Password</h2>
      </div>

      {renderField('current', 'Current Password', 'Enter current password')}
      {renderField('new', 'New Password', 'Enter new password')}
      {renderField('confirm', 'Confirm Password', 'Re-enter new password')}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  )
}

export default memo(PasswordChange)
