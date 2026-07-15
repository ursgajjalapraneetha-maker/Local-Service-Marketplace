import { motion } from 'framer-motion'
import { Star, ShieldCheck, Bell, CheckCircle, Wrench } from 'lucide-react'
import { floatingCards } from '../data/heroData'

function BookingCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
      transition={{
        opacity: { delay: 1 + card.delay, duration: 0.5 },
        y: { delay: 1.5 + card.delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 min-w-[180px]"
      style={{ left: card.x, top: card.y }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs text-gray-500">Service Booked</p>
          <p className="text-sm font-semibold text-secondary mt-0.5">{card.title}</p>
        </div>
        <CheckCircle size={18} className="text-success flex-shrink-0" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{card.status}</span>
        <span className="text-sm font-bold text-primary">{card.price}</span>
      </div>
    </motion.div>
  )
}

function RatingCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
      transition={{
        opacity: { delay: 1 + card.delay, duration: 0.5 },
        y: { delay: 1.5 + card.delay, duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 text-center"
      style={{ left: card.x, top: card.y }}
    >
      <div className="flex items-center gap-0.5 mb-1">
        {Array.from({ length: card.stars }).map((_, i) => (
          <Star key={i} size={12} className="text-warning fill-current" />
        ))}
      </div>
      <p className="text-lg font-heading font-bold text-secondary">{card.rating}</p>
      <p className="text-[10px] text-gray-500">{card.label}</p>
    </motion.div>
  )
}

function ProfessionalCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay: 1 + card.delay, duration: 0.5 },
        y: { delay: 1.5 + card.delay, duration: 5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100"
      style={{ left: card.x, top: card.y }}
    >
      <div className="flex items-center gap-2">
        <ShieldCheck size={18} className="text-success flex-shrink-0" />
        <div>
          <p className="text-lg font-heading font-bold text-secondary">{card.count}</p>
          <p className="text-[10px] text-gray-500">{card.label}</p>
        </div>
      </div>
    </motion.div>
  )
}

function ServiceAlertCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, 8, 0] }}
      transition={{
        opacity: { delay: 1 + card.delay, duration: 0.5 },
        y: { delay: 1.5 + card.delay, duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 min-w-[170px]"
      style={{ left: card.x, top: card.y }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
          <Wrench size={12} className="text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold text-secondary">{card.title}</p>
          <p className="text-[10px] text-gray-500">{card.technician}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-success">
        <Bell size={10} />
        <span>{card.time}</span>
      </div>
    </motion.div>
  )
}

const cardComponents = {
  booking: BookingCard,
  rating: RatingCard,
  professional: ProfessionalCard,
  service: ServiceAlertCard,
}

export default function FloatingCards() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {floatingCards.map((card, i) => {
        const Component = cardComponents[card.type]
        if (!Component) return null
        return <Component key={i} card={card} />
      })}
    </div>
  )
}
