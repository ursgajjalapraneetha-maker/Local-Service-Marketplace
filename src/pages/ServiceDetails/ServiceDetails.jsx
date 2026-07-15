import { motion } from 'framer-motion'
import { Star, Clock, Shield, CheckCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServiceDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <Link to="/services" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} />
        Back to Services
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"
        >
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
            alt="Service"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded">Home Cleaning</span>
          <h1 className="mt-3 text-3xl lg:text-4xl font-heading font-bold text-secondary">
            Full Home Deep Cleaning
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-warning fill-current" />
              <span className="font-medium">4.8</span>
              <span className="text-gray-400">(1,250 reviews)</span>
            </div>
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Get your entire home professionally cleaned by our trained experts. We use eco-friendly products and advanced equipment to ensure a spotless finish. Service includes all rooms, kitchen, and bathrooms.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Clock size={16} />
              <span>Duration: 3-4 hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield size={16} />
              <span>Insurance covered up to ₹50,000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle size={16} />
              <span>100% satisfaction guaranteed</span>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-600">Starting from</span>
                <p className="text-3xl font-heading font-bold text-primary">₹2,499</p>
              </div>
              <button className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
