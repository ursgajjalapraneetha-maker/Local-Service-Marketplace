import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, UserPlus } from 'lucide-react'
import HeroSearch from './HeroSearch'
import PopularSearches from './PopularSearches'
import HeroStats from './HeroStats'
import FloatingCards from './FloatingCards'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    if (query?.trim()) {
      console.log('Searching for:', query)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-white to-primary/[0.03]">
      {/* Background decorative blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-16 lg:py-0">
          {/* ======== LEFT COLUMN ======== */}
          <div className="max-w-xl pt-8 lg:pt-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/[0.08] text-primary text-xs font-semibold rounded-full border border-primary/10">
                <Sparkles size={14} />
                India&apos;s Most Trusted Service Platform
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-secondary leading-[1.08] tracking-tight"
            >
              Find{' '}
              <span className="text-primary relative">
                Trusted
                <svg className="absolute -bottom-1 left-0 right-0 w-full h-2 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 Q75,10 100,5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>{' '}
              Local{' '}
              <span className="text-primary">Professionals</span>
              <br />
              Near You
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg"
            >
              Book verified electricians, plumbers, carpenters, cleaners, mechanics, tutors and many more with just a few clicks.
            </motion.p>

            {/* Search */}
            <div className="mt-7">
              <HeroSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
              />
            </div>

            {/* Popular Searches */}
            <div className="mt-4">
              <PopularSearches onSelect={setSearchQuery} />
            </div>

            {/* Stats */}
            <div className="mt-6">
              <HeroStats />
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
              >
                Book a Service
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 text-secondary font-medium text-sm border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.97]"
              >
                Become a Provider
                <UserPlus size={16} />
              </Link>
            </motion.div>
          </div>

          {/* ======== RIGHT COLUMN ======== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center h-full min-h-[500px]"
          >
            {/* Main Image */}
            <div className="relative w-full max-w-lg">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=450&fit=crop&q=80"
                  alt="Professional cleaner providing home service"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/[0.03] to-transparent pointer-events-none" />

              {/* Floating Cards */}
              <FloatingCards />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
