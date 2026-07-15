/**
 * ProviderCard Component
 *
 * Displays a featured service provider with profile information,
 * ratings, pricing, availability, and booking actions.
 *
 * Props:
 * @param {Object} provider
 */
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Clock, Globe, ShieldCheck } from 'lucide-react'
import RatingStars from './RatingStars'
import ProviderBadge from './ProviderBadge'

export default function ProviderCard({ provider, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/10 transition-all"
    >
      {/* Top Banner */}
      <div className="relative h-14 bg-gradient-to-r from-primary/5 to-primary/[0.02] flex items-center justify-between px-5">
        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {provider.category}
        </span>
        {provider.verified && (
          <div className="w-7 h-7 bg-success rounded-full flex items-center justify-center shadow-sm">
            <ShieldCheck size={14} className="text-white" />
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="px-5 pb-5">
        {/* Avatar + Online */}
        <div className="relative -mt-8 mb-4 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
              <img
                src={provider.image}
                alt={provider.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {provider.online && (
              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-success border-2 border-white rounded-full" />
            )}
          </div>
        </div>

        {/* Name + Profession */}
        <div className="text-center">
          <h3 className="text-lg font-heading font-semibold text-secondary group-hover:text-primary transition-colors">
            {provider.name}
          </h3>
          <p className="text-sm text-gray-500">{provider.category}</p>
        </div>

        {/* Meta Row */}
        <div className="flex items-center justify-center gap-3 mt-2 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} />
            {provider.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase size={12} />
            {provider.experience}
          </span>
        </div>

        {/* Rating */}
        <div className="flex justify-center mt-3">
          <RatingStars rating={provider.rating} reviews={provider.reviews} />
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-500 leading-relaxed text-center line-clamp-2">
          {provider.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {provider.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[10px] font-medium text-gray-500 bg-gray-50 rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Badge Chips */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {provider.badges.map((badge) => (
            <ProviderBadge key={badge} type={badge} />
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-400">Jobs Done</p>
            <p className="text-sm font-semibold text-secondary">{provider.completedJobs.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Response</p>
            <p className="text-sm font-semibold text-secondary">{provider.responseTime}</p>
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-center justify-center gap-1 mt-3 text-[11px] text-gray-400">
          <Globe size={11} />
          <span>{provider.languages.join(', ')}</span>
        </div>

        {/* Price + Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="text-center mb-3">
            <span className="text-xs text-gray-400">Starting from</span>
            <p className="text-xl font-heading font-bold text-primary">₹{provider.price}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors active:scale-[0.97]">
              Book Now
            </button>
            <button className="flex-1 px-3 py-2.5 text-sm font-medium text-secondary border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.97]">
              View Profile
            </button>
          </div>
        </div>

        {/* Availability Footer */}
        <div className={`mt-4 pt-3 border-t border-gray-50 text-center text-xs font-medium ${provider.online ? 'text-success' : 'text-gray-400'}`}>
          <span className="inline-flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${provider.online ? 'bg-success' : 'bg-gray-300'}`} />
            {provider.availability}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
