import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PaymentsHeader from './components/PaymentsHeader'
import PaymentSummary from './components/PaymentSummary'
import PaymentToolbar from './components/PaymentToolbar'
import PaymentTable from './components/PaymentTable'
import InvoiceModal from './components/InvoiceModal'
import PaymentSkeleton from './components/PaymentSkeleton'
import PAYMENTS_DATA, { INVOICES_DATA } from './components/paymentsData'

const LS_PAYMENTS_KEY = 'local_marketplace_payments'

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(LS_PAYMENTS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return PAYMENTS_DATA
}

function saveToStorage(data) {
  try {
    localStorage.setItem(LS_PAYMENTS_KEY, JSON.stringify(data))
  } catch {}
}

function computeSummary(items) {
  const total = items.length
  const completed = items.filter((p) => p.status === 'completed').length
  const pending = items.filter((p) => p.status === 'pending').length
  const refunded = items
    .filter((p) => p.status === 'refunded')
    .reduce((sum, p) => sum + p.amount, 0)
  return { total, completed, pending, refunded }
}

export default function Payments() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [sortValue, setSortValue] = useState('newest')
  const [payments, setPayments] = useState([])
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const initialized = useRef(false)

  useEffect(() => {
    setPayments(loadFromStorage())
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (initialized.current) {
      saveToStorage(payments)
    }
  }, [payments])

  useEffect(() => {
    initialized.current = true
  }, [])

  const filteredPayments = useMemo(() => {
    let result = [...payments]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.bookingId.toLowerCase().includes(q) ||
          p.serviceName.toLowerCase().includes(q) ||
          p.provider.toLowerCase().includes(q)
      )
    }

    if (statusFilter) {
      result = result.filter((p) => p.status === statusFilter)
    }

    if (dateFilter) {
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      result = result.filter((p) => {
        const pDate = new Date(p.date)
        if (dateFilter === 'this_month') {
          return pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear
        }
        if (dateFilter === 'last_month') {
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
          return pDate.getMonth() === lastMonth && pDate.getFullYear() === lastMonthYear
        }
        return true
      })
    }

    result.sort((a, b) => {
      switch (sortValue) {
        case 'oldest': return new Date(a.date) - new Date(b.date)
        case 'amount_high': return b.amount - a.amount
        case 'amount_low': return a.amount - b.amount
        default: return new Date(b.date) - new Date(a.date)
      }
    })

    return result
  }, [payments, searchQuery, statusFilter, dateFilter, sortValue])

  const summary = useMemo(() => computeSummary(payments), [payments])

  const handleViewInvoice = useCallback((payment) => {
    const invoice = INVOICES_DATA.find((inv) => inv.id === payment.id)
    if (invoice) setSelectedInvoice(invoice)
  }, [])

  const handleCloseInvoice = useCallback(() => {
    setSelectedInvoice(null)
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('')
    setDateFilter('')
    setSortValue('newest')
  }, [])

  if (loading) return <PaymentSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PaymentsHeader />

      <PaymentSummary summary={summary} />

      <PaymentToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        onStatusChange={setStatusFilter}
        onDateChange={setDateFilter}
        onResetFilters={handleResetFilters}
        sortValue={sortValue}
        onSortChange={setSortValue}
        resultsCount={filteredPayments.length}
      />

      <PaymentTable
        payments={filteredPayments}
        onViewInvoice={handleViewInvoice}
      />

      <InvoiceModal
        invoice={selectedInvoice}
        isOpen={!!selectedInvoice}
        onClose={handleCloseInvoice}
      />
    </motion.div>
  )
}
