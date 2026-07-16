import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Palette, Type, Eye } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const FONT_SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

function AppearanceSettings({ preferences, onPreferenceChange }) {
  const handleFontSizeChange = useCallback(
    (e) => {
      onPreferenceChange('fontSize', e.target.value)
    },
    [onPreferenceChange],
  )

  const handleReducedMotion = useCallback(() => {
    onPreferenceChange('reducedMotion', !preferences?.reducedMotion)
  }, [preferences?.reducedMotion, onPreferenceChange])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6 space-y-6"
    >
      <div className="flex items-center gap-2">
        <Palette size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Appearance</h2>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-secondary">
          <Sun size={14} className="text-gray-400" />
          Theme
        </label>
        <ThemeToggle />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-secondary">
          <Type size={14} className="text-gray-400" />
          Font Size
        </label>
        <div className="flex gap-2">
          {FONT_SIZE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleFontSizeChange({ target: { value } })}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                preferences?.fontSize === value
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-secondary">
          <Eye size={14} className="text-gray-400" />
          Accessibility
        </label>
        <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div>
            <p className="text-sm font-medium text-secondary">Reduced Motion</p>
            <p className="text-xs text-gray-500">Minimize animations across the app</p>
          </div>
          <button
            role="switch"
            aria-checked={preferences?.reducedMotion ?? false}
            onClick={handleReducedMotion}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
              preferences?.reducedMotion ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${
                preferences?.reducedMotion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(AppearanceSettings)
