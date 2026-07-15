import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { APP_NAME } from '../../constants'
import { useTheme } from '../../context/ThemeContext'
import NavLinks from './NavLinks'
import SearchBox from './SearchBox'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 lg:w-9 lg:h-9 bg-primary rounded-xl flex items-center justify-center transition-shadow group-hover:shadow-md"
              >
                <span className="text-white font-heading font-bold text-sm lg:text-base">LS</span>
              </motion.div>
              <span className="text-base lg:text-lg font-heading font-bold text-secondary">
                {APP_NAME}
              </span>
            </Link>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:block">
              <NavLinks />
            </div>

            {/* Right: Desktop Actions */}
            <div className="hidden lg:flex items-center gap-1.5">
              <SearchBox />

              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
              >
                Become a Provider
                <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-secondary border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              >
                Register
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-secondary/60 hover:text-secondary hover:bg-gray-100 transition-colors"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile: Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-secondary/60 hover:text-secondary hover:bg-gray-100 transition-colors"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
