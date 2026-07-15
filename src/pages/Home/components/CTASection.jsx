import { motion } from 'framer-motion'
import { ArrowRight, UserPlus, Sparkles } from 'lucide-react'

/**
 * CTASection
 *
 * Premium final call-to-action section with background illustrations,
 * floating shapes, and compelling call-to-action messaging.
 */
export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary via-primary-dark to-primary-dark overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />

        {/* Floating shapes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />

        {/* Abstract illustration */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50L50 0' fill='white' fill-opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            backgroundPosition: '0 0',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Sparkles icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex justify-center mb-6"
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Sparkles size={24} className="text-white" />
            </div>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
            Ready to Book a Trusted Professional?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-lg lg:text-xl text-white/80 leading-relaxed">
            Join thousands of happy customers who use our platform every day for all their service needs.
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all"
              aria-label="Book a service"
            >
              Book a Service
              <ArrowRight size={18} aria-hidden="true" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-md transition-all"
              aria-label="Become a provider"
            >
              <UserPlus size={18} aria-hidden="true" />
              Become a Provider
            </motion.a>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>Verified Pros</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
