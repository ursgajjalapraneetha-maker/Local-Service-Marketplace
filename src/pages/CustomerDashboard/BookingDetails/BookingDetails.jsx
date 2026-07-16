import { useState, useEffect, useCallback, memo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SearchX, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

import { getBookingDetails } from './components/bookingDetailsData'
import BookingSummary from './components/BookingSummary'
import BookingStatus from './components/BookingStatus'
import BookingTimeline from './components/BookingTimeline'
import ServiceCard from './components/ServiceCard'
import ProviderCard from './components/ProviderCard'
import AddressCard from './components/AddressCard'
import PaymentSummary from './components/PaymentSummary'
import InvoiceCard from './components/InvoiceCard'
import BookingNotes from './components/BookingNotes'
import BookingActions from './components/BookingActions'
import ContactProvider from './components/ContactProvider'
import BookingDetailSkeleton from './components/BookingDetailSkeleton'

function EmptyState() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Booking Not Found
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
        The booking you are looking for does not exist or may have been removed.
        Please check the booking ID and try again.
      </p>
      <button
        onClick={() => navigate('/customer-dashboard/bookings')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
        aria-label="Return to bookings"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Bookings
      </button>
    </motion.div>
  )
}

function BookingDetails() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setData(null)

    const timer = setTimeout(() => {
      const result = getBookingDetails(bookingId)
      setData(result)
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [bookingId])

  const handleCancel = useCallback((id) => {
    setData((prev) => {
      if (!prev) return prev
      const updated = {
        ...prev,
        booking: {
          ...prev.booking,
          status: 'cancelled',
          paymentStatus: prev.booking.paymentStatus === 'paid' ? 'refunded' : prev.booking.paymentStatus,
        },
        payment: {
          ...prev.payment,
          paymentStatus: prev.payment.paymentStatus === 'paid' ? 'refunded' : prev.payment.paymentStatus,
          refundedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        },
        timeline: [
          ...prev.timeline.filter((t) => t.date),
          { status: 'cancelled', date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), label: 'Booking Cancelled', description: 'Booking was cancelled. Refund initiated.' },
        ],
      }
      return updated
    })
    toast.success('Booking cancelled successfully')
  }, [])

  const handleReschedule = useCallback((id) => {
    toast('Reschedule feature coming soon', { icon: '🔄' })
  }, [])

  if (loading) {
    return <BookingDetailSkeleton />
  }

  if (!data) {
    return <EmptyState />
  }

  const { booking, service, provider, address, payment, invoice, notes, timeline } = data

  return (
    <div className="space-y-6 pb-8">
      <BookingSummary booking={booking} service={service} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BookingStatus
            status={booking.status}
            scheduledDate={booking.scheduledDate}
            scheduledTime={booking.scheduledTime}
          />

          <BookingTimeline timeline={timeline} status={booking.status} />

          <ServiceCard service={service} booking={booking} />

          <AddressCard address={address} />

          <BookingNotes notes={notes} />

          <BookingActions
            booking={{ ...booking, serviceName: service?.name }}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
            bookingId={booking.id}
          />
        </div>

        <div className="space-y-6">
          <ProviderCard provider={provider} />

          <ContactProvider provider={provider} />

          <PaymentSummary payment={payment} />

          <InvoiceCard invoice={invoice} />
        </div>
      </div>
    </div>
  )
}

export default memo(BookingDetails)
