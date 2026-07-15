/**
 * PopularServices Section
 *
 * Displays a grid of popular service cards with search, category filters,
 * sort dropdown, and a View All CTA.
 */
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { services } from '../data/services'
import SectionHeader from './SectionHeader'
import ServiceSearch from './ServiceSearch'
import ServiceFilters from './ServiceFilters'
import SortDropdown from './SortDropdown'
import ServiceCard from './ServiceCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

export default function PopularServices() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('popular')

  const filtered = useMemo(() => {
    let result = [...services]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    }

    if (filter !== 'All') {
      result = result.filter((s) => s.category === filter)
    }

    switch (sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [search, filter, sort])

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Most Booked"
          heading="Popular Services Near You"
          subtitle="Discover the most frequently booked and highest-rated local services."
        />

        {/* Search + Sort + Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <ServiceSearch query={search} onChange={setSearch} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <ServiceFilters activeFilter={filter} onFilterChange={setFilter} />

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filtered.length > 0 ? (
            filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              No services found matching your criteria.
            </div>
          )}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all group"
          >
            View All Services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
