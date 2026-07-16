import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../../../context/ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  const handleToggle = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  return (
    <button
      onClick={handleToggle}
      className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
        isDark
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
          : 'bg-white border-gray-100 hover:bg-gray-50'
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          isDark ? 'bg-yellow-400/10 text-yellow-400' : 'bg-primary/10 text-primary'
        }`}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </motion.div>
      <div className="text-left">
        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-secondary'}`}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </p>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        </p>
      </div>
      <div className="ml-auto">
        <div
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isDark ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${
              isDark ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </div>
      </div>
    </button>
  )
}

export default memo(ThemeToggle)
