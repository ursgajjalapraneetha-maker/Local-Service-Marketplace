import { useState, useCallback } from 'react'

export default function useQuickView() {
  const [selectedService, setSelectedService] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((service) => {
    setSelectedService(service)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setSelectedService(null), 300)
  }, [])

  return { selectedService, isOpen, open, close }
}
