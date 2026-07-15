import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Services from '../pages/Services/Services'
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails'
import CustomerDashboard from '../pages/CustomerDashboard/CustomerDashboard'
import ProviderDashboard from '../pages/ProviderDashboard/ProviderDashboard'
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import Error404 from '../pages/Error404/Error404'
import ProtectedRoute from './ProtectedRoute'
import FAQSection from '../pages/Home/components/FAQSection'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetails />} />
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
      </Route>

      <Route
        path="admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}
