import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Building2, CreditCard, Eye, EyeOff, Smartphone } from 'lucide-react'
import toast from 'react-hot-toast'

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
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

function BankDetails({ bankDetails, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [form, setForm] = useState({ ...bankDetails })

  const handleSave = useCallback(() => {
    onUpdate?.({ ...form, accountNumber: bankDetails.accountNumber })
    setEditing(false)
    toast.success('Bank details updated')
  }, [form, bankDetails.accountNumber, onUpdate])

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-primary" aria-hidden="true" />
            <h2 className="text-base font-heading font-semibold text-secondary">Bank Details</h2>
          </div>
          <button onClick={() => setEditing(false)} className="text-xs text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1">Cancel</button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Account Holder Name', name: 'accountHolderName', required: true },
            { label: 'Bank Name', name: 'bankName', required: true },
            { label: 'Account Number', name: 'accountNumber', type: 'text', placeholder: 'Enter new account number' },
            { label: 'IFSC Code', name: 'ifscCode', required: true },
            { label: 'UPI ID', name: 'upiId' },
          ].map(({ label, name, required, type, placeholder }) => (
            <div key={name}>
              <label className="block text-xs text-gray-500 mb-0.5">{label}</label>
              <input
                type={type || 'text'}
                value={form[name] || ''}
                onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                placeholder={placeholder}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>
          ))}
          <button onClick={handleSave} className="w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">Save Bank Details</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Bank Details</h2>
        </div>
        <button onClick={() => setEditing(true)} className="text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1">Update</button>
      </div>

      <DetailRow icon={Building2} label="Account Holder" value={bankDetails?.accountHolderName} />
      <DetailRow icon={Building2} label="Bank" value={bankDetails?.bankName} />

      <div className="flex items-start gap-3 py-2.5 border-b border-gray-50">
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
          <CreditCard size={14} className="text-gray-500" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Account Number</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-secondary">
              {showAccount ? bankDetails?.accountNumber : bankDetails?.accountNumber?.replace(/\d(?=\d{4})/g, '*')}
            </p>
            <button
              onClick={() => setShowAccount(!showAccount)}
              className="text-gray-400 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded p-0.5"
              aria-label={showAccount ? 'Hide account number' : 'Show account number'}
            >
              {showAccount ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
      </div>

      <DetailRow icon={Building2} label="IFSC Code" value={bankDetails?.ifscCode} />
      <DetailRow icon={Smartphone} label="UPI ID" value={bankDetails?.upiId} />

      <div className="flex flex-wrap gap-1.5 mt-2">
        {bankDetails?.paymentMethods?.map((m) => (
          <span key={m} className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600">{m}</span>
        ))}
      </div>
    </div>
  )
}

export default memo(BankDetails)
