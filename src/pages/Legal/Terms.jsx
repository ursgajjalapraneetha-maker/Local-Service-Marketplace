import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <h1 className="text-3xl font-heading font-bold text-secondary mb-6">Terms of Service</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>Last updated: July 2026</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">1. Acceptance of Terms</h2>
          <p>By accessing and using Local Services Marketplace, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">2. Description of Service</h2>
          <p>Local Services Marketplace is a platform that connects customers with local service providers. We facilitate bookings but are not a party to any agreement between customers and providers.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">3. User Responsibilities</h2>
          <p>Users must provide accurate information, maintain confidentiality of their accounts, and use the platform in compliance with applicable laws.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">4. Payments and Fees</h2>
          <p>All payments are processed securely through our platform. Service fees are clearly displayed before booking confirmation.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">5. Contact</h2>
          <p>For questions about these terms, please contact us at support@localservices.in.</p>
        </div>
      </div>
    </div>
  )
}
