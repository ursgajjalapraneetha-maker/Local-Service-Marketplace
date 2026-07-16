import { useState, useCallback, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import MobileDrawer from './components/MobileDrawer'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleToggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  const handleMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} onToggleCollapse={handleToggleCollapse} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:ml-[68px]' : 'lg:ml-64'}`}>
        <TopNavbar onMenuToggle={handleMenuToggle} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner fullScreen={false} />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      <MobileDrawer isOpen={mobileMenuOpen} onClose={handleMenuClose} />
    </div>
  )
}
