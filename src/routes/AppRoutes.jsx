import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OTPVerification from "../pages/auth/OTPVerification";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Services from '../pages/Services/Services'
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails'
import CustomerDashboard from '../pages/CustomerDashboard/CustomerDashboard'
import ProviderDashboard from '../pages/ProviderDashboard/ProviderDashboard'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboardHome from '../pages/Admin/DashboardHome'
import Users from '../pages/Admin/Users'
import Providers from '../pages/Admin/Providers'
import Categories from '../pages/Admin/Categories'
import AdminServices from '../pages/Admin/Services'
import Bookings from '../pages/Admin/Bookings'
import Analytics from '../pages/Admin/Analytics'
import Settings from '../pages/Admin/Settings'
import RoleSelection from '../pages/auth/RoleSelection'
import Terms from '../pages/Legal/Terms'
import Privacy from '../pages/Legal/Privacy'
import SectionPlaceholder from '../pages/shared/SectionPlaceholder'
import Error404 from '../pages/Error404/Error404'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import FAQSection from '../pages/Home/components/FAQSection'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="otp-verification" element={<OTPVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="role-selection" element={<RoleSelection />} />
        </Route>
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetails />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<Error404 />} />
      </Route>

      {/* Dashboard routes */}
      <Route
        path="customer-dashboard"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <DashboardLayout role="customer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="appointments" element={<SectionPlaceholder />} />
        <Route path="history" element={<SectionPlaceholder />} />
        <Route path="profile" element={<SectionPlaceholder />} />
        <Route path="settings" element={<SectionPlaceholder />} />
      </Route>

      <Route
        path="provider-dashboard"
        element={
          <ProtectedRoute allowedRoles={['provider']}>
            <DashboardLayout role="provider" />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProviderDashboard />} />
        <Route path="appointments" element={<SectionPlaceholder />} />
        <Route path="history" element={<SectionPlaceholder />} />
        <Route path="profile" element={<SectionPlaceholder />} />
        <Route path="settings" element={<SectionPlaceholder />} />
      </Route>

      <Route
        path="admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardHome />} />
        <Route path="users" element={<Users />} />
        <Route path="providers" element={<Providers />} />
        <Route path="categories" element={<Categories />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="reports" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
