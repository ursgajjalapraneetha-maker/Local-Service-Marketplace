import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarX, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'

const TYPE_STYLES = {
  full: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Full Day' },
  half: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Half Day' },
}

const STATUS_STYLES = {
  approved: { bg: 'bg-green-50', text: 'text-green-600' },
  pending: { bg: 'bg-gray-100', text: 'text-gray-500' },
  rejected: { bg: 'bg-red-50', text: 'text-red-600' },
}

export default function LeaveManager({ leaves, onAdd }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ startDate: '', endDate: '', reason: '', type: 'full' })

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!form.startDate || !form.reason) return
    onAdd?.({ id: `lv-${Date.now()}`, ...form, status: 'pending' })
    toast.success('Leave request submitted')
    setForm({ startDate: '', endDate: '', reason: '', type: 'full' })
    setShowForm(false)
  }, [form, onAdd])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarX size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Leave</h2>
          <span className="text-[10px] font-medium text-gray-400">({leaves.length})</span>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? 'Cancel' : 'Request Leave'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-2.5 mb-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-gray-500 mb-0.5">Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                  required
                  className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 mb-0.5">End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
              </div>
            </div>
            <input
              type="text"
              value={form.reason}
              onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
              placeholder="Reason for leave"
              required
              className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <div className="flex gap-2">
              {['full', 'half'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: t }))}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    form.type === t
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {t === 'full' ? 'Full Day' : 'Half Day'}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              Submit Leave Request
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {leaves.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-3">No leave records</p>
        ) : (
          leaves.map((lv, i) => {
            const typeStyle = TYPE_STYLES[lv.type] || TYPE_STYLES.full
            const statusStyle = STATUS_STYLES[lv.status] || STATUS_STYLES.pending
            return (
              <motion.div
                key={lv.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-secondary truncate">{lv.reason}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(lv.startDate + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    {lv.startDate !== lv.endDate && (
                      <> - {new Date(lv.endDate + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeStyle.bg} ${typeStyle.text}`}>
                    {typeStyle.label}
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text}`}>
                    {lv.status.charAt(0).toUpperCase() + lv.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
