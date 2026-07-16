import { memo, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const LABEL_MAP = {
  'customer-dashboard': 'Dashboard',
  bookings: 'My Bookings',
  wishlist: 'Wishlist',
  notifications: 'Notifications',
  messages: 'Messages',
  payments: 'Payments',
  invoices: 'Invoices',
  addresses: 'Addresses',
  reviews: 'Reviews',
  profile: 'Profile',
  settings: 'Settings',
  help: 'Help & Support',
}

function Breadcrumb() {
  const { pathname } = useLocation()

  const segments = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean)
    return parts.map((part, index) => {
      const path = '/' + parts.slice(0, index + 1).join('/')
      const label = LABEL_MAP[part] || part
      return { label, path, isDynamic: !LABEL_MAP[part] }
    })
  }, [pathname])

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            to="/customer-dashboard"
            className="inline-flex items-center gap-1 text-gray-400 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
            aria-label="Dashboard home"
          >
            <Home size={14} />
          </Link>
        </li>
        {segments.slice(1).map((segment, index) => (
          <li key={segment.path} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-gray-300" aria-hidden="true" />
            {index < segments.length - 2 ? (
              <Link
                to={segment.path}
                className="text-gray-500 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
              >
                {segment.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium" aria-current="page">
                {segment.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default memo(Breadcrumb)
