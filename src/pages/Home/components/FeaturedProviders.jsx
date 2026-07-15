import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { providers } from '../data/providers'
import SectionHeader from './SectionHeader'
import ProviderFilters from './ProviderFilters'
import ProviderCard from './ProviderCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

export default function FeaturedProviders() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? providers
    : providers.filter((p) => p.category === activeFilter)

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop header row with View All button */}
        <div className="flex items-end justify-between gap-4 mb-2">
          <SectionHeader
            badge="Top Professionals"
            heading="Meet Our Verified Service Experts"
            subtitle="Browse highly rated and verified professionals ready to help you with your everyday service needs."
          />
          <Link
            to="/services"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 mb-12 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all group flex-shrink-0"
          >
            View All Professionals
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Filters */}
        <ProviderFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </motion.div>

        {/* Mobile View All */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all group"
          >
            View All Professionals
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
