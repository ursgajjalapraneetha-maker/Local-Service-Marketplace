export default function RoleCard({
  title,
  description,
  value,
  selected,
  onClick,
}) {
  return (
    <label
      className={`relative block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center hover:scale-[1.02] ${
        selected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-gray-200 hover:border-gray-300 bg-white"
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
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            selected
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {value === "customer" ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </div>

        <div>
          <h3
            className={`text-sm font-semibold ${
              selected ? "text-primary" : "text-secondary"
            }`}
          >
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