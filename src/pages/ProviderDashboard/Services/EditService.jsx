import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PageContainer from '../components/PageContainer'
import ServiceForm from './components/ServiceForm'
import { providerServices } from '../data/servicesData'
import LoadingSpinner from '../components/LoadingSpinner'

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

export default function EditService() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const service = providerServices.find((s) => s.id === id)
      if (service) {
        setFormData({ ...service })
      }
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [id])

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

    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success('Service updated successfully!')
      navigate('/provider-dashboard/services')
    }, 1200)
  }, [navigate])

  if (loading) {
    return (
      <PageContainer title="Edit Service" subtitle="Update your service information.">
        <LoadingSpinner fullScreen={false} text="Loading service..." />
      </PageContainer>
    )
  }

  if (!formData) {
    return (
      <PageContainer title="Edit Service" subtitle="Update your service information.">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-gray-300">?</span>
          </div>
          <h3 className="text-lg font-heading font-semibold text-secondary mb-1">Service Not Found</h3>
          <p className="text-sm text-gray-500 mb-6">The service you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/provider-dashboard/services')}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all"
          >
            Back to Services
          </button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={`Edit: ${formData.name}`}
      subtitle="Update your service information and publish changes."
    >
      <ServiceForm
        formData={formData}
        errors={errors}
        loading={saving}
        onSubmit={handleSubmit}
        onChange={handleChange}
        isEdit
      />
    </PageContainer>
  )
}
