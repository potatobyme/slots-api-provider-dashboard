"use client";

import Link from "next/link";
import { Search, Bell, User, Settings, ChevronDown, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

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

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase())
  );

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
  );
};

const NavBar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const onLogout = async () => {
    logout();
    router.push('/auth/login');
  };

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
    <>
      <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm">
        <div className="flex flex-1 items-center justify-between">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">{getPageTitle()}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block w-[300px]">
              <SearchInput />
            </div>

            {/* Mobile Search Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                {user?.username && (
                  <span className="hidden md:block text-sm font-medium">{user.username}</span>
                )}
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Panel */}
      {showMobileSearch && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white p-4 border-b shadow-lg z-50">
          <SearchInput />
        </div>
      )}
    </>
  );
}

export default NavBar; 