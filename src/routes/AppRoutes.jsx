import { lazy, Suspense, memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import PageLoader from '../components/common/PageLoader'

const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const Login = lazy(() => import('../pages/auth/Login'))
const Register = lazy(() => import('../pages/auth/Register'))
const Services = lazy(() => import('../pages/Services/Services'))
const ServiceDetails = lazy(() => import('../pages/ServiceDetails/ServiceDetails'))
const ProviderDashboardLayout = lazy(() => import('../pages/ProviderDashboard/DashboardLayout'))
const ProviderDashboardHome = lazy(() => import('../pages/ProviderDashboard/DashboardHome'))
const ProviderServices = lazy(() => import('../pages/ProviderDashboard/Services/Services'))
const ProviderAddService = lazy(() => import('../pages/ProviderDashboard/Services/AddService'))
const ProviderEditService = lazy(() => import('../pages/ProviderDashboard/Services/EditService'))
const ProviderServiceDetails = lazy(() => import('../pages/ProviderDashboard/Services/ServiceDetails'))
const ProviderBookingsList = lazy(() => import('../pages/ProviderDashboard/Bookings/Bookings'))
const ProviderBookingDetails = lazy(() => import('../pages/ProviderDashboard/Bookings/BookingDetails'))
const ProviderCustomersList = lazy(() => import('../pages/ProviderDashboard/Customers/Customers'))
const ProviderCustomerDetails = lazy(() => import('../pages/ProviderDashboard/Customers/CustomerDetails'))
const ProviderEarnings = lazy(() => import('../pages/ProviderDashboard/Earnings/Earnings'))
const ProviderTransactionDetails = lazy(() => import('../pages/ProviderDashboard/Earnings/TransactionDetails'))
const ProviderSchedule = lazy(() => import('../pages/ProviderDashboard/Schedule/Schedule'))
const ProviderCalendarView = lazy(() => import('../pages/ProviderDashboard/Schedule/CalendarView'))
const ProviderAvailabilitySettings = lazy(() => import('../pages/ProviderDashboard/Schedule/AvailabilitySettings'))
const ProviderMessages = lazy(() => import('../pages/ProviderDashboard/Communication/Messages'))
const ProviderChatWindow = lazy(() => import('../pages/ProviderDashboard/Communication/ChatWindow'))
const ProviderNotifications = lazy(() => import('../pages/ProviderDashboard/Communication/Notifications'))
const ProviderProfile = lazy(() => import('../pages/ProviderDashboard/Profile/Profile'))
const ProviderEditProfile = lazy(() => import('../pages/ProviderDashboard/Profile/EditProfile'))
const ProviderSettings = lazy(() => import('../pages/ProviderDashboard/Profile/Settings'))
const ProviderNotFound = lazy(() => import('../pages/ProviderDashboard/components/NotFound'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard/AdminDashboard'))
const Error404 = lazy(() => import('../pages/Error404/Error404'))

const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
const CustomerDashboardLayout = lazy(() => import('../pages/CustomerDashboard/DashboardLayout'))
const DashboardHome = lazy(() => import('../pages/CustomerDashboard/DashboardHome/DashboardHome'))
const MyBookings = lazy(() => import('../pages/CustomerDashboard/Bookings/Bookings'))
const BookingDetails = lazy(() => import('../pages/CustomerDashboard/BookingDetails/BookingDetails'))
const WishlistPage = lazy(() => import('../pages/CustomerDashboard/Wishlist/Wishlist'))
const Notifications = lazy(() => import('../pages/CustomerDashboard/Notifications/Notifications'))
const Messages = lazy(() => import('../pages/CustomerDashboard/Messages/Messages'))
const Payments = lazy(() => import('../pages/CustomerDashboard/Payments/Payments'))
const Invoices = lazy(() => import('../pages/CustomerDashboard/Payments/Payments'))
const Addresses = lazy(() => import('../pages/CustomerDashboard/pages/Addresses'))
const Reviews = lazy(() => import('../pages/CustomerDashboard/pages/Reviews'))
const Profile = lazy(() => import('../pages/CustomerDashboard/Profile/Profile'))
const Settings = lazy(() => import('../pages/CustomerDashboard/Profile/Profile'))
const Help = lazy(() => import('../pages/CustomerDashboard/pages/Help'))
const DashboardNotFound = lazy(() => import('../pages/CustomerDashboard/components/Common/DashboardNotFound'))

function LazyPage({ Component, ...props }) {
  return (
    <Suspense fallback={<PageLoader fullScreen={false} />}>
      <Component {...props} />
    </Suspense>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LazyPage Component={Home} />} />
        <Route path="about" element={<LazyPage Component={About} />} />
        <Route path="contact" element={<LazyPage Component={Contact} />} />
        <Route path="login" element={<LazyPage Component={Login} />} />
        <Route path="register" element={<LazyPage Component={Register} />} />
        <Route path="services" element={<LazyPage Component={Services} />} />
        <Route path="services/:id" element={<LazyPage Component={ServiceDetails} />} />
        <Route path="*" element={<LazyPage Component={Error404} />} />
      </Route>

      <Route
        path="customer-dashboard"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Suspense fallback={<PageLoader fullScreen={false} />}>
              <CustomerDashboardLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<LazyPage Component={DashboardHome} />} />
        <Route path="bookings" element={<LazyPage Component={MyBookings} />} />
        <Route path="bookings/:bookingId" element={<LazyPage Component={BookingDetails} />} />
        <Route path="wishlist" element={<LazyPage Component={WishlistPage} />} />
        <Route path="notifications" element={<LazyPage Component={Notifications} />} />
        <Route path="messages" element={<LazyPage Component={Messages} />} />
        <Route path="payments" element={<LazyPage Component={Payments} />} />
        <Route path="invoices" element={<LazyPage Component={Invoices} />} />
        <Route path="addresses" element={<LazyPage Component={Addresses} />} />
        <Route path="reviews" element={<LazyPage Component={Reviews} />} />
        <Route path="profile" element={<LazyPage Component={Profile} />} />
        <Route path="settings" element={<LazyPage Component={Settings} defaultTab="notifications" />} />
        <Route path="help" element={<LazyPage Component={Help} />} />
        <Route path="*" element={<LazyPage Component={DashboardNotFound} />} />
      </Route>

      <Route
        path="provider-dashboard"
        element={
          <ProtectedRoute allowedRoles={['provider']}>
            <Suspense fallback={<PageLoader fullScreen={false} />}>
              <ProviderDashboardLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<LazyPage Component={ProviderDashboardHome} />} />
        <Route path="services" element={<LazyPage Component={ProviderServices} />} />
        <Route path="services/add" element={<LazyPage Component={ProviderAddService} />} />
        <Route path="services/:id" element={<LazyPage Component={ProviderServiceDetails} />} />
        <Route path="services/:id/edit" element={<LazyPage Component={ProviderEditService} />} />
        <Route path="bookings" element={<LazyPage Component={ProviderBookingsList} />} />
        <Route path="bookings/:id" element={<LazyPage Component={ProviderBookingDetails} />} />
        <Route path="customers" element={<LazyPage Component={ProviderCustomersList} />} />
        <Route path="customers/:id" element={<LazyPage Component={ProviderCustomerDetails} />} />
        <Route path="earnings" element={<LazyPage Component={ProviderEarnings} />} />
        <Route path="earnings/transactions/:id" element={<LazyPage Component={ProviderTransactionDetails} />} />
        <Route path="schedule" element={<LazyPage Component={ProviderSchedule} />}>
          <Route path="calendar" element={<LazyPage Component={ProviderCalendarView} />} />
          <Route path="settings" element={<LazyPage Component={ProviderAvailabilitySettings} />} />
        </Route>
        <Route path="messages" element={<LazyPage Component={ProviderMessages} />}>
          <Route path=":conversationId" element={<LazyPage Component={ProviderChatWindow} />} />
        </Route>
        <Route path="notifications" element={<LazyPage Component={ProviderNotifications} />} />
        <Route path="profile" element={<LazyPage Component={ProviderProfile} />} />
        <Route path="profile/edit" element={<LazyPage Component={ProviderEditProfile} />} />
        <Route path="settings" element={<LazyPage Component={ProviderSettings} />} />
        <Route path="*" element={<LazyPage Component={ProviderNotFound} />} />
      </Route>

      <Route
        path="admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Suspense fallback={<PageLoader fullScreen={false} />}>
              <DashboardLayout role="admin" />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<LazyPage Component={AdminDashboard} />} />
      </Route>
    </Routes>
  )
}

export default memo(AppRoutes)
