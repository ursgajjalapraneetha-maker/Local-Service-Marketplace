import { useLocation } from 'react-router-dom'

const SECTION_TITLES = {
  appointments: 'Appointments',
  history: 'History',
  profile: 'Profile',
  settings: 'Settings',
}

export default function SectionPlaceholder() {
  const { pathname } = useLocation()
  const section = pathname.split('/').pop()
  const title = SECTION_TITLES[section] || 'Dashboard'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-secondary">{title}</h1>
        <p className="text-gray-600 mt-1">Manage your {title.toLowerCase()}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <h2 className="text-lg font-heading font-semibold text-secondary mb-2">{title} Section</h2>
        <p className="text-gray-500">This section is under development. Check back soon.</p>
      </div>
    </div>
  )
}
