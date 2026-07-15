import { motion } from 'framer-motion'
import { Briefcase, CheckCircle } from 'lucide-react'

const stats = [
  { id: 1, value: '10,000+', label: 'Professionals' },
  { id: 2, value: '25+', label: 'Categories' },
  { id: 3, value: 'Same Day', label: 'Booking' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function PageIntro() {
  return (
    <section className="py-16 lg:py-24 bg-white" aria-label="Page introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] border border-primary/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.06),transparent_70%)]" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Briefcase size={36} className="text-primary" />
                </div>
                <p className="text-gray-400 text-sm font-medium">Illustration</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-secondary">
              Quality Services at Your Doorstep
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              We connect you with top-rated professionals who are thoroughly verified and trusted by thousands of customers. Whether it&apos;s home cleaning, electrical work, or beauty services &mdash; we ensure a seamless experience from booking to completion.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-8 grid sm:grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-bold text-secondary text-lg">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
