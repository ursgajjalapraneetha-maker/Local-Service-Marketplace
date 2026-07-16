import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../../../utils'

function SidebarItem({ icon: Icon, label, path, collapsed, onClick }) {
  const { pathname } = useLocation()
  const isActive = pathname === path

  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
        collapsed ? 'justify-center mx-2' : 'mx-2',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-gray-600 hover:bg-gray-100 hover:text-secondary'
      )}
      title={collapsed ? label : undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <Icon size={18} className="shrink-0" aria-hidden="true" />
      {!collapsed && (
        <span className="truncate">{label}</span>
      )}
    </Link>
  )
}

export default memo(SidebarItem)
