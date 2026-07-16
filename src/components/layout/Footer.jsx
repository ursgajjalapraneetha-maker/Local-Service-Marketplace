import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import { APP_NAME } from '../../constants'

import FooterLinks from './FooterLinks'
import Newsletter from './Newsletter'
import SocialLinks from './SocialLinks'
import TrustBadges from './TrustBadges'
import BackToTop from './BackToTop'

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Services', path: '/services' },
  { label: 'Careers', path: '#' },
  { label: 'Blog', path: '#' },
  { label: 'Press', path: '#' },
]

const servicesLinks = [
  { label: 'Electrician', path: '/services?category=Electrical' },
  { label: 'Plumber', path: '/services?category=Plumbing' },
  { label: 'Cleaning', path: '/services?category=Cleaning' },
  { label: 'Beauty & Spa', path: '/services?category=Beauty%20%26%20Spa' },
  { label: 'Painting', path: '/services?category=Painting' },
  { label: 'Appliance Repair', path: '/services?category=Appliance%20Repair' },
]

const supportLinks = [
  { label: 'Help Center', path: '/contact' },
  { label: 'FAQs', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Safety Guidelines', path: '/about' },
]

const resourcesLinks = [
  { label: 'Become a Provider', path: '/register?role=provider' },
  { label: 'Mobile App', path: '/services' },
  { label: 'Safety', path: '/about' },
  { label: 'Trust Center', path: '/about' },
  { label: 'Blog', path: '/about' },
]

const contactInfo = [
  { icon: MapPin, label: 'Mumbai, Maharashtra, India', path: '#' },
  { icon: Mail, label: 'support@localservices.in', path: 'mailto:support@localservices.in' },
  { icon: Phone, label: '+91 99999 99999', path: 'tel:+919999999999' },
]

/**
 * Footer
 *
 * Premium multi-column footer with company info, navigation links,
 * service categories, support resources, social links, newsletter signup,
 * and trust badges.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white" role="contentinfo">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Main footer content */}
        <div className="relative py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-heading font-bold text-lg">LS</span>
              </div>
              <span className="text-xl font-heading font-bold text-white">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your trusted platform for booking professional local services. We connect you with verified experts for all your home needs.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, path }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-gray-400">
                  <Icon size={16} className="text-primary flex-shrink-0" />
                  {path.startsWith('mailto:') || path.startsWith('tel:') ? (
                    <a
                      href={path}
                      className="hover:text-primary transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinks title="Quick Links" links={quickLinks} />

          {/* Services */}
          <FooterLinks title="Services" links={servicesLinks} />

          {/* Support */}
          <FooterLinks title="Support" links={supportLinks} />

          {/* Resources */}
          <FooterLinks title="Resources" links={resourcesLinks} />
        </div>

        {/* Newsletter */}
        <div className="relative py-8 lg:py-10 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <Newsletter />
          </div>
        </div>

        {/* Bottom footer */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {year} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <SocialLinks />
        </div>
      </div>

      {/* Back to top button */}
      <BackToTop />
    </footer>
  )
}
