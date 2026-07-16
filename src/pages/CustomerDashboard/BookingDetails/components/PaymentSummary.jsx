import { memo } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Tag,
  Percent,
  Receipt,
  Banknote,
  Shield,
} from 'lucide-react'

function PaymentRow({ label, amount, isNegative }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${
        isNegative ? 'text-success' : 'text-gray-900 dark:text-white'
      }`}>
        {isNegative ? '-' : ''}₹{amount?.toFixed(2) || '0.00'}
      </span>
    </div>
  )
}

function PaymentSummary({ payment }) {
  if (!payment) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Payment Summary
        </h3>
        <div className="space-y-3">
          <PaymentRow label="Service Price" amount={payment.servicePrice} />
          {payment.additionalCharges > 0 && (
            <PaymentRow label="Additional Charges" amount={payment.additionalCharges} />
          )}
          {payment.discount > 0 && (
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5 text-sm text-success">
                <Tag className="w-3.5 h-3.5" />
                Discount {payment.couponCode ? `(${payment.couponCode})` : ''}
              </span>
              <span className="text-sm font-medium text-success">
                -₹{payment.discount?.toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
          <div className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Percent className="w-3.5 h-3.5" />
              Taxes
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ₹{payment.taxes?.toFixed(2) || '0.00'}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-3.5 h-3.5" />
              Platform Fee
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ₹{payment.platformFee?.toFixed(2) || '0.00'}
            </span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 my-2" />
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Total Amount
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{payment.totalAmount?.toFixed(2) || '0.00'}
            </span>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
          <div className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <CreditCard className="w-3.5 h-3.5" />
              Payment Method
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {payment.paymentMethod || 'Not paid yet'}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Banknote className="w-3.5 h-3.5" />
              Payment Status
            </span>
            <span className={`text-sm font-medium ${
              payment.paymentStatus === 'paid' ? 'text-success' :
              payment.paymentStatus === 'unpaid' ? 'text-warning' :
              payment.paymentStatus === 'refunded' ? 'text-danger' :
              'text-gray-500'
            }`}>
              {payment.paymentStatus === 'paid' && 'Paid'}
              {payment.paymentStatus === 'unpaid' && 'Unpaid'}
              {payment.paymentStatus === 'refunded' && 'Refunded'}
              {payment.paymentStatus === 'partially_refunded' && 'Partially Refunded'}
            </span>
          </div>
          {payment.paidOn && (
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Receipt className="w-3.5 h-3.5" />
                Paid On
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {payment.paidOn}
              </span>
            </div>
          )}
          {payment.refundedOn && (
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Receipt className="w-3.5 h-3.5" />
                Refunded On
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {payment.refundedOn}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(PaymentSummary)
