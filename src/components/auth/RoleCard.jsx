export default function RoleCard({
  title,
  description,
  value,
  selected,
  onClick,
  Icon,
  color = 'blue',
}) {
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', selectedBg: 'bg-blue-600', border: 'border-blue-500', ring: 'ring-blue-500/20' },
    green: { bg: 'bg-green-100', text: 'text-green-600', selectedBg: 'bg-green-600', border: 'border-green-500', ring: 'ring-green-500/20' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', selectedBg: 'bg-purple-600', border: 'border-purple-500', ring: 'ring-purple-500/20' },
  }
  const c = colorMap[color] || colorMap.blue

  return (
    <label
      className={`relative block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center hover:scale-[1.02] ${
        selected
          ? `${c.border} ${c.selectedBg} ${c.ring} ring-2`
          : `${c.bg} ${c.text} border-gray-200 hover:border-gray-300`
      }`}
    >
      <input
        type="radio"
        name="role"
        value={value}
        checked={selected}
        onChange={onClick}
        className="sr-only"
      />

      {selected && (
        <div className="absolute top-2 right-2">
          <div className={`w-5 h-5 rounded-full ${c.selectedBg} flex items-center justify-center`}>
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selected ? `${c.selectedBg} text-white` : `${c.bg} ${c.text}`}`}>
          {Icon ? <Icon className="w-6 h-6" /> : (
            value === 'customer' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )
          )}
        </div>

        <div>
          <h3 className={`text-sm font-semibold ${selected ? `${c.text}` : selected ? c.text : 'text-secondary'}`}>
            {title}
          </h3>

          <p className="text-xs text-gray-600 mt-1 leading-tight">
            {description}
          </p>
        </div>
      </div>
    </label>
  );
}