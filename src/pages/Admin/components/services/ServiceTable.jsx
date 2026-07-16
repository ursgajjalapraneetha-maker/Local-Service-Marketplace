import { Eye, CheckCircle, XCircle, Trash2 } from 'lucide-react'

export default function ServiceTable({ services, onView, onApprove, onReject, onDelete }) {
  if (services.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No services found matching your criteria.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <th className="p-4 font-medium whitespace-nowrap">ID</th>
            <th className="p-4 font-medium whitespace-nowrap">Title</th>
            <th className="p-4 font-medium whitespace-nowrap">Provider</th>
            <th className="p-4 font-medium whitespace-nowrap">Category</th>
            <th className="p-4 font-medium whitespace-nowrap">Price</th>
            <th className="p-4 font-medium whitespace-nowrap">Status</th>
            <th className="p-4 font-medium text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {services.map(service => (
            <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{service.id}</td>
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{service.title}</td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{service.provider}</td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{service.category}</td>
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{service.price}</td>
              <td className="p-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${service.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    service.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'}`}>
                  {service.status}
                </span>
              </td>
              <td className="p-4 text-right space-x-2 whitespace-nowrap flex items-center justify-end">
                {service.status === 'pending' && (
                  <>
                    <button onClick={() => onApprove(service)} className="p-1.5 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50" title="Approve">
                      <CheckCircle size={18} />
                    </button>
                    <button onClick={() => onReject(service)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Reject">
                      <XCircle size={18} />
                    </button>
                  </>
                )}
                <button onClick={() => onView(service)} className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="View Details">
                  <Eye size={18} />
                </button>
                <button onClick={() => onDelete(service)} className="p-1.5 text-gray-400 hover:text-danger transition-colors rounded-lg hover:bg-danger/10" title="Delete">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
