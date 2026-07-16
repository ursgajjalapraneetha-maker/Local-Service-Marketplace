import { memo, useCallback } from 'react'
import { Phone, MessageSquare, Mail, Send } from 'lucide-react'
import toast from 'react-hot-toast'

function ContactCustomer({ customer }) {
  const handleCall = useCallback(() => {
    toast.success(`Calling ${customer.name} at ${customer.phone}`)
  }, [customer])

  const handleMessage = useCallback(() => {
    toast.success(`Opening chat with ${customer.name}`)
  }, [customer])

  const handleEmail = useCallback(() => {
    toast.success(`Opening email to ${customer.email}`)
  }, [customer])

  const actions = [
    { icon: Phone, label: 'Call', onClick: handleCall, color: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200' },
    { icon: MessageSquare, label: 'Message', onClick: handleMessage, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200' },
    { icon: Mail, label: 'Email', onClick: handleEmail, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200' },
  ]

  return (
    <div className="space-y-2">
      {actions.map(({ icon: Icon, label, onClick, color }) => (
        <button
          key={label}
          onClick={onClick}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color.split(' ')[0]} ${color.split(' ')[1]}`}>
            <Icon size={15} aria-hidden="true" />
          </div>
          <span>{label} {customer.name}</span>
        </button>
      ))}
    </div>
  )
}

export default memo(ContactCustomer)
