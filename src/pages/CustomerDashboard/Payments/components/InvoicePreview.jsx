import { memo } from 'react'
import { Building2, User, IndianRupee, Hash, CalendarDays } from 'lucide-react'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function InvoicePreview({ invoice }) {
  if (!invoice) return null

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={18} className="text-primary" aria-hidden="true" />
            <span className="text-lg font-heading font-bold text-secondary">LocalServices</span>
          </div>
          <p className="text-xs text-gray-500">Invoice #<span className="font-mono font-medium text-gray-700">{invoice.invoiceNumber}</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Date</p>
          <p className="text-sm font-medium text-secondary">{formatDate(invoice.date)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <User size={13} className="text-gray-400" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Bill To</span>
          </div>
          <p className="text-sm font-medium text-secondary">{invoice.customerName}</p>
          <p className="text-xs text-gray-500">{invoice.customerEmail}</p>
          <p className="text-xs text-gray-500 mt-1">{invoice.customerAddress}</p>
        </div>
        <div className="sm:text-right">
          <div className="flex items-center gap-1.5 mb-2 sm:justify-end">
            <Building2 size={13} className="text-gray-400" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Provider</span>
          </div>
          <p className="text-sm font-medium text-secondary">{invoice.provider}</p>
          <p className="text-xs text-gray-500">{invoice.serviceName}</p>
        </div>
      </div>

      <table className="w-full text-sm mt-4">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Description</th>
            <th className="text-right pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-50">
            <td className="py-3">
              <p className="text-sm font-medium text-secondary">{invoice.serviceName}</p>
              <p className="text-xs text-gray-400">Booking ID: {invoice.bookingId}</p>
            </td>
            <td className="py-3 text-right">
              <span className="text-sm font-medium text-secondary">
                <IndianRupee size={11} className="inline" />
                {invoice.subtotal?.toLocaleString()}
              </span>
            </td>
          </tr>
          <tr className="border-b border-gray-50">
            <td className="py-2 text-sm text-gray-500">GST (18%)</td>
            <td className="py-2 text-right text-sm text-gray-500">
              <IndianRupee size={11} className="inline" />
              {invoice.tax?.toLocaleString()}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="pt-3 text-sm font-semibold text-secondary">Total</td>
            <td className="pt-3 text-right text-lg font-heading font-bold text-primary">
              <IndianRupee size={14} className="inline" />
              {invoice.total?.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <Hash size={12} className="text-gray-400" aria-hidden="true" />
          <span>Transaction: <span className="font-mono text-gray-600">{invoice.transactionId}</span></span>
        </div>
        <div className="flex items-center gap-1.5 sm:justify-end">
          <CalendarDays size={12} className="text-gray-400" aria-hidden="true" />
          <span>Payment: {formatDate(invoice.date)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-gray-600">Method:</span>
          <span>{invoice.paymentMethod}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:justify-end">
          <span className="font-medium text-gray-600">GST:</span>
          <span className="font-mono text-gray-600">{invoice.gst}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(InvoicePreview)
