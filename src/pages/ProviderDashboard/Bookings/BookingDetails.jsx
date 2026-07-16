import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  FileText,
  Wrench,
  User,
  CreditCard,
  IndianRupee,
  ListChecks,
} from 'lucide-react'
import { providerBookings } from '../data/bookingsData'
import PageContainer from '../components/PageContainer'
import BookingStatusBadge from './components/BookingStatusBadge'
import BookingTimeline from './components/BookingTimeline'
import CustomerInfo from './components/CustomerInfo'
import ServiceInfo from './components/ServiceInfo'
import PaymentDetails from './components/PaymentDetails'
import BookingActions from './components/BookingActions'
import LoadingSpinner from '../components/LoadingSpinner'

function DetailCard({ icon: Icon, title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-primary" aria-hidden="true" />
        <h3 className="text-sm font-heading font-semibold text-secondary">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function BookingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = providerBookings.find((b) => b.id === id)
      setBooking(found || null)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [id])

  const handleStatusChange = useCallback((newStatus) => {
    setBooking((prev) => prev ? { ...prev, bookingStatus: newStatus } : prev)
  }, [])

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner fullScreen={false} text="Loading booking details..." />
      </div>
    )
  }

  if (!booking) {
    return (
      <PageContainer title="Booking Details">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
            <Wrench size={28} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-secondary mb-1">Booking Not Found</h3>
          <p className="text-sm text-gray-500 mb-6">The booking you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/provider-dashboard/bookings')}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all"
          >
            Back to Bookings
          </button>
        </div>
      </PageContainer>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button
        onClick={() => navigate('/provider-dashboard/bookings')}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
      >
        <ArrowLeft size={16} />
        Back to Bookings
      </button>

      <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-primary">{booking.customer.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">
                  {booking.customer.name}
                </h1>
                <BookingStatusBadge status={booking.bookingStatus} />
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                {booking.service.name} &middot; {booking.id}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-50">
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <CalendarDays size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-semibold text-secondary">{booking.date}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <Clock size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-sm font-semibold text-secondary">{booking.time}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <IndianRupee size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-sm font-semibold text-secondary">₹{booking.amount.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <CreditCard size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Payment</p>
            <p className="text-sm font-semibold text-secondary capitalize">{booking.paymentStatus}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DetailCard icon={MapPin} title="Location & Notes">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-gray-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-gray-400">Service Location</p>
                  <p className="text-sm font-medium text-secondary">{booking.location}</p>
                </div>
              </div>
              {booking.notes && (
                <div className="flex items-start gap-2.5 pt-3 border-t border-gray-50">
                  <FileText size={15} className="text-gray-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-gray-400">Customer Notes</p>
                    <p className="text-sm text-gray-600">{booking.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </DetailCard>

          <DetailCard icon={Wrench} title="Service Information">
            <ServiceInfo service={booking.service} />
          </DetailCard>

          <DetailCard icon={CreditCard} title="Payment Information">
            <PaymentDetails
              payment={{
                amount: booking.amount,
                method: booking.paymentMethod,
                status: booking.paymentStatus,
                transactionRef: booking.transactionRef,
              }}
            />
          </DetailCard>
        </div>

        <div className="space-y-6">
          <DetailCard icon={User} title="Customer Information">
            <CustomerInfo customer={booking.customer} />
          </DetailCard>

          <DetailCard icon={ListChecks} title="Booking Timeline">
            <BookingTimeline bookingStatus={booking.bookingStatus} />
          </DetailCard>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <BookingActions
              bookingStatus={booking.bookingStatus}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

