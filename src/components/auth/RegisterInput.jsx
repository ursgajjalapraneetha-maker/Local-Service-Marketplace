import { useState, forwardRef } from 'react'

export default forwardRef(function RegisterInput(
  { label, type = 'text', placeholder, error, onChange, onFocus, onBlur, icon: Icon, ...props },
  ref
) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div className="relative">
      {label && (
        <label
          className={`block text-sm font-medium mb-2 transition-colors ${
    isFocused ? 'text-primary' : 'text-secondary'
  }`}
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
      isFocused ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-xl text-sm text-secondary placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
    isFocused
      ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
      : error
        ? 'border-danger bg-danger/5'
        : 'border-gray-200 hover:border-gray-300 bg-white'
  }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p
          id={`${props.id}-error`}
          className="mt-1 text-sm text-danger flex items-center gap-1"
          role="alert"
        >
          <span className="w-1 h-1 bg-danger rounded-full" />
          {error}
        </p>
      )}
    </div>
  )
})