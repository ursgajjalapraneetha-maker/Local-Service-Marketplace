import { NavLink } from 'react-router-dom'

export default function SidebarItem({ icon: Icon, label, path, onClick, end }) {
  return (
    <NavLink
      to={path}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-primary text-white'
            : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  )
}
