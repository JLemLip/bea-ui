import { useState } from "react"

export default function ActionButton({ children, tooltipText, onClick }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <button
      className="relative p-2 rounded-full hover:bg-tertiary-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:text-white
                 transition-colors duration-200 ease-in-out group flex items-center justify-center hover:bg-gray-900"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      onClick={onClick}
      aria-label={tooltipText} // Accessibility: provide a label for screen readers
    >
      {children} {/* This is where your SVG icon will be rendered */}

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute bottom-full mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap
                     opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 ease-in-out
                     pointer-events-none transform -translate-x-1/2 left-1/2"
        >
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800" />
        </div>
      )}
    </button>
  )
}
