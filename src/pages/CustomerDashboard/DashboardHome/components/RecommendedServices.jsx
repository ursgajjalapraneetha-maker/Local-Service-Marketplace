import { memo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import RecommendationCard from './RecommendationCard'

const RECOMMENDATIONS = [
  { id: 1, name: 'Full Home Deep Cleaning', category: 'Home Cleaning', price: 2499, rating: 4.8, reviews: 1250, slug: 'full-home-deep-cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop' },
  { id: 2, name: 'AC Repair & Service', category: 'Electrical', price: 399, rating: 4.7, reviews: 890, slug: 'ac-repair-service', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=250&fit=crop' },
  { id: 3, name: 'Interior Wall Painting', category: 'Painting', price: 8999, rating: 4.9, reviews: 320, slug: 'interior-wall-painting', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=250&fit=crop' },
  { id: 4, name: 'Electrical Wiring Repair', category: 'Electrical', price: 349, rating: 4.6, reviews: 560, slug: 'electrical-wiring-repair', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=250&fit=crop' },
  { id: 5, name: 'Kitchen Plumbing Fix', category: 'Plumbing', price: 549, rating: 4.5, reviews: 430, slug: 'kitchen-plumbing-fix', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=250&fit=crop' },
  { id: 6, name: 'Facial & Spa Treatment', category: 'Beauty & Spa', price: 999, rating: 4.7, reviews: 1120, slug: 'facial-spa-treatment', image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=250&fit=crop' },
]

function RecommendedServices() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Recommended for You</h2>
      </div>

      {RECOMMENDATIONS.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles size={22} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-secondary">No recommendations yet</p>
          <p className="text-xs text-gray-400 mt-1">Browse services to get personalized recommendations.</p>
        </div>
      ) : (
        <div
          className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-none"
          role="list"
          aria-label="Recommended services"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {RECOMMENDATIONS.map((service, i) => (
            <div key={service.id} className="snap-start" role="listitem">
              <RecommendationCard service={service} index={i} />
            </div>
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default memo(RecommendedServices)
