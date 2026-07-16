import { memo, useCallback } from 'react'
import { serviceCategories } from '../../data/servicesData'

function CategorySelector({ value, error, onChange }) {
  const handleChange = useCallback((e) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-secondary mb-1.5">
        Category <span className="text-red-400">*</span>
      </label>
      <select
        id="category"
        value={value}
        onChange={handleChange}
        className={`w-full px-3 py-2 text-sm border rounded-lg text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors ${
          error ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary'
        } ${!value ? 'text-gray-400' : ''}`}
      >
        <option value="" disabled>Select a category</option>
        {serviceCategories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default memo(CategorySelector)
