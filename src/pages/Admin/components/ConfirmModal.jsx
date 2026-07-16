import { AlertTriangle } from 'lucide-react'

export default function ConfirmModal({ title, message, confirmText = 'Confirm', confirmStyle = 'primary', onConfirm, onCancel }) {
  const getStyle = () => {
    switch (confirmStyle) {
      case 'danger': return 'bg-red-600 hover:bg-red-700 text-white'
      case 'warning': return 'bg-yellow-500 hover:bg-yellow-600 text-white'
      case 'success': return 'bg-green-600 hover:bg-green-700 text-white'
      default: return 'bg-primary hover:bg-primary/90 text-white'
    }
  }

  const getIconStyle = () => {
    switch (confirmStyle) {
      case 'danger': return 'bg-red-100 text-red-600'
      case 'warning': return 'bg-yellow-100 text-yellow-600'
      case 'success': return 'bg-green-100 text-green-600'
      default: return 'bg-primary/10 text-primary'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${getIconStyle()}`}>
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h2>
          <p className="text-gray-500 text-center text-sm">{message}</p>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-center gap-3 bg-gray-50">
          <button onClick={onCancel} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onConfirm} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg ${getStyle()}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
