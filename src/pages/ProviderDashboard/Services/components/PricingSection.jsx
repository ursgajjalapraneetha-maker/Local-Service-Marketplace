import { memo, useCallback } from 'react'
import { IndianRupee } from 'lucide-react'

const PRICING_TYPES = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'custom', label: 'Custom Quote' },
]

function PricingSection({ formData, errors, onChange }) {
  const handleChange = useCallback((field, value) => {
    onChange({ ...formData, [field]: value })
  }, [formData, onChange])

  const isCustom = formData.pricingType === 'custom'
  const isHourly = formData.pricingType === 'hourly'

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <IndianRupee size={16} className="text-primary" aria-hidden="true" />
        <h3 className="text-sm font-heading font-semibold text-secondary">Pricing</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Pricing Type</label>
          <div className="flex flex-wrap gap-2">
            {PRICING_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleChange('pricingType', value)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  formData.pricingType === value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-secondary'
                }`}
                aria-pressed={formData.pricingType === value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {!isCustom && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-secondary mb-1.5">
                {isHourly ? 'Hourly Rate' : 'Price'} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="0"
                  className={`w-full pl-8 pr-3 py-2 text-sm border rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors ${
                    errors.price ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary'
                  }`}
                />
              </div>
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="discountPrice" className="block text-sm font-medium text-secondary mb-1.5">
                Discount Price
              </label>
              <div className="relative">
                <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  id="discountPrice"
                  type="number"
                  min="0"
                  value={formData.discountPrice}
                  onChange={(e) => handleChange('discountPrice', e.target.value)}
                  placeholder="Optional"
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {isCustom && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-sm text-amber-800 font-medium">Custom Quote</p>
            <p className="text-xs text-amber-600 mt-1">Price will be quoted to customers based on their specific requirements after consultation.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(PricingSection)
