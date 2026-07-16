import { memo, useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, LayoutDashboard, CalendarCheck, Heart, Bell, MessageSquare, CreditCard, User } from 'lucide-react'

const SEARCH_PAGES = [
  { label: 'Dashboard', path: '/customer-dashboard', icon: LayoutDashboard, keywords: ['home', 'overview', 'dashboard'] },
  { label: 'My Bookings', path: '/customer-dashboard/bookings', icon: CalendarCheck, keywords: ['booking', 'appointment', 'schedule', 'service'] },
  { label: 'Wishlist', path: '/customer-dashboard/wishlist', icon: Heart, keywords: ['wishlist', 'favorite', 'saved', 'liked'] },
  { label: 'Notifications', path: '/customer-dashboard/notifications', icon: Bell, keywords: ['notification', 'alert', 'update'] },
  { label: 'Messages', path: '/customer-dashboard/messages', icon: MessageSquare, keywords: ['message', 'chat', 'conversation', 'inbox'] },
  { label: 'Payments', path: '/customer-dashboard/payments', icon: CreditCard, keywords: ['payment', 'transaction', 'invoice', 'bill'] },
  { label: 'Profile', path: '/customer-dashboard/profile', icon: User, keywords: ['profile', 'account', 'settings', 'password'] },
]

function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return SEARCH_PAGES.filter(
      (page) =>
        page.label.toLowerCase().includes(q) ||
        page.keywords.some((kw) => kw.includes(q))
    )
  }, [query])

  const showResults = focused && query.trim().length > 0

  const handleClear = useCallback(() => {
    setQuery('')
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }, [])

  const handleSelect = useCallback(
    (path) => {
      setQuery('')
      setSelectedIndex(-1)
      setFocused(false)
      inputRef.current?.blur()
      navigate(path)
    },
    [navigate],
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClear()
        inputRef.current?.blur()
        return
      }

      if (!showResults) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
      } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault()
        handleSelect(results[selectedIndex].path)
      }
    },
    [showResults, results, selectedIndex, handleSelect, handleClear],
  )

  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[selectedIndex]
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleGlobalKey)
    return () => document.removeEventListener('keydown', handleGlobalKey)
  }, [])

  return (
    <div className="relative flex-1 max-w-md">
      <div
        className={`relative transition-all duration-200 ${focused ? 'scale-[1.02]' : ''}`}
      >
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, bookings..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-gray-100 rounded-lg border-0 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          aria-label="Search in dashboard"
          aria-expanded={showResults}
          aria-haspopup="listbox"
          role="combobox"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
        {!query && !focused && (
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-gray-400 bg-white border border-gray-200 rounded font-mono">
            Ctrl+K
          </kbd>
        )}
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
            role="listbox"
            aria-label="Search results"
          >
            {results.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-400">
                No pages found for &quot;{query}&quot;
              </div>
            ) : (
              <ul ref={listRef} className="py-1 max-h-64 overflow-y-auto">
                {results.map((page, index) => {
                  const Icon = page.icon
                  return (
                    <li key={page.path}>
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault()
                          handleSelect(page.path)
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                          index === selectedIndex
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        role="option"
                        aria-selected={index === selectedIndex}
                      >
                        <Icon size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
                        <span>{page.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(SearchBar)
