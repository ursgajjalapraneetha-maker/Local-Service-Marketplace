import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  earningsOverview,
  walletData,
  transactions,
  withdrawals,
  invoices,
} from '../data/earningsData'
import PageContainer from '../components/PageContainer'
import EarningsStats from './components/EarningsStats'
import RevenueChart from './components/RevenueChart'
import WalletCard from './components/WalletCard'
import TransactionTable from './components/TransactionTable'
import TransactionCard from './components/TransactionCard'
import TransactionFilters from './components/TransactionFilters'
import WithdrawalSection from './components/WithdrawalSection'
import WithdrawalHistory from './components/WithdrawalHistory'
import InvoiceCard from './components/InvoiceCard'
import EmptyTransactions from './components/EmptyTransactions'

const DEFAULT_FILTERS = { search: '', status: 'all', dateRange: 'all' }

function filterByDateRange(items, range) {
  if (range === 'all') return items
  const now = new Date()
  const start = new Date(now)
  if (range === 'today') {
    start.setHours(0, 0, 0, 0)
    const end = new Date(start); end.setDate(end.getDate() + 1)
    return items.filter((i) => { const d = new Date(i.date); return d >= start && d < end })
  }
  if (range === 'week') {
    start.setDate(start.getDate() - start.getDay())
    start.setHours(0, 0, 0, 0)
    const end = new Date(start); end.setDate(end.getDate() + 7)
    return items.filter((i) => { const d = new Date(i.date); return d >= start && d < end })
  }
  if (range === 'month') {
    start.setDate(1); start.setHours(0, 0, 0, 0)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
    return items.filter((i) => { const d = new Date(i.date); return d >= start && d < end })
  }
  return items
}

export default function Earnings() {
  const [loading, setLoading] = useState(true)
  const [txnFilters, setTxnFilters] = useState(DEFAULT_FILTERS)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const filteredTransactions = useMemo(() => {
    let result = [...transactions]
    if (txnFilters.search) {
      const q = txnFilters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.service.toLowerCase().includes(q) ||
          t.customer.toLowerCase().includes(q)
      )
    }
    if (txnFilters.status !== 'all') {
      result = result.filter((t) => t.status === txnFilters.status)
    }
    if (txnFilters.dateRange !== 'all') {
      result = filterByDateRange(result, txnFilters.dateRange)
    }
    return result
  }, [txnFilters])

  const handleFilterChange = useCallback((newFilters) => {
    setTxnFilters(newFilters)
  }, [])

  const handleWithdraw = useCallback(() => {
    const el = document.getElementById('withdraw-section')
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleWithdrawSuccess = useCallback(() => {
    toast.success('Withdrawal request submitted')
  }, [])

  if (loading) {
    return (
      <PageContainer title="My Earnings" subtitle="Track your revenue, payments and financial performance.">
        <div className="space-y-4" role="status" aria-label="Loading earnings">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
                <div className="h-10 w-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" />
                <div className="h-8 w-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
                <div className="h-3 w-20 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-64 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl" />
            <div className="h-64 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl" />
          </div>
          <span className="sr-only">Loading earnings...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="My Earnings"
      subtitle="Track your revenue, payments and financial performance."
    >
      <div className="space-y-6">
        <EarningsStats stats={earningsOverview} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <WalletCard wallet={walletData} onWithdraw={handleWithdraw} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee size={16} className="text-primary" aria-hidden="true" />
                <h2 className="text-base font-heading font-semibold text-secondary">Transactions</h2>
              </div>
              <TransactionFilters filters={txnFilters} onFilterChange={handleFilterChange} />

              <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 mb-3">
                <span className="font-semibold text-secondary">{filteredTransactions.length}</span>
                transaction{filteredTransactions.length !== 1 ? 's' : ''} found
              </div>

              {filteredTransactions.length === 0 ? (
                <EmptyTransactions hasFilters={txnFilters.search || txnFilters.status !== 'all' || txnFilters.dateRange !== 'all'} />
              ) : (
                <>
                  <div className="hidden sm:block mt-3">
                    <TransactionTable transactions={filteredTransactions} />
                  </div>
                  <div className="sm:hidden space-y-3 mt-3">
                    {filteredTransactions.map((txn, i) => (
                      <TransactionCard key={txn.id} transaction={txn} index={i} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div id="withdraw-section" className="bg-white rounded-xl border border-gray-100 p-5 scroll-mt-24">
              <WithdrawalSection wallet={walletData} onSuccess={handleWithdrawSuccess} />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee size={16} className="text-primary" aria-hidden="true" />
                <h2 className="text-base font-heading font-semibold text-secondary">Withdrawal History</h2>
              </div>
              <WithdrawalHistory withdrawals={withdrawals} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <IndianRupee size={16} className="text-primary" aria-hidden="true" />
            <h2 className="text-base font-heading font-semibold text-secondary">Recent Invoices</h2>
          </div>
          <div className="space-y-1">
            {invoices.map((inv, i) => (
              <InvoiceCard key={inv.id} invoice={inv} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
