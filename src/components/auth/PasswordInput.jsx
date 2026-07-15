import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

/**
 * PasswordInput Component
 *
 * Displays a password input with show/hide toggle functionality.
 * Supports error styling and accessibility.
 *
 * @param {{ 
 *   value: string,
 *   onChange: function,
 *   placeholder?: string,
 *   error?: string,
 *   label?: string,
 *   id?: string
 * }} props
 */
export default function PasswordInput({
  value,
  onChange,
  placeholder = 'Enter your password',
  error,
  label = 'Password',
  id = 'password',
}) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-secondary mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-12 border rounded-xl text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${error ? 'border-danger bg-danger/5' : 'border-gray-200 hover:border-gray-300'}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
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
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-danger flex items-center gap-1"
          role="alert"
        >
          <span className="w-1 h-1 bg-danger rounded-full" />
          {error}
        </p>
      )}
    </div>
  )
}
