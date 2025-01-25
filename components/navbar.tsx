"use client";

import Link from "next/link";
import { Search, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  url: string;
}

const searchResults: SearchResult[] = [
  { id: '1', title: 'Recent Transaction', type: 'Transaction', url: '/backoffice/transactions-recent' },
  { id: '2', title: 'Player Stats', type: 'Player', url: '/backoffice/players' },
  { id: '3', title: 'Billing Statement', type: 'Billing', url: '/billing/statements' },
];

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const pathname = usePathname();

  const filteredResults = searchResults.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/account':
        return 'Account';
      case '/api-keys':
        return 'API Keys';
      default:
        return pathname.split('/').pop()?.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, c => c.toUpperCase()) || 'Dashboard';
    }
  };

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-4 relative">
      {/* Left side - Page Title */}
      <div className="text-lg font-semibold text-gray-800">
        {getPageTitle()}
      </div>

      {/* Right side - Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(!!e.target.value);
              }}
              className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50">
              {filteredResults.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredResults.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{result.title}</div>
                        <div className="text-sm text-gray-500">{result.type}</div>
                      </div>
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

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default NavBar; 