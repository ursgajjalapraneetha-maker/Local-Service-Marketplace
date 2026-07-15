import { useState } from "react";

/**
 * Reusable InputField Component
 */
export default function InputField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  id,
  icon: Icon,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium ${
            isFocused ? "text-blue-600" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              isFocused ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <Icon size={18} />
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full rounded-xl border py-3 pr-4 ${
            Icon ? "pl-10" : "pl-4"
          } transition duration-200 outline-none
          ${
            error
              ? "border-red-500"
              : isFocused
              ? "border-blue-600 ring-2 ring-blue-200"
              : "border-gray-300"
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {error && (
          <p
            id={`${id}-error`}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}