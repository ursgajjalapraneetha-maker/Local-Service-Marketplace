import { memo, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Paperclip, X, FileText, Image, Loader2 } from 'lucide-react'

function AttachmentUpload({ onAttach }) {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleSelect = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleChange = useCallback((e) => {
    const selected = Array.from(e.target.files)
    if (selected.length === 0) return
    setUploading(true)
    const items = selected.map((f) => ({
      id: `att-${Date.now()}-${f.name}`,
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
    }))
    setTimeout(() => {
      setFiles((prev) => [...prev, ...items])
      setUploading(false)
      items.forEach((item) => onAttach?.(item))
    }, 600)
    e.target.value = ''
  }, [onAttach])

  const handleRemove = useCallback((id) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id)
      if (item?.preview) URL.revokeObjectURL(item.preview)
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  return (
    <div className="shrink-0">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
        aria-label="Select files"
      />

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pt-2 space-y-1.5"
          >
            {files.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-100"
              >
                {f.preview ? (
                  <img src={f.preview} alt={f.name} className="w-7 h-7 rounded object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center">
                    <FileText size={12} className="text-blue-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-secondary truncate">{f.name}</p>
                  <p className="text-[9px] text-gray-400">{formatSize(f.size)}</p>
                </div>
                <button
                  onClick={() => handleRemove(f.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded p-0.5"
                  aria-label={`Remove ${f.name}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleSelect}
        disabled={uploading}
        className="shrink-0 w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Attach file"
        title="Attach file"
      >
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Paperclip size={16} />}
      </motion.button>
    </div>
  )
}

export default memo(AttachmentUpload)
