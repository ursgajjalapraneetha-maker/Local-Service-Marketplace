import { memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

function ServiceImageUpload({ images = [], onImagesChange, error }) {
  const handleFileSelect = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from(e.target.files)
      const newImages = files.map((file) => URL.createObjectURL(file))
      onImagesChange([...images, ...newImages])
    }
    input.click()
  }, [images, onImagesChange])

  const handleRemove = useCallback((index) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }, [images, onImagesChange])

  return (
    <div>
      <label className="block text-sm font-semibold text-secondary mb-2">
        Service Images
      </label>
      <div className="flex flex-wrap gap-3">
        <AnimatePresence>
          {images.map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 group"
            >
              <img
                src={src}
                alt={`Service image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
                aria-label={`Remove image ${i + 1}`}
              >
                <X size={10} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleFileSelect}
          className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary/40 hover:bg-primary/5 flex flex-col items-center justify-center gap-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Upload size={18} className="text-gray-300" aria-hidden="true" />
          <span className="text-[10px] text-gray-400 font-medium">Upload</span>
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
      <p className="text-xs text-gray-400 mt-2">Upload up to 5 images. Supported formats: JPG, PNG, WebP.</p>
    </div>
  )
}

export default memo(ServiceImageUpload)
