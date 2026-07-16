import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PageContainer from '../components/PageContainer'
import ServiceForm from './components/ServiceForm'
import { emptyServiceForm } from '../data/servicesData'

function validate(formData) {
  const errors = {}
  if (!formData.name.trim()) errors.name = 'Service name is required'
  if (!formData.category) errors.category = 'Please select a category'
  if (!formData.description.trim()) errors.description = 'Description is required'
  if (!formData.price && formData.pricingType !== 'custom') {
    errors.price = 'Price is required'
  } else if (formData.price < 0) {
    errors.price = 'Price must be positive'
  }
  if (!formData.duration.trim() && formData.pricingType !== 'custom') errors.duration = 'Duration is required'
  if (!formData.serviceArea.trim()) errors.serviceArea = 'Service area is required'
  if (!formData.workingDays || formData.workingDays.length === 0) {
    errors.workingDays = 'Select at least one working day'
  }
  return errors
}

export default function AddService() {
  const [formData, setFormData] = useState(emptyServiceForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = useCallback((updated) => {
    setFormData(updated)
    setErrors({})
  }, [])

  const handleSubmit = useCallback((data) => {
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix the form errors before submitting')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Service created successfully!')
      navigate('/provider-dashboard/services')
    }, 1200)
  }, [navigate])

  return (
    <PageContainer
      title="Add New Service"
      subtitle="Create a new service to offer on the marketplace."
    >
      <ServiceForm
        formData={formData}
        errors={errors}
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </PageContainer>
  )
}
