import { Eye, CheckCircle, XCircle, Trash2, Star } from 'lucide-react'

export default function ProviderTable({ providers, onView, onApprove, onReject, onDelete }) {
  if (providers.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No providers found matching your criteria.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <th className="p-4 font-medium whitespace-nowrap">ID</th>
            <th className="p-4 font-medium whitespace-nowrap">Provider Info</th>
            <th className="p-4 font-medium whitespace-nowrap">Service</th>
            <th className="p-4 font-medium whitespace-nowrap">Rating</th>
            <th className="p-4 font-medium whitespace-nowrap">Verification</th>
            <th className="p-4 font-medium whitespace-nowrap">Status</th>
            <th className="p-4 font-medium text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {providers.map(provider => (
            <tr key={provider.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{provider.id}</td>
              <td className="p-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{provider.name}</span>
                  <span className="text-xs text-gray-500">{provider.email}</span>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-800 whitespace-nowrap">{provider.service}</td>
              <td className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  {provider.rating}
                </div>
              </td>
              <td className="p-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${provider.verification === 'verified' ? 'bg-green-100 text-green-700' : 
                    provider.verification === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'}`}>
                  {provider.verification}
                </span>
              </td>
              <td className="p-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${provider.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                  {provider.status}
                </span>
              </td>
              <td className="p-4 text-right space-x-2 whitespace-nowrap flex items-center justify-end">
                {provider.verification === 'pending' && (
                  <>
                    <button onClick={() => onApprove(provider)} className="p-1.5 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50" title="Approve">
                      <CheckCircle size={18} />
                    </button>
                    <button onClick={() => onReject(provider)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Reject">
                      <XCircle size={18} />
                    </button>
                  </>
                )}
                <button onClick={() => onView(provider)} className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="View Profile">
                  <Eye size={18} />
                </button>
                <button onClick={() => onDelete(provider)} className="p-1.5 text-gray-400 hover:text-danger transition-colors rounded-lg hover:bg-danger/10" title="Delete">
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
