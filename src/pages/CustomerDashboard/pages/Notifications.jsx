import DashboardContent from '../components/Common/DashboardContent'

export default function Notifications() {
  return (
    <DashboardContent title="Notifications" subtitle="Stay updated with your activity">
      <div className="space-y-3">
        {[
          { title: 'Booking Confirmed', message: 'Your Home Deep Cleaning with Sparkle Clean Pro is confirmed for tomorrow at 10:00 AM.', time: '5 minutes ago', type: 'success' },
          { title: 'Payment Received', message: 'Payment of ₹2,499 for Home Deep Cleaning was successful.', time: '5 minutes ago', type: 'success' },
          { title: 'Review Reminder', message: 'How was your AC Repair service? Share your experience with a review.', time: '2 days ago', type: 'info' },
          { title: 'Special Offer', message: 'Get 20% off on your next booking. Use code: SAVE20. Valid till end of month.', time: '5 days ago', type: 'promo' },
        ].map((n, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              n.type === 'success' ? 'bg-success/10' : n.type === 'promo' ? 'bg-warning/10' : 'bg-primary/5'
            }`}>
              <svg className={`w-4 h-4 ${
                n.type === 'success' ? 'text-success' : n.type === 'promo' ? 'text-warning' : 'text-primary'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary">{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
              <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardContent>
  )
}
