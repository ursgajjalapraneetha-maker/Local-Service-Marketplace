import { memo, useState, useCallback } from 'react'
import { ImageOff } from 'lucide-react'

const FALLBACK = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=60'

function ServiceImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => {
    setError(true)
    setLoaded(true)
  }, [])

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      )}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-300">
          <ImageOff size={24} />
        </div>
      ) : (
        <img
          src={src || FALLBACK}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}

export default memo(ServiceImage)
