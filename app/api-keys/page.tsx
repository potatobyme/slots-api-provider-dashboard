"use client"

import { useState } from "react"
import { 
  Search, 
  Copy, 
  Eye,
  EyeOff,
  Plus,
  X,
  Trash2,
  Filter,
  ChevronDown,
  Clock
} from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  status: "active" | "inactive"
}

const initialApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_live_123456789abcdefghijklmnopqrstuvwxyz",
    created: "2024-01-15 14:30 UTC",
    lastUsed: "2024-03-10 09:15 UTC",
    status: "active"
  },
  {
    id: "2",
    name: "Test API Key",
    key: "sk_test_987654321zyxwvutsrqponmlkjihgfedcba",
    created: "2024-02-20 11:45 UTC",
    lastUsed: "2024-03-09 16:20 UTC",
    status: "active"
  }
]

export default function ApiKeysPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys)
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(new Set())

  const toggleKeyVisibility = (keyId: string) => {
    const newHiddenKeys = new Set(hiddenKeys)
    if (hiddenKeys.has(keyId)) {
      newHiddenKeys.delete(keyId)
    } else {
      newHiddenKeys.add(keyId)
    }
    setHiddenKeys(newHiddenKeys)
  }

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault()
    const newKey: ApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      lastUsed: 'Never',
      status: "active"
    }
    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setShowCreateForm(false)
  }

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId))
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    // You could add a toast notification here
  }

  return (
    <div className="p-6 space-y-4 bg-[#F8F9FC] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-medium text-gray-800">API Keys</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search API keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[250px] pl-9 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#18B69B] focus:border-[#18B69B] transition-all"
            />
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#18B69B] rounded-md hover:bg-[#18B69B]/90 transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Create API Key
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <Filter className="h-3.5 w-3.5" />
            Filters
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Create New API Key</h2>
                <p className="text-sm text-gray-500 mt-1">Enter a name for your new API key</p>
              </div>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateKey} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Production API Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-[#18B69B] focus:border-[#18B69B] placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#18B69B] rounded-md hover:bg-[#18B69B]/90 transition-all shadow-sm hover:shadow active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  Create Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* API Keys Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{apiKey.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <code className="px-1.5 py-0.5 text-xs font-mono text-gray-600 bg-gray-50 rounded">
                        {hiddenKeys.has(apiKey.id) ? '••••••••••••••••' : apiKey.key}
                      </code>
                      <button 
                        onClick={() => handleCopyKey(apiKey.key)}
                        className="p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        {hiddenKeys.has(apiKey.id) ? (
                          <Eye className="h-3.5 w-3.5" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-sm text-gray-600">{apiKey.created}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{apiKey.lastUsed}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                      apiKey.status === 'active' 
                        ? 'text-emerald-700 bg-emerald-50' 
                        : 'text-red-700 bg-red-50'
                    }`}>
                      {apiKey.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDeleteKey(apiKey.id)}
                      className="p-0.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-2.5 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing <span className="font-medium">{apiKeys.length}</span> results
            </p>
            <div className="flex items-center gap-1.5">
              <button 
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                disabled
              >
                Previous
              </button>
              <button 
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 