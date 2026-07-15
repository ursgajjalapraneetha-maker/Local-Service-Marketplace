/**
 * PriceTag Component
 *
 * Displays service pricing with optional original price and discount badge.
 *
 * Props:
 * @param {number} price - Current price
 * @param {number|null} originalPrice - Original price before discount
 * @param {number|null} discount - Discount percentage
 */
export default function PriceTag({ price, originalPrice, discount }) {
  return (
    <div className="flex items-end gap-2">
      <div>
        <span className="text-xs text-gray-400">Starting from</span>
        <p className="text-xl font-heading font-bold text-primary">
          ₹{price.toLocaleString()}
        </p>
      </div>
      {originalPrice && (
        <>
          <p className="text-sm text-gray-300 line-through mb-1">
            ₹{originalPrice.toLocaleString()}
          </p>
          <span className="px-1.5 py-0.5 text-[10px] font-bold text-success bg-success/10 rounded ml-auto">
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  )
}
