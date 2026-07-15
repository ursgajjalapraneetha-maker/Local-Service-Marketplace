import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sun, Moon } from 'lucide-react'
import { APP_NAME } from '../../constants'
import { useTheme } from '../../context/ThemeContext'
import NavLinks from './NavLinks'
import SearchBox from './SearchBox'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 250 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring', damping: 25, stiffness: 250 },
  },
}

export default function MobileMenu({ isOpen, onClose }) {
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-sm">LS</span>
                </div>
                <span className="text-lg font-heading font-bold text-secondary">{APP_NAME}</span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Search */}
            <SearchBox variant="mobile" />

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <NavLinks onNavigate={onClose} isMobile />
            </div>

            {/* Bottom actions */}
            <div className="border-t border-gray-100 px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-secondary/60 hover:text-secondary hover:bg-gray-100 transition-colors"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
              <Link
                to="/become-provider"
                onClick={onClose}
                className="block w-full px-4 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              >
                Become a Provider
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-center text-secondary border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
