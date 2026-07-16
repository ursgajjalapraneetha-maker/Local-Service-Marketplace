import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { USER_ROLES } from '../constants'

export default function PublicRoute({ allowedWhenAuthenticated = false }) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  const getDashboardPath = (role) => {
    switch (role) {
      case USER_ROLES.PROVIDER:
        return '/provider-dashboard'
      case USER_ROLES.ADMIN:
        return '/admin-dashboard'
      default:
        return '/customer-dashboard'
    }
  }

  if (isAuthenticated && !allowedWhenAuthenticated) {
    const dashboardPath = getDashboardPath(user?.role)
    return <Navigate to={dashboardPath} replace state={{ from: location }} />
  }

  return <Outlet />
}