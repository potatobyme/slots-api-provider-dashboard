"use client"

import { useState } from "react"
import { 
  Search, 
  Eye,
  Copy, 
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  ChevronDown,
  Plus,
  X,
  Save,
  User,
  ChevronRight,
  FileText,
  Users,
  Hash,
  Mail,
  Clock,
  DollarSign,
  Shield
} from "lucide-react"

interface AccountData {
  id: string
  name: string
  email: string
  created: string
  billingBalance: number
  billingCycleLimit: number
  apiAccess: boolean
  paymentAddress: string
}

interface AgentFormData {
  email: string
  password: string
  agentCode: string
  ggrToken: string
  agentSecret: string
  agentCurrency: string
  callbackUrl: string
  status: boolean
}

const accountData: AccountData[] = [
  {
    id: "83",
    name: "Doubleit",
    email: "Doubleitcorp@gmail.com",
    created: "01/05/2025, 02:22 PM UTC",
    billingBalance: 14.98,
    billingCycleLimit: 16.48,
    apiAccess: true,
    paymentAddress: "0xa38b04735C44F5e8ca6EAbFb3611E068F323a31f"
  },
  {
    id: "84",
    name: "Betmaster",
    email: "betmaster@gmail.com",
    created: "01/06/2025, 03:15 PM UTC",
    billingBalance: 25.75,
    billingCycleLimit: 30.00,
    apiAccess: true,
    paymentAddress: "0xb42c04845C44F5e8ca6EAbFb3611E068F323b42d"
  },
  {
    id: "85",
    name: "GameHub",
    email: "gamehub@gmail.com",
    created: "01/07/2025, 11:30 AM UTC",
    billingBalance: 8.25,
    billingCycleLimit: 20.00,
    apiAccess: false,
    paymentAddress: "0xc51d14935C44F5e8ca6EAbFb3611E068F323c51d"
  },
  {
    id: "86",
    name: "SlotKings",
    email: "slotkings@gmail.com",
    created: "01/08/2025, 09:45 AM UTC",
    billingBalance: 32.50,
    billingCycleLimit: 40.00,
    apiAccess: true,
    paymentAddress: "0xd60e25a45C44F5e8ca6EAbFb3611E068F323d60e"
  },
  {
    id: "87",
    name: "CasinoPlus",
    email: "casinoplus@gmail.com",
    created: "01/09/2025, 04:20 PM UTC",
    billingBalance: 18.30,
    billingCycleLimit: 25.00,
    apiAccess: false,
    paymentAddress: "0xe7f136b55C44F5e8ca6EAbFb3611E068F323e7f1"
  }
]

const initialAgentForm: AgentFormData = {
  email: "",
  password: "",
  agentCode: "",
  ggrToken: "",
  agentSecret: "",
  agentCurrency: "USD",
  callbackUrl: "",
  status: true
}

