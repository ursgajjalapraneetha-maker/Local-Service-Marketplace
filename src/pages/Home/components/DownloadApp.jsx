import { motion } from 'framer-motion'
import { Smartphone, CheckCircle } from 'lucide-react'

const perks = [
  'Real-time booking tracking',
  'Exclusive app-only offers',
  'Instant chat with providers',
  'One-tap rebooking',
]

export default function DownloadApp() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05),transparent_50%)]" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Mobile App
              </span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-heading font-bold text-white">
                Download Our App
              </h2>
              <p className="mt-3 text-white/70 text-lg max-w-md">
                Book services on the go. Get access to exclusive deals and real-time updates.
              </p>

              <ul className="mt-6 space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-success flex-shrink-0" />
                    <span className="text-white/80 text-sm">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Store Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-white text-secondary rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  App Store
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-white text-secondary rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                  Google Play
                </button>
              </div>
            </motion.div>

            {/* Right Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-48 h-96 sm:w-56 sm:h-[400px] bg-secondary rounded-[2rem] border-4 border-gray-700 shadow-2xl overflow-hidden">
                  <div className="h-8 flex items-center justify-center bg-secondary border-b border-gray-700">
                    <div className="w-20 h-1.5 bg-gray-600 rounded-full" />
                  </div>
                  <div className="p-3 space-y-3">
                    <div className="h-4 bg-primary/20 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
                    <div className="h-20 bg-gray-800 rounded-xl animate-pulse" />
                    <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse" />
                    <div className="h-14 bg-gray-800 rounded-xl animate-pulse" />
                    <div className="h-14 bg-gray-800 rounded-xl animate-pulse" />
                    <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
                    <div className="h-20 bg-gray-800 rounded-xl animate-pulse" />
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  className="absolute -bottom-4 -left-8 bg-white rounded-xl shadow-lg px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Smartphone size={20} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold text-secondary">4.8★</p>
                      <p className="text-[10px] text-gray-500">App Rating</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
