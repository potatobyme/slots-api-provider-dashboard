"use client"

import { useState } from "react"
import { 
  Search, 
  ChevronRight,
  ArrowUpDown,
  Plus,
  X,
  Trash2,
  Hash,
  User,
  Shield,
  Copy
} from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  status: "active" | "disabled"
}

export default function ApiKeysPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "649115",
      name: "Production API Key",
      key: "sk_live_51NyPFgBXuiLPyGPT8KlVZ9Kj",
      created: "2024-01-15 10:48 PM UTC",
      lastUsed: "2024-01-15 11:30 PM UTC",
      status: "active"
    },
    {
      id: "649116",
      name: "Test API Key",
      key: "sk_test_51NyPFgBXuiLPyGPT8KlVZ9Kj",
      created: "2024-01-14 09:30 PM UTC",
      lastUsed: "2024-01-15 10:15 PM UTC",
      status: "disabled"
    }
  ])

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault()
    const newKey: ApiKey = {
      id: Math.random().toString().slice(2, 8),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      lastUsed: 'Never',
      status: "active"
    }
    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setShowCreateModal(false)
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const handleCopyKey = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const filteredKeys = apiKeys.filter(key => {
    if (selectedStatus !== "all" && key.status !== selectedStatus) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        key.name.toLowerCase().includes(query) ||
        key.id.toLowerCase().includes(query) ||
        key.key.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <div className="p-5 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[#5a5c69] text-2xl font-normal tracking-[-0.5px] flex items-center gap-2">
          <Hash className="h-6 w-6 text-[#18B69B]" />
          API Keys
          <ChevronRight className="h-5 w-5 text-[#858796]" />
          <span className="text-base text-[#858796] font-light">Management</span>
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search by ID, Name, Key..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 h-[34px] text-[13px] border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all placeholder:text-[#858796]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#858796]" />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-[34px] px-3 text-[13px] text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="h-[34px] px-3 text-[13px] text-white bg-[#18B69B] rounded hover:bg-[#18B69B]/90 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Create API Key
          </button>
          <button className="h-[34px] w-[34px] flex items-center justify-center text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button className="h-[34px] w-[34px] flex items-center justify-center text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 transition-colors">
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e3e6f0] rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#18B69B]/5 border-y border-[#e3e6f0]">
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    ID
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    Name
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    API Key
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    Created
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    Last Used
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    Status
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredKeys.map((key, index) => (
                <tr 
                  key={key.id} 
                  className={`
                    h-12 border-b border-[#e3e6f0] last:border-0
                    hover:bg-[#f8f9fc] transition-colors
                    ${index % 2 === 0 ? 'bg-white' : 'bg-[#fcfcfd]'}
                  `}
                >
                  <td className="px-4 text-[13px] font-medium text-[#18B69B] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {key.id}
                      <button className="group p-1 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <Copy className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-[#858796]" />
                      {key.name}
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-[#858796]" />
                      {key.key}
                      <button 
                        onClick={() => handleCopyKey(key.key)}
                        className="group p-1 hover:bg-[#18B69B]/10 rounded transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-[#858796]" />
                      {key.created}
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-[#858796]" />
                      {key.lastUsed}
                    </div>
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center h-[20px] px-2.5 text-[11px] font-medium rounded-full ${
                      key.status === 'active' 
                        ? 'text-[#18B69B] bg-[#18B69B]/10'
                        : 'text-red-700 bg-red-50'
                    }`}>
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        key.status === 'active'
                          ? 'bg-[#18B69B]'
                          : 'bg-red-500'
                      }`} />
                      {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleDeleteKey(key.id)}
                        className="group p-1.5 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-[#858796] group-hover:text-red-600 transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b border-[#e3e6f0]">
              <div>
                <h2 className="text-lg font-semibold text-[#5a5c69]">Create New API Key</h2>
                <p className="text-sm text-[#858796] mt-1">Enter a name for your new API key</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#858796]" />
              </button>
            </div>
            <form onSubmit={handleCreateKey} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">API Key Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Production API Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all placeholder:text-[#858796]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#e3e6f0]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-[#18B69B] rounded hover:bg-[#18B69B]/90 transition-colors"
                >
                  Create Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 