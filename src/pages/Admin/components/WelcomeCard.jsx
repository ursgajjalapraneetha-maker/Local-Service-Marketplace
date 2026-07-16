import { useAuth } from '../../../context/AuthContext'

export default function WelcomeCard() {
  const { user } = useAuth()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="bg-primary text-white rounded-xl p-6 shadow-sm flex justify-between items-center bg-gradient-to-r from-primary to-primary/80">
      <div>
        <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name || 'Admin'}!</h2>
        <p className="text-primary-50 opacity-90">{today}</p>
      </div>
      <div className="hidden md:block">
        {/* Optional illustration */}
      </div>
    </div>
  )
}