export default function AccountPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAgentForm, setShowAgentForm] = useState(false)
  const [agentForm, setAgentForm] = useState<AgentFormData>(initialAgentForm)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AccountData
    direction: "asc" | "desc"
  } | null>(null)

  const handleSort = (key: keyof AccountData) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === "asc" ? "desc" : "asc"
    }))
  }

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(agentForm)
    setShowAgentForm(false)
    setAgentForm(initialAgentForm)
  }

  const filteredAccounts = accountData.filter(account => {
    const searchLower = searchQuery.toLowerCase()
    return (
      account.name.toLowerCase().includes(searchLower) ||
      account.email.toLowerCase().includes(searchLower) ||
      account.id.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="p-6 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <Users className="h-4.5 w-4.5 text-[#18B69B]" />
          </div>
          <h1 className="text-[#2D3359] text-2xl font-semibold">Account Management</h1>
        </div>
        <div className="flex items-center gap-2 text-[#858796]">
          <span className="text-sm">Overview</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-sm text-[#18B69B]">All Accounts</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all placeholder:text-gray-400"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 flex items-center gap-2 transition-all">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button 
            onClick={() => setShowAgentForm(true)}
            className="h-10 px-4 text-sm text-white bg-[#18B69B] rounded-lg hover:bg-[#18B69B]/90 flex items-center gap-2 transition-all shadow-sm hover:shadow"
          >
            <Plus className="h-4 w-4" />
            Add Agent
          </button>
        </div>
      </div>

      {/* Account Table */}
      <div className="bg-white border border-[#e3e6f0] rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#18B69B]/5 border-y border-[#e3e6f0]">
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <button 
                    className="flex items-center gap-1.5 hover:text-[#18B69B]/80"
                    onClick={() => handleSort("id")}
                  >
                    <Hash className="h-3.5 w-3.5" />
                    ID
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </button>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <button 
                    className="flex items-center gap-1.5 hover:text-[#18B69B]/80"
                    onClick={() => handleSort("name")}
                  >
                    <User className="h-3.5 w-3.5" />
                    Name
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </button>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Created
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    Balance
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    Limit
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    API
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Payment Address
                  </div>
                </th>
                <th className="h-11 px-4 text-right text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#18B69B]/5 text-[#18B69B]">
                      {account.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-7 w-7 flex-shrink-0 rounded-full bg-[#18B69B]/5 flex items-center justify-center">
                        <User className="h-3.5 w-3.5 text-[#18B69B]" />
                      </div>
                      <div className="ml-2.5">
                        <div className="text-[13px] font-medium text-gray-900">{account.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[13px] text-gray-600">{account.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[13px] text-gray-600">{account.created}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[13px] font-medium text-gray-900">
                      ${account.billingBalance.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[13px] font-medium text-gray-900">
                      ${account.billingCycleLimit.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {account.apiAccess ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-[#18B69B] bg-[#18B69B]/5 rounded-md">
                        <CheckCircle2 className="h-3 w-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-red-600 bg-red-50/50 rounded-md">
                        <span className="h-1 w-1 rounded-full bg-red-500" />
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 max-w-[200px]">
                      <code className="px-2 py-0.5 text-[11px] font-mono text-gray-600 bg-gray-50/75 rounded truncate flex-1">
                        {account.paymentAddress}
                      </code>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <button 
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                          title="Copy address"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                          title="View details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all group"
                      title="More options"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5 group-hover:scale-105 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-gray-500">
              Showing <span className="font-medium">{filteredAccounts.length}</span> of <span className="font-medium">{accountData.length}</span> results
            </p>
            <div className="flex items-center gap-1.5">
              <button 
                className="px-2.5 py-1 text-[13px] text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
                disabled
              >
                Previous
              </button>
              <button 
                className="px-2.5 py-1 text-[13px] text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Form Modal */}
      {showAgentForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Add New Agent</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the information to create a new agent</p>
              </div>
              <button 
                onClick={() => setShowAgentForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAgentSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={agentForm.email}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 focus:border-[#18B69B] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter password"
                      value={agentForm.password}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 focus:border-[#18B69B] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Agent Code</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter agent code"
                      value={agentForm.agentCode}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, agentCode: e.target.value }))}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 focus:border-[#18B69B] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Agent Currency</label>
                    <select
                      value={agentForm.agentCurrency}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, agentCurrency: e.target.value }))}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 focus:border-[#18B69B] bg-white"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">GGR Token</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter GGR token"
                      value={agentForm.ggrToken}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, ggrToken: e.target.value }))}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 focus:border-[#18B69B] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Agent Secret</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter agent secret"
                      value={agentForm.agentSecret}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, agentSecret: e.target.value }))}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 focus:border-[#18B69B] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Callback URL</label>
                    <input
                      type="url"
                      required
                      placeholder="Enter callback URL"
                      value={agentForm.callbackUrl}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, callbackUrl: e.target.value }))}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 focus:border-[#18B69B] placeholder:text-gray-400"
                    />
                  </div>
                  <div className="pt-2 md:pt-4">
                    <label className="relative inline-flex items-center cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={agentForm.status}
                        onChange={(e) => setAgentForm(prev => ({ ...prev, status: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#18B69B]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#18B69B]"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">Active Status</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowAgentForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#18B69B] hover:bg-[#18B69B]/90 rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 