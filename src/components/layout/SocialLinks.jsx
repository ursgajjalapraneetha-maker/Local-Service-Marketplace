import { motion } from 'framer-motion'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

import {
  MessageSquare,
  CreditCard,
  MapPin,
  Shield,
  Cloud,
} from 'lucide-react'

const socialLinks = [
  {
    name: 'Facebook',
    icon: FaFacebookF,
    href: '#',
    color: 'hover:text-blue-500',
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: '#',
    color: 'hover:text-pink-500',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    href: '#',
    color: 'hover:text-blue-400',
  },
  {
    name: 'X',
    icon: FaXTwitter,
    href: '#',
    color: 'hover:text-gray-200',
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    href: '#',
    color: 'hover:text-red-500',
  },
]

const trustLogos = [
  {
    name: 'SSL Secure',
    icon: Shield,
    color: 'text-green-400',
  },
  {
    name: 'Google Reviews',
    icon: MessageSquare,
    color: 'text-yellow-400',
  },
  {
    name: 'Razorpay',
    icon: CreditCard,
    color: 'text-blue-400',
  },
  {
    name: 'Google Maps',
    icon: MapPin,
    color: 'text-red-400',
  },
  {
    name: 'Cloudinary',
    icon: Cloud,
    color: 'text-purple-400',
  },
]

export default function SocialLinks() {
  return (
    <div className="space-y-6">
      {/* Social Media */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Follow Us
        </h3>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ name, icon: Icon, href, color }) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-lg bg-white/10 backdrop-blur-md text-gray-400 transition-all duration-300 ${color}`}
              aria-label={name}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Trusted By
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {trustLogos.map(({ name, icon: Icon, color }) => (
            <div
              key={name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5"
            >
              <Icon size={16} className={color} />
              <span className="text-xs text-gray-300">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}