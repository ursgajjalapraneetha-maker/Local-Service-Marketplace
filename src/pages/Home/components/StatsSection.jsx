import { motion } from 'framer-motion'
import { stats } from '../data/stats'
import SectionHeader from './SectionHeader'
import StatCard from './StatCard'
import Achievements from './Achievements'
import TrustLogos from './TrustLogos'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

/**
 * StatsSection
 *
 * Displays platform statistics, achievements, and trust logos
 * with animated counters and premium card design.
 */
export default function StatsSection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50/50 to-white" aria-label="Platform statistics">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Impact"
          heading="Trusted by Thousands Across the Country"
          subtitle="Our growing community of customers and professionals reflects our commitment to quality and reliability."
        />

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Achievements */}
        <div className="mt-12 lg:mt-16">
          <Achievements />
        </div>

        {/* Trust logos */}
        <div className="mt-12 lg:mt-14">
          <TrustLogos />
        </div>
      </div>
    </section>
  )
}
