import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/categories'
import SectionHeader from './SectionHeader'
import CategoryCard from './CategoryCard'

export default function CategoriesSection() {
  const [visibleCount, setVisibleCount] = useState(8)
  const visibleCategories = categories.slice(0, visibleCount)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  }

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Services"
          heading="Explore Services by Category"
          subtitle="Choose from a wide range of trusted local professionals for your everyday needs."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {visibleCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          {visibleCount < categories.length ? (
            <button
              onClick={() => setVisibleCount(categories.length)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all group"
            >
              View All Categories
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all group"
            >
              Explore All Services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}
