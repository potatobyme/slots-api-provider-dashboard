"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

const searchResults = [
  { id: '1', title: 'Dashboard Overview', type: 'Page', url: '/dashboard' },
  { id: '2', title: 'Account Settings', type: 'Settings', url: '/dashboard/settings' },
  { id: '3', title: 'Billing Statement', type: 'Billing', url: '/billing/statements' },
]

export const SearchInput = () => {
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all placeholder:text-gray-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      {showResults && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          {filteredResults.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredResults.map(result => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <span className="text-sm text-gray-900">{result.title}</span>
                  <span className="text-xs text-gray-500">{result.type}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
} 