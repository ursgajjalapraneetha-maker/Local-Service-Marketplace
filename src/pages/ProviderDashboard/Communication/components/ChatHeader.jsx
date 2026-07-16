import { memo } from 'react'
import { User, ArrowLeft, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ChatHeader({ conversation }) {
  const navigate = useNavigate()
  const { customer, service, bookingRef, status } = conversation

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
      <button
        onClick={() => navigate('/provider-dashboard/messages')}
        className="lg:hidden p-1 -ml-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Back to conversations"
      >
        <ArrowLeft size={18} className="text-gray-500" />
      </button>

      <div className="relative shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <User size={16} className="text-primary" aria-hidden="true" />
        </div>
        {customer.isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" aria-label="Online" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-heading font-semibold text-secondary truncate">{customer.name}</h2>
          <span className={`w-1.5 h-1.5 rounded-full ${customer.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} aria-hidden="true" />
          <span className="text-[10px] text-gray-400">{customer.isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <p className="text-[11px] text-gray-500 truncate">{service}</p>
      </div>

      <div className="flex items-center gap-1">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
          status === 'active' ? 'bg-green-50 text-green-600' :
          status === 'completed' ? 'bg-blue-50 text-blue-600' :
          'bg-amber-50 text-amber-600'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <button
          onClick={() => navigate(`/provider-dashboard/customers/${customer.id}`)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="View customer profile"
          title="View customer"
        >
          <ExternalLink size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default memo(ChatHeader)
