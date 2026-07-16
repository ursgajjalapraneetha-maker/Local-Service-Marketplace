import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  User,
  Star,
  CalendarCheck,
  Clock,
  MessageSquare,
  IndianRupee,
  Wrench,
  BarChart3,
  ClipboardList,
} from 'lucide-react'
import { providerCustomers, getCustomerStats } from '../data/customersData'
import PageContainer from '../components/PageContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import CustomerProfile from './components/CustomerProfile'
import BookingHistory from './components/BookingHistory'
import CustomerReviews from './components/CustomerReviews'
import RatingOverview from './components/RatingOverview'
import ContactCustomer from './components/ContactCustomer'
import { cn, formatCurrency } from '../../../utils'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-50">
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', color)}>
        <Icon size={18} aria-hidden="true" />
      </div>
      <div>
        <p className="text-xl font-heading font-bold text-secondary">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  )
}

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

export default function CustomerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = providerCustomers.find((c) => c.id === id)
      setCustomer(found || null)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [id])

  const stats = useMemo(() => (customer ? getCustomerStats(customer) : null), [customer])

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner fullScreen={false} text="Loading customer details..." />
      </div>
    )
  }

  if (!customer) {
    return (
      <PageContainer title="Customer Details">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
            <User size={28} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-secondary mb-1">Customer Not Found</h3>
          <p className="text-sm text-gray-500 mb-6">The customer you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/provider-dashboard/customers')}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all"
          >
            Back to Customers
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
        onClick={() => navigate('/provider-dashboard/customers')}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
      >
        <ArrowLeft size={16} />
        Back to Customers
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center shrink-0 ring-4 ring-primary/10">
                  <span className="text-xl font-bold text-primary">{customer.name.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">{customer.name}</h1>
                  <p className="text-sm text-gray-500 mt-0.5">{customer.location}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/provider-dashboard/customers/${customer.id}`)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <MessageSquare size={15} />
                Send Message
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={CalendarCheck} label="Total Bookings" value={stats.total} color="bg-blue-50 text-blue-600" />
            <StatCard icon={BarChart3} label="Completed" value={stats.completed} color="bg-green-50 text-green-600" />
            <StatCard icon={IndianRupee} label="Total Spent" value={formatCurrency(stats.spent)} color="bg-amber-50 text-amber-600" />
            <StatCard icon={Star} label="Avg. Rating" value={stats.rating > 0 ? stats.rating : '—'} color="bg-purple-50 text-purple-600" />
          </div>

          <DetailCard icon={ClipboardList} title="Booking History">
            <BookingHistory customerName={customer.name} />
          </DetailCard>

          <DetailCard icon={Star} title={`Reviews (${customer.reviews.length})`}>
            <CustomerReviews reviews={customer.reviews} />
          </DetailCard>
        </div>

        <div className="space-y-6">
          <DetailCard icon={User} title="Customer Profile">
            <CustomerProfile customer={customer} />
          </DetailCard>

          {customer.reviews.length > 0 && (
            <DetailCard icon={Star} title="Rating Breakdown">
              <RatingOverview
                rating={customer.rating}
                totalReviews={customer.reviews.length}
                reviews={customer.reviews}
              />
            </DetailCard>
          )}

          <DetailCard icon={MessageSquare} title="Contact Customer">
            <ContactCustomer customer={customer} />
          </DetailCard>
        </div>
      </div>
    </motion.div>
  )
}
