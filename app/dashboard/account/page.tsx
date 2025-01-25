"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { 
  User,
  Settings,
  Plus,
  X,
  Globe,
  Percent,
  Calendar,
  Users,
  DollarSign,
  Share2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Wallet,
  Mail,
  Link,
  Shield,
  Power,
  RefreshCw,
  MoreVertical,
  Search,
  Filter
} from "lucide-react"
import { gql } from "@apollo/client"

const GET_AGENTS = gql`
  query GetAgents {
    getAgents {
      id
      username
      email
      currency
      callbackUrl
      ggrPercentage
      balance
      agentSettings {
        profitShare
      }
      status
      createdAt
    }
  }
`;

const CREATE_AGENT = gql`
  mutation CreateAgent($input: CreateAgentInput!) {
    createAgent(input: $input) {
      success
      agent {
        id
        username
        email
      }
      error
    }
  }
`;

const UPDATE_AGENT_BALANCE = gql`
  mutation UpdateAgentBalance($agentId: ID!, $amount: Float!) {
    updateAgentBalance(agentId: $agentId, amount: $amount)
  }
`;

const TOGGLE_AGENT_STATUS = gql`
  mutation ToggleAgentStatus($agentId: ID!) {
    toggleAgentStatus(agentId: $agentId) {
      id
      status
    }
  }
`;

const GET_BALANCE = gql`
  query GetBalance {
    getBalance
  }
`;

