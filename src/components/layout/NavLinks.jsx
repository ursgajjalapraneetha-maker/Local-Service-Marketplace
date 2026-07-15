import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, LayoutGroup } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { NAV_LINKS } from '../../constants'
import CategoryDropdown from './CategoryDropdown'

const linkClass = ({ isActive }) =>
  `relative text-sm font-medium transition-colors ${
    isActive ? 'text-primary' : 'text-secondary/70 hover:text-secondary'
  }`

export default function NavLinks({ onNavigate, isMobile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNav = () => {
    setDropdownOpen(false)
    onNavigate?.()
  }

  const categoriesLink = (
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      onMouseEnter={() => setDropdownOpen(true)}
      className={`relative text-sm font-medium transition-colors inline-flex items-center gap-1 ${
        dropdownOpen ? 'text-primary' : 'text-secondary/70 hover:text-secondary'
      }`}
      aria-expanded={dropdownOpen}
      aria-haspopup="true"
    >
      Categories
      <ChevronDown
        size={14}
        className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
      />
    </button>
  )

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-1">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            onClick={handleNav}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'text-primary bg-primary/5'
                  : 'text-secondary/70 hover:text-secondary hover:bg-gray-50'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="px-4 py-2.5">
          {categoriesLink}
        </div>
        <CategoryDropdown isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)} isMobile />
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-8">
      <LayoutGroup>
        {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === '/'}
          className={linkClass}
        >
          {({ isActive }) => (
            <>
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </>
          )}
        </NavLink>
      ))}
      </LayoutGroup>
      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        {categoriesLink}
        <CategoryDropdown isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)} />
      </div>
    </nav>
  )
}
