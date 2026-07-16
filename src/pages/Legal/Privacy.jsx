import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <h1 className="text-3xl font-heading font-bold text-secondary mb-6">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>Last updated: July 2026</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">1. Information We Collect</h2>
          <p>We collect information you provide when creating an account, making bookings, and communicating with service providers. This includes your name, email, phone number, and service preferences.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">2. How We Use Your Information</h2>
          <p>Your information is used to facilitate bookings, improve our services, send relevant notifications, and ensure platform security.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">3. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your personal information. Your data is encrypted and stored securely.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">4. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal data at any time through your account settings.</p>
          <h2 className="text-xl font-semibold text-secondary mt-8">5. Contact</h2>
          <p>For privacy-related inquiries, contact us at support@localservices.in.</p>
        </div>
      </div>
    </div>
  )
}
