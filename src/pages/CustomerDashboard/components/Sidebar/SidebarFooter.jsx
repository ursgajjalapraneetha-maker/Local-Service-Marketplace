import { memo, useCallback } from 'react'
import { LogOut } from 'lucide-react'
import { cn } from '../../../../utils'
import toast from 'react-hot-toast'

function SidebarFooter({ collapsed }) {
  const handleLogout = useCallback(() => {
    toast.success('Logged out successfully')
  }, [])

  return (
    <div className="p-2 border-t border-gray-100">
      <button
        onClick={handleLogout}
        className={cn(
          'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-danger transition-colors',
          collapsed && 'justify-center mx-2'
        )}
        title={collapsed ? 'Logout' : undefined}
        aria-label="Logout"
      >
        <LogOut size={18} className="shrink-0" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  )
}

export default memo(SidebarFooter)
