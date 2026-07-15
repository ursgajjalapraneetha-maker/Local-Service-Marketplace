import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ size = 24, text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status">
      <Loader2 className="animate-spin text-primary" style={{ width: size, height: size }} />
      {text && <p className="text-sm text-secondary/60 font-body">{text}</p>}
      <span className="sr-only">Loading</span>
    </div>
  )
}
