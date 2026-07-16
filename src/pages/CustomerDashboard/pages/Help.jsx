import DashboardContent from '../components/Common/DashboardContent'

const FAQS = [
  { q: 'How do I book a service?', a: 'Browse services, select one, choose your preferred time, and confirm your booking.' },
  { q: 'Can I cancel a booking?', a: 'Yes, cancellations are free up to 24 hours before the scheduled time.' },
  { q: 'How do I pay?', a: 'We accept UPI, credit/debit cards, net banking, and wallet payments.' },
  { q: 'How are service providers verified?', a: 'All providers undergo background verification and skill assessment before listing.' },
]

export default function Help() {
  return (
    <DashboardContent title="Help & Support" subtitle="Find answers and get help">
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <details key={i} className="bg-white rounded-xl border border-gray-100 group">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-secondary hover:text-primary transition-colors list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-xl">
              {faq.q}
              <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
      <div className="mt-6 bg-primary/5 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-600">
          Still need help?{' '}
          <button className="text-primary font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
            Contact Support
          </button>
        </p>
      </div>
    </DashboardContent>
  )
}
