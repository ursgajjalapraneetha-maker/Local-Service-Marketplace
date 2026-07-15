import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function ServicesHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-white to-primary/[0.03] py-16 lg:py-24">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/[0.08] text-primary text-xs font-semibold rounded-full border border-primary/10 mb-6">
            <Sparkles size={14} />
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-secondary leading-[1.08] tracking-tight">
            Explore Trusted{' '}
            <span className="text-primary">Local Services</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Browse verified professionals across multiple service categories and book the right expert for your needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
