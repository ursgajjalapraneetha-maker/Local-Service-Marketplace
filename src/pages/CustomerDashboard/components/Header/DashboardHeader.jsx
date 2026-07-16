import { memo } from 'react'
import { useTheme } from '../../../../context/ThemeContext'
import { Moon, Sun, Menu } from 'lucide-react'
import SearchBar from './SearchBar'
import NotificationButton from './NotificationButton'
import ProfileDropdown from './ProfileDropdown'

function DashboardHeader({ onMenuToggle }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16 gap-3">
        <div className="flex items-center gap-3 lg:gap-0">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-500 hover:text-secondary hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>

        <SearchBar />

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-secondary hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <NotificationButton />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

export default memo(DashboardHeader)
