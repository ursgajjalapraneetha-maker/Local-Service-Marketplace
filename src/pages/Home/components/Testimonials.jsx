import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, LayoutGrid, Wand2 } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import SectionHeader from './SectionHeader'
import TestimonialCard from './TestimonialCard'
import RatingSummary from './RatingSummary'
import SuccessStory from './SuccessStory'

const PER_PAGE = 3

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

/**
 * Testimonials Section
 *
 * Displays customer testimonials in grid or carousel mode,
 * platform rating statistics, and a featured success story.
 */
export default function Testimonials() {
  const [carousel, setCarousel] = useState(false)
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / PER_PAGE)

  const nextPage = useCallback(() => {
    setPage((p) => (p + 1) % totalPages)
  }, [totalPages])

  const prevPage = useCallback(() => {
    setPage((p) => (p - 1 + totalPages) % totalPages)
  }, [totalPages])

  const visible = carousel
    ? testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
    : testimonials

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50/50 to-white" aria-label="Customer testimonials">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          heading="Loved by Thousands of Happy Customers"
          subtitle="Read what our customers say about booking trusted professionals through our platform."
        />

        {/* Rating summary */}
        <RatingSummary />

        {/* View toggle */}
        <div className="flex items-center justify-between mb-6">
          {carousel && (
            <p className="text-sm text-gray-400">
              Page {page + 1} of {totalPages}
            </p>
          )}
          <button
            onClick={() => { setCarousel((c) => !c); setPage(0) }}
            className="ml-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-secondary transition-colors"
            aria-label={carousel ? 'Switch to grid view' : 'Switch to carousel view'}
          >
            {carousel ? <LayoutGrid size={14} /> : <Wand2 size={14} />}
            {carousel ? 'Grid View' : 'Carousel View'}
          </button>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={carousel ? `carousel-${page}` : 'grid'}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {visible.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Carousel navigation */}
        {carousel && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevPage}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} className="text-gray-500" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  role="tab"
                  aria-selected={i === page}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === page
                      ? 'bg-primary w-6'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} className="text-gray-500" />
            </button>
          </div>
        )}

        {/* Success story */}
        <div className="mt-14 lg:mt-20">
          <SuccessStory />
        </div>
      </div>
    </section>
  )
}
