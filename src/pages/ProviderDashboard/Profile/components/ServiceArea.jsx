import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'

function ServiceArea({ serviceArea, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [cities, setCities] = useState(serviceArea?.cities || [])
  const [radius, setRadius] = useState(serviceArea?.radius || 25)
  const [newCity, setNewCity] = useState('')

  const addCity = useCallback(() => {
    const trimmed = newCity.trim()
    if (!trimmed || cities.includes(trimmed)) return
    setCities((prev) => [...prev, trimmed])
    setNewCity('')
  }, [newCity, cities])

  const removeCity = useCallback((city) => {
    setCities((prev) => prev.filter((c) => c !== city))
  }, [])

  const handleSave = useCallback(() => {
    onUpdate?.({ ...serviceArea, cities, radius })
    setEditing(false)
    toast.success('Service area updated')
  }, [cities, radius, serviceArea, onUpdate])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Service Area</h2>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1"
        >
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {editing ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCity())}
              placeholder="Add a city..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <button onClick={addCity} className="p-1.5 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
              <Plus size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {cities.map((city) => (
              <span key={city} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-xs font-medium text-secondary">
                {city}
                <button onClick={() => removeCity(city)} className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Service Radius (km)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-semibold text-secondary w-10 text-right">{radius}</span>
            </div>
          </div>

          <button onClick={handleSave} className="w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
            Save Service Area
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {serviceArea?.cities?.map((city) => (
              <span key={city} className="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium">{city}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Navigation size={12} aria-hidden="true" />
            <span>Service radius: <strong className="text-secondary">{serviceArea?.radius} km</strong></span>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(ServiceArea)
