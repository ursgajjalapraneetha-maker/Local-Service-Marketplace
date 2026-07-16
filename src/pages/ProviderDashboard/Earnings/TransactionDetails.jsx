import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  IndianRupee,
  CalendarDays,
  User,
  Wrench,
  CreditCard,
  Hash,
  FileText,
  Link,
  CheckCircle,
} from 'lucide-react'
import { transactions } from '../data/earningsData'
import LoadingSpinner from '../components/LoadingSpinner'
import PaymentStatusBadge from './components/PaymentStatusBadge'

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-gray-500" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-secondary">{value || 'Not provided'}</p>
      </div>
    </div>
  )
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-primary" aria-hidden="true" />
        <h3 className="text-sm font-heading font-semibold text-secondary">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function TransactionDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [txn, setTxn] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = transactions.find((t) => t.id === id)
      setTxn(found || null)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner fullScreen={false} text="Loading transaction details..." />
      </div>
    )
  }

  if (!txn) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
          <IndianRupee size={28} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary mb-1">Transaction Not Found</h3>
        <p className="text-sm text-gray-500 mb-6">The transaction you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/provider-dashboard/earnings')}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all"
        >
          Back to Earnings
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button
        onClick={() => navigate('/provider-dashboard/earnings')}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
      >
        <ArrowLeft size={16} />
        Back to Earnings
      </button>

      <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <IndianRupee size={24} className="text-green-600" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">
                  ₹{txn.amount.toLocaleString()}
                </h1>
                <PaymentStatusBadge status={txn.status} />
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                {txn.service} &middot; {txn.id}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-50">
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <CalendarDays size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-semibold text-secondary">{txn.date}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <User size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Customer</p>
            <p className="text-sm font-semibold text-secondary">{txn.customer}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <CreditCard size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Method</p>
            <p className="text-sm font-semibold text-secondary">{txn.paymentMethod}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <CheckCircle size={16} className="mx-auto text-gray-400 mb-1" aria-hidden="true" />
            <p className="text-xs text-gray-500">Net Amount</p>
            <p className="text-sm font-semibold text-secondary">₹{txn.netAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard icon={FileText} title="Transaction Information">
          <div className="divide-y divide-gray-50">
            <DetailRow icon={Hash} label="Transaction ID" value={txn.id} />
            <DetailRow icon={CalendarDays} label="Date" value={txn.date} />
            <DetailRow icon={IndianRupee} label="Gross Amount" value={`₹${txn.amount.toLocaleString()}`} />
            <DetailRow icon={IndianRupee} label="Platform Fee" value={`-₹${txn.fee.toLocaleString()}`} />
            <DetailRow icon={CheckCircle} label="Net Amount" value={`₹${txn.netAmount.toLocaleString()}`} />
            <DetailRow icon={FileText} label="Status" value={txn.status === 'completed' ? 'Completed' : txn.status === 'pending' ? 'Pending' : txn.status === 'failed' ? 'Failed' : 'Refunded'} />
          </div>
        </SectionCard>

        <SectionCard icon={Wrench} title="Service Information">
          <div className="divide-y divide-gray-50">
            <DetailRow icon={Wrench} label="Service" value={txn.service} />
            <DetailRow icon={User} label="Customer" value={txn.customer} />
            <DetailRow icon={Link} label="Booking Reference" value={txn.bookingRef || 'Not linked'} />
          </div>
        </SectionCard>

        <SectionCard icon={CreditCard} title="Payment Information">
          <div className="divide-y divide-gray-50">
            <DetailRow icon={CreditCard} label="Payment Method" value={txn.paymentMethod} />
            <DetailRow icon={Hash} label="Gateway Reference" value={txn.gatewayRef || 'Cash payment'} />
            <DetailRow icon={Hash} label="Transaction ID" value={txn.id} />
          </div>
        </SectionCard>
      </div>
    </motion.div>
  )
}
