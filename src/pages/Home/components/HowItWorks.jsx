import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, UserPlus } from 'lucide-react'

const MotionLink = motion(Link)
import { steps } from '../data/howItWorks'
import SectionHeader from './SectionHeader'
import StepCard from './StepCard'
import TimelineConnector from './TimelineConnector'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

export default function HowItWorks() {

  /* ------------------------------------------------------------------ */
  /*  Desktop layout (horizontal timeline)                               */
  /* ------------------------------------------------------------------ */
  const desktopTimeline = (
    <div className="hidden lg:block relative">
      <TimelineConnector orientation="horizontal" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-4 gap-6 relative z-10"
      >
        {steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            orientation="horizontal"
            index={i}
          />
        ))}
      </motion.div>
    </div>
  )

  /* ------------------------------------------------------------------ */
  /*  Tablet layout (2x2 grid)                                          */
  /* ------------------------------------------------------------------ */
  const tabletGrid = (
    <div className="hidden sm:block lg:hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            orientation="horizontal"
            index={i}
          />
        ))}
      </motion.div>
    </div>
  )

  /* ------------------------------------------------------------------ */
  /*  Mobile layout (vertical timeline)                                  */
  /* ------------------------------------------------------------------ */
  const mobileTimeline = (
    <div className="sm:hidden relative">
      <TimelineConnector orientation="vertical" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-8 relative"
      >
        {steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            orientation="vertical"
            index={i}
          />
        ))}
      </motion.div>
    </div>
  )

  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50"
      aria-label="How it works"
    >
      {/* Background decorations */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #2563EB 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-[0.02] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #2563EB 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Simple Process"
          heading="How Local Services Marketplace Works"
          subtitle="Book trusted local professionals in just four simple steps."
        />

        {/* Timeline layouts */}
        <div className="mt-12 lg:mt-16">
          {desktopTimeline}
          {tabletGrid}
          {mobileTimeline}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-14 lg:mt-20 text-center"
        >
          <p className="text-lg font-heading font-semibold text-secondary mb-6">
            Ready to book your first service?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MotionLink
              to="/services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors active:scale-[0.97]"
              aria-label="Book now"
            >
              Book Now
              <ArrowRight size={16} aria-hidden="true" />
            </MotionLink>
            <MotionLink
              to="/register"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-secondary border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.97]"
              aria-label="Become a provider"
            >
              <UserPlus size={16} aria-hidden="true" />
              Become a Provider
            </MotionLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
