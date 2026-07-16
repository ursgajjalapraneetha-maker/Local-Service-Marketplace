import { memo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ShieldAlert, ShieldOff, Upload, CheckCircle2, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_CONFIG = {
  verified: { icon: ShieldCheck, bg: 'bg-green-50', text: 'text-green-600', label: 'Verified', border: 'border-green-100' },
  pending: { icon: ShieldAlert, bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending Verification', border: 'border-amber-100' },
  rejected: { icon: ShieldOff, bg: 'bg-red-50', text: 'text-red-600', label: 'Rejected', border: 'border-red-100' },
}

function DocumentRow({ doc, index }) {
  const docStatus = STATUS_CONFIG[doc.status] || STATUS_CONFIG.pending
  const DIcon = docStatus.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-8 h-8 rounded-lg ${docStatus.bg} flex items-center justify-center shrink-0`}>
          <DIcon size={14} className={docStatus.text} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-secondary truncate">{doc.name}</p>
          <p className="text-[10px] text-gray-400">
            {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} &middot; Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </p>
        </div>
      </div>
      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${docStatus.bg} ${docStatus.text}`}>
        {docStatus.label}
      </span>
    </motion.div>
  )
}

function KYCVerification({ verification, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)
  const statusConfig = STATUS_CONFIG[verification?.kycStatus] || STATUS_CONFIG.pending
  const SIcon = statusConfig.icon

  const handleUpload = useCallback((e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      files.forEach((f) => onUpload?.({ id: `doc-${Date.now()}`, name: f.name, type: 'document', status: 'pending', uploadedAt: new Date().toISOString().split('T')[0] }))
      toast.success(`${files.length} document${files.length > 1 ? 's' : ''} uploaded for verification`)
    }, 1000)
    e.target.value = ''
  }, [onUpload])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">KYC Verification</h2>
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
          <SIcon size={12} aria-hidden="true" />
          {statusConfig.label}
        </div>
      </div>

      <div className={`p-3 rounded-lg border mb-4 ${statusConfig.border} ${statusConfig.bg}/30`}>
        <p className="text-xs text-gray-600">
          {verification?.kycStatus === 'verified'
            ? 'Your identity has been verified. All documents are approved.'
            : verification?.kycStatus === 'rejected'
            ? 'Some documents were rejected. Please re-upload the required documents.'
            : 'Please upload the required documents for KYC verification.'}
        </p>
      </div>

      <div className="space-y-2 mb-4">
        {verification?.documents?.map((doc, i) => (
          <DocumentRow key={doc.id} doc={doc} index={i} />
        ))}
      </div>

      <input ref={inputRef} type="file" multiple accept="image/*,.pdf" onChange={handleUpload} className="hidden" aria-label="Upload documents" />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-primary border-2 border-dashed border-primary/30 rounded-xl hover:bg-primary/5 transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? 'Uploading...' : 'Upload New Document'}
      </button>
    </div>
  )
}

export default memo(KYCVerification)
