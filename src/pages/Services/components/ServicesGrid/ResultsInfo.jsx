import { memo } from 'react'

function ResultsInfo({ count }) {
  return (
    <p className="text-sm text-gray-500">
      Showing{' '}
      <span className="font-semibold text-secondary">{count}</span>{' '}
      {count === 1 ? 'service' : 'services'}
    </p>
  )
}

export default memo(ResultsInfo)
