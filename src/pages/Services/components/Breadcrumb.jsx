import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-1.5"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors duration-200 group"
        >
          <Home size={14} className="group-hover:scale-110 transition-transform duration-200" />
          <span>Home</span>
        </Link>
      </motion.div>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (index + 1) * 0.1 }}
          className="flex items-center gap-1.5"
        >
          <ChevronRight size={14} className="text-gray-300" />
          {item.path ? (
            <Link
              to={item.path}
              className="text-gray-400 hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-primary font-medium">
              {item.label}
            </span>
          )}
        </motion.div>
      ))}
    </nav>
  )
}
