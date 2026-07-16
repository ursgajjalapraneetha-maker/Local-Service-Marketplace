import { memo } from 'react'
import { Menu } from 'lucide-react'
import SearchBar from './SearchBar'
import NotificationBell from './NotificationBell'
import ThemeToggle from './ThemeToggle'
import UserProfileDropdown from './UserProfileDropdown'
import Breadcrumbs from './Breadcrumbs'

function TopNavbar({ onMenuToggle }) {
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
          <div className="hidden lg:block">
            <Breadcrumbs />
          </div>
        </div>

        <SearchBar />

        <div className="flex items-center gap-1.5">
          <NotificationBell />
          <ThemeToggle />
          <UserProfileDropdown />
        </div>
      </div>
      <div className="px-4 lg:px-6 pb-3 lg:hidden">
        <Breadcrumbs />
      </div>
    </header>
  )
}

export default memo(TopNavbar)
