import { LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useState, useRef, useEffect } from 'react'

export default function UserProfileDropdown() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
      >
        <User size={16} className="text-primary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false)
              logout()
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-gray-50 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
