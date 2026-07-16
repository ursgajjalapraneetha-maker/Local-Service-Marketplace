import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { User, Save } from 'lucide-react'

function Field({ label, name, value, onChange, type = 'text', placeholder, required, error, multiline }) {
  const Input = multiline ? 'textarea' : 'input'
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-500 mb-1">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={multiline ? 3 : undefined}
        className={`w-full text-sm border rounded-lg px-3 py-2 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 placeholder:text-gray-400 ${
          error ? 'border-red-300' : 'border-gray-200'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <p id={`${name}-error`} className="text-[10px] text-red-500 mt-0.5">{error}</p>}
    </div>
  )
}

function ProfileForm({ fields, initialValues, onSave, loading }) {
  const [values, setValues] = useState(() => ({ ...initialValues }))
  const [errors, setErrors] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [errors])

  const validate = () => {
    const newErrors = {}
    fields.forEach((f) => {
      if (f.required && !values[f.name]?.toString().trim()) {
        newErrors[f.name] = `${f.label} is required`
      }
      if (f.type === 'email' && values[f.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[f.name])) {
        newErrors[f.name] = 'Invalid email address'
      }
      if (f.type === 'tel' && values[f.name] && !/^[\d\s+()-]{10,}$/.test(values[f.name])) {
        newErrors[f.name] = 'Invalid phone number'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave?.(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <User size={16} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}>
            <Field
              {...field}
              value={values[field.name] || ''}
              onChange={handleChange}
              error={errors[field.name]}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Save size={16} aria-hidden="true" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

export default memo(ProfileForm)
