import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react'

/**
 * Premium FAQ Accordion component with smooth animations and visual feedback.
 *
 * @param {{ faqs: Array, openIndex: number, onClick: Function, searchQuery: string }} props
 */
export default function FAQAccordion({ faqs, openIndex, onClick, searchQuery }) {
  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Booking':
        return <CheckCircle size={12} className="text-green-500" />
      case 'Safety':
        return <AlertCircle size={12} className="text-blue-500" />
      case 'Payments':
        return <HelpCircle size={12} className="text-purple-500" />
      default:
        return <HelpCircle size={12} className="text-gray-500" />
    }
  }

  if (filteredFaqs.length === 0 && searchQuery.trim()) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-white rounded-2xl border border-gray-100"
      >
        <HelpCircle size={32} className="mx-auto mb-3 text-gray-300" />
        <h3 className="text-lg font-heading font-semibold text-secondary mb-1">
          No matching FAQs found
        </h3>
        <p className="text-sm text-gray-500">
          Try different keywords or browse by category
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredFaqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative"
          >
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${faq.category === 'Booking' ? 'from-green-500/10 to-transparent' : 'from-blue-500/10 to-transparent'}`}
            />

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => onClick(index)}
                className="w-full flex items-center gap-3 px-6 py-5 text-left group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  {getCategoryIcon(faq.category)}
                </div>
                <span className="flex-1 text-left pr-4">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-primary bg-primary/5 rounded-full mb-1">
                    {faq.category}
                  </span>
                  <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'}`}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden bg-gray-50/50"
                  >
                    <div className="px-6 pb-5">
                      <div className="h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 my-3" />
                      <p className="text-sm text-gray-600 leading-relaxed pl-11">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
