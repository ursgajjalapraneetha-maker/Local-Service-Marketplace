import { memo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * A single Previous / Next pagination button.
 *
 * @param {{
 *   direction: 'prev' | 'next',
 *   disabled: boolean,
 *   onClick: () => void,
 *   label: string,
 * }}
 */
function PaginationButton({ direction, disabled, onClick, label }) {
  const isPrev = direction === 'prev'
  const Icon = isPrev ? ChevronLeft : ChevronRight

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`
        inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl
        transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        ${
          disabled
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-secondary hover:bg-gray-100 active:scale-[0.97]'
        }
      `}
    >
      {isPrev && <Icon size={16} />}
      <span className="hidden sm:inline">{isPrev ? 'Previous' : 'Next'}</span>
      {!isPrev && <Icon size={16} />}
    </button>
  )
}

export default memo(PaginationButton)
