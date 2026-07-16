import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ServiceGallery({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded, setLoaded] = useState({})

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleLoad = useCallback((idx) => {
    setLoaded((prev) => ({ ...prev, [idx]: true }))
  }, [])

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/10] bg-gray-100 rounded-t-2xl flex items-center justify-center text-gray-400 text-sm">
        No images available
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-t-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onLoad={() => handleLoad(currentIndex)}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-700 hover:bg-white hover:text-primary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-700 hover:bg-white hover:text-primary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-primary opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Select image ${idx + 1}`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(ServiceGallery)
