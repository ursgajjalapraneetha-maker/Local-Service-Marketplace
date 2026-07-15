import { motion } from 'framer-motion'

export default function SectionHeader({ badge, heading, subtitle, align = 'center' }) {
  const alignClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mb-12 ${alignClasses[align] || alignClasses.center}`}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          {badge}
        </span>
      )}
      {heading && (
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-secondary">
          {heading}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-gray-500 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
