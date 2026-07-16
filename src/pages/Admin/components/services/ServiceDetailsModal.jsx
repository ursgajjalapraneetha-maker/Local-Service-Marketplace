import { X, User, Tags, DollarSign, Calendar, Activity, Info } from 'lucide-react'

export default function ServiceDetailsModal({ service, onClose }) {
  if (!service) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Service Details</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
            <p className="text-sm text-gray-500">{service.id}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><User size={14}/> Provider</label>
              <p className="text-sm text-gray-900 font-medium">{service.provider}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Tags size={14}/> Category</label>
              <p className="text-sm text-gray-900 font-medium">{service.category}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><DollarSign size={14}/> Price</label>
              <p className="text-sm text-gray-900 font-medium">{service.price}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Activity size={14}/> Status</label>
              <p className={`text-sm font-medium capitalize ${
                service.status === 'approved' ? 'text-green-600' :
                service.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
              }`}>{service.status}</p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Calendar size={14}/> Created At</label>
              <p className="text-sm text-gray-900 font-medium">{service.createdAt}</p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Info size={14}/> Description</label>
              <p className="text-sm text-gray-600 mt-1">This is a dummy description for {service.title}. It includes details about what is included, what to expect, and any terms of service specifically related to this offering provided by {service.provider}.</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
