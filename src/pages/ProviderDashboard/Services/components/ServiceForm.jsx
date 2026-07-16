import { memo, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Info, Clock, MapPin } from 'lucide-react'
import CategorySelector from './CategorySelector'
import PricingSection from './PricingSection'
import AvailabilitySection from './AvailabilitySection'
import ServiceImageUpload from './ServiceImageUpload'
import { cn } from '../../../../utils'

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Select experience' },
  { value: '1+ years', label: '1+ years' },
  { value: '2+ years', label: '2+ years' },
  { value: '3+ years', label: '3+ years' },
  { value: '4+ years', label: '4+ years' },
  { value: '5+ years', label: '5+ years' },
  { value: '8+ years', label: '8+ years' },
  { value: '10+ years', label: '10+ years' },
]

function ServiceForm({ formData, errors, loading, onSubmit, onChange, isEdit }) {
  const handleFieldChange = useCallback((field, value) => {
    onChange({ ...formData, [field]: value })
  }, [formData, onChange])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onSubmit(formData)
  }, [formData, onSubmit])

  const sectionClass = "bg-white rounded-xl border border-gray-100 p-5"

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      <div className={sectionClass}>
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-primary" aria-hidden="true" />
          <h3 className="text-sm font-heading font-semibold text-secondary">Basic Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1.5">
              Service Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="e.g. Home Deep Cleaning"
              className={cn(
                'w-full px-3 py-2 text-sm border rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 transition-colors',
                errors.name ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary focus-visible:ring-primary/30'
              )}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CategorySelector
              value={formData.category}
              error={errors.category}
              onChange={(val) => handleFieldChange('category', val)}
            />
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-secondary mb-1.5">
                Experience Required
              </label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => handleFieldChange('experience', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-secondary mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Describe your service in detail..."
              className={cn(
                'w-full px-3 py-2 text-sm border rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 transition-colors resize-none',
                errors.description ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary focus-visible:ring-primary/30'
              )}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-secondary mb-1.5">
              Short Description
            </label>
            <input
              id="shortDescription"
              type="text"
              value={formData.shortDescription}
              onChange={(e) => handleFieldChange('shortDescription', e.target.value)}
              placeholder="Brief summary for cards (optional)"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <PricingSection formData={formData} errors={errors} onChange={onChange} />
      </div>

      <div className={sectionClass}>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-primary" aria-hidden="true" />
          <h3 className="text-sm font-heading font-semibold text-secondary">Service Details</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-secondary mb-1.5">
              Estimated Duration <span className="text-red-400">*</span>
            </label>
            <input
              id="duration"
              type="text"
              value={formData.duration}
              onChange={(e) => handleFieldChange('duration', e.target.value)}
              placeholder="e.g. 2 hours, 3 days"
              className={cn(
                'w-full px-3 py-2 text-sm border rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 transition-colors',
                errors.duration ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary focus-visible:ring-primary/30'
              )}
            />
            {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
          </div>
          <div>
            <label htmlFor="serviceArea" className="block text-sm font-medium text-secondary mb-1.5">
              <MapPin size={14} className="inline mr-1 text-gray-400" aria-hidden="true" />
              Service Area <span className="text-red-400">*</span>
            </label>
            <input
              id="serviceArea"
              type="text"
              value={formData.serviceArea}
              onChange={(e) => handleFieldChange('serviceArea', e.target.value)}
              placeholder="e.g. Mumbai, Delhi NCR"
              className={cn(
                'w-full px-3 py-2 text-sm border rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 transition-colors',
                errors.serviceArea ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary focus-visible:ring-primary/30'
              )}
            />
            {errors.serviceArea && <p className="text-xs text-red-500 mt-1">{errors.serviceArea}</p>}
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <AvailabilitySection formData={formData} errors={errors} onChange={onChange} />
      </div>

      <div className={sectionClass}>
        <ServiceImageUpload
          images={formData.images || []}
          onImagesChange={(imgs) => handleFieldChange('images', imgs)}
          error={errors.images}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-secondary bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {isEdit ? 'Save Changes' : 'Create Service'}
        </button>
      </div>
    </motion.form>
  )
}

export default memo(ServiceForm)
