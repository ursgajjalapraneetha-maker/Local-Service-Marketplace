import { motion } from 'framer-motion'
import { Search, UserCheck, CalendarCheck, Smile } from 'lucide-react'

/**
 * Icon map for step cards.
 */
const iconMap = {
  Search,
  UserCheck,
  CalendarCheck,
  Smile,
}

/**
 * Gradient pairs for each step.
 */
const gradients = [
  { from: '#2563EB', to: '#1D4ED8' },
  { from: '#059669', to: '#047857' },
  { from: '#7C3AED', to: '#6D28D9' },
  { from: '#EA580C', to: '#D97706' },
]

/**
 * StepCard
 *
 * Individual card in the HowItWorks timeline.
 *
 * @param {{ step: { id: number, icon: string, title: string, description: string, step: number }, orientation: 'horizontal' | 'vertical', index: number }} props
 */
export default function StepCard({ step, orientation = 'horizontal', index }) {
  const Icon = iconMap[step.icon] || Search
  const colors = gradients[(step.id - 1) % gradients.length]

  const cardContent = (
    <>
      {/* Numbered circle + icon */}
      <div className="relative flex items-center justify-center mb-5">
        <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0" aria-hidden="true">
          <defs>
            <linearGradient id={`grad-${step.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="38" fill="none" stroke={`url(#grad-${step.id})`} strokeWidth="2" opacity="0.3" />
          <circle
            cx="40"
            cy="40"
            r="30"
            fill={`url(#grad-${step.id})`}
            className="shadow-lg"
          />
        </svg>
        <Icon
          size={26}
          className="absolute text-white"
          style={{ strokeWidth: 1.5 }}
          aria-hidden="true"
        />
        <span
          className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md"
          style={{ background: colors.from }}
        >
          {step.step}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-heading font-semibold text-secondary mb-2">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        {step.description}
      </p>
    </>
  )

  const card = (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: orientation === 'horizontal' ? 30 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="relative z-10 bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all h-full group"
    >
      {/* Gradient border overlay on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          padding: '1px',
          background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}08)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {cardContent}
    </motion.div>
  )

  return (
    <div className="relative flex items-start gap-5">
      {/* Mobile vertical dot */}
      {orientation === 'vertical' && (
        <div className="relative flex-shrink-0 z-10 mt-2">
          <div
            className="w-[22px] h-[22px] rounded-full border-[3px] border-white shadow-sm"
            style={{ background: colors.from }}
          />
        </div>
      )}
      <div className={orientation === 'vertical' ? 'flex-1 min-w-0' : ''}>
        {card}
      </div>
    </div>
  )
}
