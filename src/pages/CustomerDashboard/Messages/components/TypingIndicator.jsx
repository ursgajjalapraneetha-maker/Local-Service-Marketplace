import { memo } from 'react'
import { motion } from 'framer-motion'

const dotVariants = {
  animate: (i) => ({
    y: [0, -4, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: i * 0.15,
      ease: 'easeInOut',
    },
  }),
}

function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 py-2">
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-gray-100">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={dotVariants}
              animate="animate"
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-[11px] text-gray-400">typing...</span>
      </div>
    </div>
  )
}

export default memo(TypingIndicator)
