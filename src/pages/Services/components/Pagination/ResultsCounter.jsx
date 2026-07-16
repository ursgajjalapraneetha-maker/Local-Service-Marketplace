import { memo } from 'react'

/**
 * Displays the current result range and total count.
 * Example: "Showing 13 – 24 of 186 services"
 *
 * @param {{ start: number, end: number, total: number }}
 */
function ResultsCounter({ start, end, total }) {
  if (total === 0) {
    return (
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-secondary">0</span> services
      </p>
    )
  }

  return (
    <p className="text-sm text-gray-500 mb-4">
      Showing{' '}
      <span className="font-semibold text-secondary">
        {start.toLocaleString()} &ndash; {end.toLocaleString()}
      </span>{' '}
      of{' '}
      <span className="font-semibold text-secondary">
        {total.toLocaleString()}
      </span>{' '}
      services
    </p>
  )
}

export default memo(ResultsCounter)
