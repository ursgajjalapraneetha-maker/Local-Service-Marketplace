import { useState, useCallback, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import DashboardHeader from './components/Header/DashboardHeader'
import MobileSidebar from './components/Navigation/MobileSidebar'
import Breadcrumb from './components/Navigation/Breadcrumb'
import ErrorBoundary from './components/Common/ErrorBoundary'
import PageLoader from '../../components/common/PageLoader'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        <DashboardHeader onMenuToggle={handleMenuToggle} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          <ErrorBoundary>
            <Suspense fallback={<PageLoader fullScreen={false} />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      <MobileSidebar isOpen={mobileMenuOpen} onClose={handleMenuClose} />
    </div>
  )
}
