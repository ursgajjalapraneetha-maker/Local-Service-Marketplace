import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Star, ArrowRight } from 'lucide-react'

const MotionLink = motion(Link)
import { successStory } from '../data/testimonials'

/**
 * SuccessStory
 *
 * Featured customer success story with before/after images,
 * problem/solution details, and a CTA.
 */
export default function SuccessStory() {
  const s = successStory

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="grid lg:grid-cols-2">
        {/* Before / After images */}
        <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px]">
          {/* Before — left half */}
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <img
              src={s.imageBefore}
              alt="Before renovation"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-gray-700">
              BEFORE
            </div>
          </div>
          {/* After — right half */}
          <div className="absolute inset-0 left-1/2 w-1/2 overflow-hidden">
            <img
              src={s.imageAfter}
              alt="After renovation"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-primary/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white">
              AFTER
            </div>
          </div>
          {/* Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/70 shadow-sm" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
            <ArrowRight size={14} className="text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3" aria-label={`${s.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < s.rating ? 'text-warning fill-current' : 'text-gray-200'}
              />
            ))}
          </div>

          {/* Customer + Provider info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={s.photo}
              alt={s.customer}
              loading="lazy"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-heading font-semibold text-sm text-secondary">{s.customer}</h4>
              <p className="text-xs text-gray-400">
                {s.service} by {s.provider}
              </p>
            </div>
          </div>

          <blockquote className="text-sm text-gray-600 leading-relaxed italic mb-4">
            &ldquo;{s.review}&rdquo;
          </blockquote>

          {/* Problem / Solution / Time */}
          <div className="space-y-3 mb-5">
            <div>
              <p className="text-xs font-semibold text-danger mb-0.5">The Problem</p>
              <p className="text-sm text-gray-500 leading-snug">{s.problem}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-success mb-0.5">Our Solution</p>
              <p className="text-sm text-gray-500 leading-snug">{s.solution}</p>
            </div>
          </div>

          {/* Time + Satisfaction */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={15} className="text-primary" />
              <span className="font-medium text-secondary">{s.timeTaken}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-success">{s.satisfaction}%</span>
              <span className="text-xs text-gray-400">Satisfaction</span>
            </div>
          </div>

          {/* CTA */}
          <MotionLink
            to="/services"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary group"
          >
            Read Full Story
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </MotionLink>
        </div>
      </div>
    </motion.section>
  )
}
