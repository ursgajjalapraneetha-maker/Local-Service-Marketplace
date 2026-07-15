import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * TimelineConnector
 *
 * Animated connecting line for the HowItWorks timeline.
 * - Desktop: horizontal line that fills left-to-right based on section scroll progress.
 * - Mobile: vertical line that fills top-to-bottom.
 *
 * @param {{ orientation: 'horizontal' | 'vertical' }} props
 */
export default function TimelineConnector({ orientation = 'horizontal' }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1])
  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1])

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        className="absolute left-[23px] top-0 bottom-0 w-[2px] z-0"
        aria-hidden="true"
      >
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-gray-100" />
        {/* Fill */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-x-0 top-0 bottom-0 rounded-full bg-gradient-to-b from-primary to-primary/40"
        />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-[3px] -translate-y-1/2 z-0 rounded-full"
      aria-hidden="true"
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-gray-100" />
      {/* Fill */}
      <motion.div
        style={{ scaleX, originX: 0 }}
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary/70 to-primary/40"
      />
    </div>
  )
}
