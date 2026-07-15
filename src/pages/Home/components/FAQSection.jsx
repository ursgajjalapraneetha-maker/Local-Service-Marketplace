import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { faqs, categories, supportCards } from '../data/faq'
import SectionHeader from './SectionHeader'
import FAQAccordion from './FAQAccordion'
import FAQSearch from './FAQSearch'
import SupportCard from './SupportCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

/**
 * FAQSection
 *
 * Complete FAQ section with search, premium accordion,
 * category highlighting, and support cards at the bottom.
 */
export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(null)

  const handleSearch = (query) => {
    setSearchQuery(query)
    setOpenIndex(null)
  }

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const getCategoryStats = () => {
    const stats = {}
    faqs.forEach((faq) => {
      stats[faq.category] = (stats[faq.category] || 0) + 1
    })
    return stats
  }

  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50/50 to-white"
      aria-label="Frequently asked questions"
    >
      {/* Background decorations */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          heading="Frequently Asked Questions"
          subtitle="Find answers to the most common questions about booking services, payments, providers, cancellations, and safety."
        />

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FAQSearch searchQuery={searchQuery} onSearchChange={handleSearch} />
        </motion.div>

        {/* Category summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          <HelpCircle size={14} className="text-primary mr-1" />
          <span className="text-xs text-gray-500">
            Browse by category:
            <span className="ml-2 font-medium text-gray-600">
              {Object.keys(getCategoryStats()).join(', ')}
            </span>
          </span>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <FAQAccordion
            faqs={faqs}
            openIndex={openIndex}
            onClick={handleAccordionClick}
            searchQuery={searchQuery}
          />
        </motion.div>

        {/* Support Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 lg:mt-20"
        >
          <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center lg:text-left">
            Still Need Help?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportCards.map((card, i) => (
              <SupportCard key={card.id} support={card} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
