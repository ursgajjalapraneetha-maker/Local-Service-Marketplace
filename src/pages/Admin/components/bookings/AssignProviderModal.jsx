import { useState } from 'react'
import { X } from 'lucide-react'

const DUMMY_PROVIDERS = [
  'Provider Alpha', 'Provider Beta', 'CleanPros Co.', 'John Doe Services'
]

export default function AssignProviderModal({ booking, onClose, onAssign }) {
  const [selectedProvider, setSelectedProvider] = useState('')

  if (!booking) return null

  const handleAssign = () => {
    if (selectedProvider) {
      onAssign(booking.id, selectedProvider)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Assign Provider</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-500">
            Select a provider for booking <span className="font-medium text-gray-900">{booking.id}</span>.
          </p>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Available Providers</label>
            <select 
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
            >
              <option value="" disabled>Select provider...</option>
              {DUMMY_PROVIDERS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button 
            onClick={handleAssign} 
            disabled={!selectedProvider}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-opacity"
          >
            Assign Provider
          </button>
        </div>
      </div>
    </div>
  )
}
