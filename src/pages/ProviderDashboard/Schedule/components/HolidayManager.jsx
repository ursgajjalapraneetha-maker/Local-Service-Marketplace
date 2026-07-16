import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Plus, X, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HolidayManager({ holidays, onAdd, onRemove }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', date: '', reason: '' })

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!form.name || !form.date) return
    onAdd?.({ id: `hol-${Date.now()}`, ...form })
    toast.success(`Holiday "${form.name}" added`)
    setForm({ name: '', date: '', reason: '' })
    setShowForm(false)
  }, [form, onAdd])

  const handleRemove = useCallback((id, name) => {
    onRemove?.(id)
    toast.success(`"${name}" removed`)
  }, [onRemove])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sun size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Holidays</h2>
          <span className="text-[10px] font-medium text-gray-400">({holidays.length})</span>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? 'Cancel' : 'Add Holiday'}
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
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Holiday name"
              required
              className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                required
                className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
              <input
                type="text"
                value={form.reason}
                onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
                placeholder="Reason (optional)"
                className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="w-full py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              Add Holiday
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {holidays.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-3">No holidays set</p>
        ) : (
          holidays.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between p-2.5 rounded-lg border border-blue-50 bg-blue-50/30 group"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-secondary truncate">{h.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(h.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {h.reason && <span className="ml-1.5 text-gray-300">&middot; {h.reason}</span>}
                </p>
              </div>
              <button
                onClick={() => handleRemove(h.id, h.name)}
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded p-1"
                aria-label={`Remove ${h.name}`}
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
