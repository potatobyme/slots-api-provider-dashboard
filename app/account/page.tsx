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
  Save
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

const accountData: AccountData = {
  id: "83",
  name: "Doubleit",
  email: "Doubleitcorp@gmail.com",
  created: "01/05/2025, 02:22 PM UTC",
  billingBalance: 14.98,
  billingCycleLimit: 16.48,
  apiAccess: true,
  paymentAddress: "0xa38b04735C44F5e8ca6EAbFb3611E068F323a31f"
}

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

  return (
    <div className="p-6 space-y-4 bg-[#F8F9FC] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-medium text-gray-800">Account</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[250px] pl-9 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowAgentForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            Add Agent
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <Filter className="h-3.5 w-3.5" />
            Filters
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Agent Form Modal */}
      {showAgentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Add New Agent</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the information to create a new agent</p>
              </div>
              <button 
                onClick={() => setShowAgentForm(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAgentSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="agent@example.com"
                      value={agentForm.email}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={agentForm.password}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Code</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter agent code"
                      value={agentForm.agentCode}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, agentCode: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Currency</label>
                    <select
                      value={agentForm.agentCurrency}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, agentCurrency: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">GGR Token</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter GGR token"
                      value={agentForm.ggrToken}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, ggrToken: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Secret</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter agent secret"
                      value={agentForm.agentSecret}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, agentSecret: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Callback URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://"
                      value={agentForm.callbackUrl}
                      onChange={(e) => setAgentForm(prev => ({ ...prev, callbackUrl: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">Active Status</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAgentForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all shadow-sm hover:shadow active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  Create Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center gap-1.5 hover:text-gray-700"
                    onClick={() => handleSort("id")}
                  >
                    ID
                    <ArrowUpDown className="h-3 w-3 text-gray-400" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center gap-1.5 hover:text-gray-700"
                    onClick={() => handleSort("name")}
                  >
                    Name
                    <ArrowUpDown className="h-3 w-3 text-gray-400" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Address</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600">{accountData.id}</td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-gray-900">{accountData.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">{accountData.email}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">{accountData.created}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-gray-900">${accountData.billingBalance}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-gray-900">${accountData.billingCycleLimit}</span>
                </td>
                <td className="px-4 py-3">
                  {accountData.apiAccess ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                      <CheckCircle2 className="h-3 w-3" />
                      On
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-50 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Off
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <code className="px-1.5 py-0.5 text-xs font-mono text-gray-600 bg-gray-50 rounded">
                      {accountData.paymentAddress}
                    </code>
                    <button className="p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-2.5 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing <span className="font-medium">1</span> of <span className="font-medium">1</span> result
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