"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
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
  Copy,
  RotateCw,
  Download,
  RefreshCw,
  Clock,
  Power
} from "lucide-react"
import { GET_API_KEYS, CREATE_API_KEY, DELETE_API_KEY, TOGGLE_API_KEY_STATUS } from "@/lib/graphql/api-keys"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
  status: "active" | "disabled"
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Never';
  
  try {
    // Eğer timestamp olarak geldiyse (number string)
    if (!isNaN(Number(dateString))) {
      const timestamp = Number(dateString);
      const date = new Date(timestamp);
      return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    }

    // ISO string olarak geldiyse
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    }

    return 'Invalid Date';
  } catch (error) {
    console.error('Date parsing error:', error);
    return 'Invalid Date';
  }
};

export default function ApiKeysPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [showNewKey, setShowNewKey] = useState<{key: string, name: string} | null>(null)

  const { data, loading, refetch } = useQuery(GET_API_KEYS, {
    fetchPolicy: 'network-only'
  })
  const [createApiKey] = useMutation(CREATE_API_KEY)
  const [deleteApiKey] = useMutation(DELETE_API_KEY)
  const [toggleApiKeyStatus] = useMutation(TOGGLE_API_KEY_STATUS)

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await createApiKey({
        variables: {
          input: { name: newKeyName }
        }
      })

      if (data?.createApiKey.success) {
        setShowNewKey({
          key: data.createApiKey.apiKey.key,
          name: data.createApiKey.apiKey.name
        })
        setNewKeyName("")
        setShowCreateModal(false)
        refetch()
      }
    } catch (error) {
      console.error('Failed to create API key:', error)
    }
  }

  const handleDeleteKey = async (id: string) => {
    try {
      await deleteApiKey({
        variables: { id }
      })
      refetch()
    } catch (error) {
      console.error('Failed to delete API key:', error)
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleApiKeyStatus({
        variables: { id }
      })
      refetch()
    } catch (error) {
      console.error('Failed to toggle API key status:', error)
    }
  }

  const handleCopyKey = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const filteredKeys = data?.getApiKeys.filter((key: ApiKey) => {
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
  }) || []

  return (
    <div className="p-4 sm:p-6 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <Hash className="h-4.5 w-4.5 text-[#18B69B]" />
          </div>
          <h1 className="text-[#2D3359] text-xl sm:text-2xl font-semibold">API Keys</h1>
        </div>
        <div className="flex items-center gap-2 text-[#858796]">
          <span className="text-xs sm:text-sm">Management</span>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 h-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all placeholder:text-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => refetch()}
            className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="h-9 px-3 text-sm text-white bg-[#18B69B] rounded-lg hover:bg-[#18B69B]/90 flex items-center gap-2 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Create API Key</span>
          </button>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="min-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-[#18B69B]/5 border-y border-gray-200">
                  <th className="w-[10%] text-left whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                      <Hash className="h-3.5 w-3.5" />
                      ID
                      <ArrowUpDown className="h-3 w-3 opacity-50" />
                    </div>
                  </th>
                  <th className="w-[15%] text-left whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                      <User className="h-3.5 w-3.5" />
                      Name
                      <ArrowUpDown className="h-3 w-3 opacity-50" />
                    </div>
                  </th>
                  <th className="w-[30%] text-left whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                      <Shield className="h-3.5 w-3.5" />
                      API Key
                    </div>
                  </th>
                  <th className="w-[15%] text-left whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                      <Clock className="h-3.5 w-3.5" />
                      Created
                      <ArrowUpDown className="h-3 w-3 opacity-50" />
                    </div>
                  </th>
                  <th className="w-[15%] text-left whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                      <Clock className="h-3.5 w-3.5" />
                      Last Used
                      <ArrowUpDown className="h-3 w-3 opacity-50" />
                    </div>
                  </th>
                  <th className="w-[8%] text-left whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                      <Shield className="h-3.5 w-3.5" />
                      Status
                    </div>
                  </th>
                  <th className="w-[7%] text-right whitespace-nowrap px-4 py-3">
                    <div className="text-[11px] font-semibold text-[#18B69B] uppercase">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      Loading API keys...
                    </td>
                  </tr>
                ) : filteredKeys.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No API keys found
                    </td>
                  </tr>
                ) : (
                  filteredKeys.map((key: ApiKey) => (
                    <tr key={key.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-[#18B69B] truncate">{key.id}</span>
                          <button 
                            onClick={() => handleCopyKey(key.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all flex-shrink-0"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-[200px]">
                          <span className="text-[13px] text-gray-900 truncate block" title={key.name}>{key.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <code className="text-[13px] font-mono text-gray-600 truncate">{key.key}</code>
                          <button 
                            onClick={() => handleCopyKey(key.key)}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all flex-shrink-0"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[13px] text-gray-600">{formatDate(key.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[13px] text-gray-600">{formatDate(key.lastUsed)}</span>
                      </td>
                      <td className="px-4 py-3">
                        {key.status === "active" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-[#18B69B] bg-[#18B69B]/5 rounded-md">
                            <span className="h-1 w-1 rounded-full bg-[#18B69B]" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-red-600 bg-red-50 rounded-md">
                            <span className="h-1 w-1 rounded-full bg-red-500" />
                            Disabled
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => handleToggleStatus(key.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                          >
                            <Power className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteKey(key.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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

      {/* Show New API Key Modal */}
      {showNewKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b border-[#e3e6f0]">
              <div>
                <h2 className="text-lg font-semibold text-[#5a5c69]">API Key Created</h2>
                <p className="text-sm text-[#858796] mt-1">Please copy your API key now. You won't be able to see it again!</p>
              </div>
              <button 
                onClick={() => setShowNewKey(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#858796]" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">API Key Name</label>
                  <p className="text-sm text-gray-600">{showNewKey.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">API Key</label>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <code className="text-sm font-mono text-gray-900 flex-1 break-all">{showNewKey.key}</code>
                    <button 
                      onClick={() => handleCopyKey(showNewKey.key)}
                      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 pt-4 border-t border-[#e3e6f0]">
                <button
                  onClick={() => setShowNewKey(null)}
                  className="px-4 py-2 text-sm text-white bg-[#18B69B] rounded hover:bg-[#18B69B]/90 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 