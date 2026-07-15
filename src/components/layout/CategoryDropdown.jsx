import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Droplets, Hammer, PaintBucket, SprayCan, Sparkles, Snowflake,
  Monitor, Smartphone, BookOpen, Shirt, Flower2, Truck,
} from 'lucide-react'

const categories = [
  { name: 'Electrician', icon: Zap, path: '/services?category=electrician' },
  { name: 'Plumber', icon: Droplets, path: '/services?category=plumber' },
  { name: 'Carpenter', icon: Hammer, path: '/services?category=carpenter' },
  { name: 'Painter', icon: PaintBucket, path: '/services?category=painter' },
  { name: 'Cleaning', icon: SprayCan, path: '/services?category=cleaning' },
  { name: 'Salon', icon: Sparkles, path: '/services?category=salon' },
  { name: 'AC Repair', icon: Snowflake, path: '/services?category=ac-repair' },
  { name: 'Laptop Repair', icon: Monitor, path: '/services?category=laptop-repair' },
  { name: 'Mobile Repair', icon: Smartphone, path: '/services?category=mobile-repair' },
  { name: 'Tutor', icon: BookOpen, path: '/services?category=tutor' },
  { name: 'Laundry', icon: Shirt, path: '/services?category=laundry' },
  { name: 'Gardening', icon: Flower2, path: '/services?category=gardening' },
  { name: 'Packers & Movers', icon: Truck, path: '/services?category=packers-movers' },
]

export default function CategoryDropdown({ isOpen, onClose, isMobile }) {
  const content = (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-2">
      {categories.map(({ name, icon: Icon, path }) => (
        <Link
          key={name}
          to={path}
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-secondary hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon size={15} className="text-primary" />
          </div>
          <span>{name}</span>
        </Link>
      ))}
    </div>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-2">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          onMouseEnter={onClose}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