export default function AccountPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showBalanceModal, setShowBalanceModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [amount, setAmount] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    currency: 'USD',
    callbackUrl: '',
    ggrPercentage: 0,
    agentSettings: {
      profitShare: 0
    }
  })

  const { data, loading, refetch } = useQuery(GET_AGENTS)
  const [createAgent] = useMutation(CREATE_AGENT)
  const [updateAgentBalance] = useMutation(UPDATE_AGENT_BALANCE)
  const [toggleAgentStatus] = useMutation(TOGGLE_AGENT_STATUS)
  const { data: balanceData } = useQuery(GET_BALANCE)

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await createAgent({
        variables: {
          input: formData
        }
      })

      if (data?.createAgent.success) {
        setShowCreateModal(false)
        refetch()
      }
    } catch (error) {
      console.error('Failed to create agent:', error)
    }
  }

  const handleUpdateBalance = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateAgentBalance({
        variables: {
          agentId: selectedAgent.id,
          amount: parseFloat(amount)
        },
        refetchQueries: [
          { query: GET_AGENTS },
          { query: GET_BALANCE }
        ]
      })
      setShowBalanceModal(false)
      setSelectedAgent(null)
      setAmount('')
    } catch (error) {
      console.error('Failed to update balance:', error)
    }
  }

  const handleToggleStatus = async (agent: any) => {
    try {
      await toggleAgentStatus({
        variables: {
          agentId: agent.id
        }
      })
      refetch()
    } catch (error) {
      console.error('Failed to toggle status:', error)
    }
  }

  return (
    <div className="p-4 sm:p-6 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <Users className="h-4.5 w-4.5 text-[#18B69B]" />
          </div>
          <h1 className="text-[#2D3359] text-xl sm:text-2xl font-semibold">Agent Management</h1>
        </div>
        <div className="flex items-center gap-2 text-[#858796]">
          <span className="text-xs sm:text-sm">Manage your agents and their balances</span>
        </div>
      </div>

      {/* Balance Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm text-gray-600">Total Agents</p>
            <p className="text-xl font-semibold text-gray-900">{data?.getAgents.length || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-green-500" />
            </div>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm text-gray-600">Total Balance</p>
            <p className="text-xl font-semibold text-gray-900">
              ${data?.getAgents.reduce((sum: number, agent: any) => sum + agent.balance, 0).toFixed(2) || '0.00'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
              <Shield className="h-4 w-4 text-purple-500" />
            </div>
            <Power className="h-4 w-4 text-green-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm text-gray-600">Active Agents</p>
            <p className="text-xl font-semibold text-gray-900">
              {data?.getAgents.filter((agent: any) => agent.status === 'active').length || 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center">
              <Percent className="h-4 w-4 text-orange-500" />
            </div>
            <RefreshCw className="h-4 w-4 text-gray-400" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm text-gray-600">Avg. GGR %</p>
            <p className="text-xl font-semibold text-gray-900">
              {data?.getAgents.length 
                ? (data.getAgents.reduce((sum: number, agent: any) => sum + agent.ggrPercentage, 0) / data.getAgents.length).toFixed(1)
                : '0.0'}%
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search agents..."
              className="w-64 h-9 pl-9 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button className="h-9 px-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="h-9 px-3 text-sm text-white bg-[#18B69B] rounded-lg hover:bg-[#18B69B]/90 flex items-center gap-2 transition-all shadow-sm hover:shadow"
        >
          <Plus className="h-4 w-4" />
          <span>Add Agent</span>
        </button>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#18B69B]/5 border-y border-gray-200">
                <th className="text-left whitespace-nowrap px-4 py-3 w-[220px]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <User className="h-3.5 w-3.5" />
                    Agent
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3 w-[200px]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3 w-[100px]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <DollarSign className="h-3.5 w-3.5" />
                    Currency
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3 w-[120px]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Wallet className="h-3.5 w-3.5" />
                    Balance
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3 w-[100px]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Percent className="h-3.5 w-3.5" />
                    GGR %
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3 w-[120px]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Share2 className="h-3.5 w-3.5" />
                    Profit Share
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3 w-[120px]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Shield className="h-3.5 w-3.5" />
                    Status
                  </div>
                </th>
                <th className="text-right whitespace-nowrap px-4 py-3 w-[120px]">
                  <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Settings className="h-3.5 w-3.5" />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500 min-h-[200px]">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Loading agents...
                    </div>
                  </td>
                </tr>
              ) : data?.getAgents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500 min-h-[200px]">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-8 w-8 text-gray-400" />
                      <p>No agents found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.getAgents.map((agent: any) => (
                  <tr key={agent.id} className="hover:bg-gray-50/50 transition-colors min-h-[64px]">
                    <td className="px-4 py-3 w-[220px]">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-[#18B69B]/5 flex items-center justify-center">
                          <User className="h-4 w-4 text-[#18B69B]" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{agent.username}</div>
                          <div className="text-xs text-gray-500">ID: {agent.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[200px]">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate max-w-[150px]">{agent.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[100px]">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{agent.currency}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[120px]">
                      <div className="flex items-center gap-1.5">
                        <Wallet className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-900">${agent.balance.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[100px]">
                      <div className="flex items-center gap-1.5">
                        <Percent className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{agent.ggrPercentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[120px]">
                      <div className="flex items-center gap-1.5">
                        <Share2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{agent.agentSettings.profitShare}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[120px]">
                      <span className={`inline-flex items-center justify-center w-[90px] h-[26px] gap-1.5 text-xs font-medium rounded-full ${
                        agent.status === 'active' 
                          ? 'text-green-700 bg-green-50 border border-green-200' 
                          : 'text-red-700 bg-red-50 border border-red-200'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                          agent.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-[120px]">
                      <div className="flex items-center justify-end gap-2 h-[32px]">
                        <button
                          onClick={() => {
                            setSelectedAgent(agent)
                            setShowBalanceModal(true)
                          }}
                          className="p-1 text-gray-400 hover:text-[#18B69B] hover:bg-[#18B69B]/5 rounded transition-colors"
                          title="Update Balance"
                        >
                          <Wallet className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(agent)}
                          className={`p-1 rounded transition-colors ${
                            agent.status === 'active'
                              ? 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                              : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                          }`}
                          title={agent.status === 'active' ? 'Disable Agent' : 'Enable Agent'}
                        >
                          <Power className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"
                          title="More Options"
                        >
                          <MoreVertical className="h-4 w-4" />
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

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-4 border-b border-[#e3e6f0]">
              <div>
                <h2 className="text-lg font-semibold text-[#5a5c69]">Create New Agent</h2>
                <p className="text-sm text-[#858796] mt-1">Enter agent details and settings</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#858796]" />
              </button>
            </div>
            <form onSubmit={handleCreateAgent} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">Callback URL</label>
                  <input
                    type="url"
                    value={formData.callbackUrl}
                    onChange={(e) => setFormData({...formData, callbackUrl: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
                    placeholder="https://"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">GGR Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.ggrPercentage}
                    onChange={(e) => setFormData({
                      ...formData,
                      ggrPercentage: Number(e.target.value)
                    })}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5a5c69] mb-1">Profit Share (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.agentSettings.profitShare}
                    onChange={(e) => setFormData({
                      ...formData,
                      agentSettings: {
                        ...formData.agentSettings,
                        profitShare: Number(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
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
                  Create Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Balance Update Modal */}
      {showBalanceModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-[#e3e6f0]">
              <div>
                <h2 className="text-lg font-semibold text-[#5a5c69]">Update Agent Balance</h2>
                <p className="text-sm text-[#858796] mt-1">
                  Your balance: ${balanceData?.getBalance.toFixed(2) || '0.00'}
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowBalanceModal(false)
                  setSelectedAgent(null)
                  setAmount('')
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#858796]" />
              </button>
            </div>
            <form onSubmit={handleUpdateBalance} className="p-4">
              <div>
                <label className="block text-sm font-medium text-[#5a5c69] mb-1">Amount</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
                  placeholder="Enter amount (use negative for withdrawal)"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#e3e6f0]">
                <button
                  type="button"
                  onClick={() => {
                    setShowBalanceModal(false)
                    setSelectedAgent(null)
                    setAmount('')
                  }}
                  className="px-4 py-2 text-sm text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-[#18B69B] rounded hover:bg-[#18B69B]/90 transition-colors"
                >
                  Update Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 