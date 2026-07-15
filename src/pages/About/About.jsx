import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower local service providers and make quality home services accessible to every household through technology.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To become India\'s most trusted marketplace for local services, creating millions of livelihoods in the process.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Trust, transparency, and customer satisfaction are at the core of everything we do.',
  },
]

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h1 className="text-4xl lg:text-5xl font-heading font-bold text-secondary">
          About Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We are on a mission to revolutionize how local services are discovered and delivered.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <p className="text-gray-600 leading-relaxed mb-4">
          LocalServices Marketplace was founded with a simple idea — make it effortless for people to find and book trusted local service providers. We bridge the gap between customers seeking quality services and skilled professionals looking for opportunities.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Today, we serve thousands of happy customers across India, with a network of 5,000+ verified service providers offering everything from home cleaning to electrical repairs.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="p-8 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <Icon size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-secondary mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
