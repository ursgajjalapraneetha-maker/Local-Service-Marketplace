import { memo, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

function LogoutSection() {
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = useCallback(() => {
    setLoggingOut(true)
    setTimeout(() => {
      toast.success('Logged out successfully')
      setLoggingOut(false)
    }, 1000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-heading font-semibold text-secondary">Logout</h2>
          <p className="text-sm text-gray-500 mt-0.5">Sign out of your account</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-danger/10 text-danger text-sm font-semibold rounded-xl hover:bg-danger/20 transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/30"
        >
          <LogOut size={16} />
          <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </motion.div>
  )
}

export default memo(LogoutSection)
