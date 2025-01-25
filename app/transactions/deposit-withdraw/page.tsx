"use client"

import { useState } from "react"
import { 
  Search, 
  ChevronDown,
  ChevronRight,
  Calendar,
  FileText,
  Clock,
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Tag,
  Hash,
  Eye,
  MoreVertical
} from "lucide-react"

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed'
  created: string
  description: string
  transactionId: string
}

export default function DepositWithdrawPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const transactions: Transaction[] = [
    {
      id: "66061354",
      type: "deposit",
      amount: 64740,
      currency: "USD",
      status: "completed",
      created: "2024-01-15 10:48 PM UTC",
      description: "Deposit via ETH",
      transactionId: "tx_66061354"
    },
    {
      id: "66061353",
      type: "withdrawal",
      amount: 40000,
      currency: "USD",
      status: "pending",
      created: "2024-01-15 10:48 PM UTC",
      description: "Withdrawal request",
      transactionId: "tx_66061353"
    }
  ]

  const filteredTransactions = transactions.filter(tx => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        tx.id.toLowerCase().includes(query) ||
        tx.description.toLowerCase().includes(query) ||
        tx.transactionId.toLowerCase().includes(query)
      )
    }
    if (selectedType !== 'all' && tx.type !== selectedType) return false
    if (selectedStatus !== 'all' && tx.status !== selectedStatus) return false
    return true
  })

  return (
    <div className="p-4 sm:p-6 bg-[#F8F9FC] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <FileText className="h-4.5 w-4.5 text-[#18B69B]" />
          </div>
          <h1 className="text-[#2D3359] text-xl sm:text-2xl font-semibold">Transactions</h1>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-400 text-sm sm:text-base">Deposit/Withdraw</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <input
            type="text"
            placeholder="Search by ID, Description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 h-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all placeholder:text-gray-400"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 pl-3 pr-8 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all appearance-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-9 pl-3 pr-8 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all appearance-none"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="min-w-full overflow-x-auto">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-[#18B69B]/5 border-y border-gray-200">
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Clock className="h-3.5 w-3.5" />
                    Date
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Type
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <DollarSign className="h-3.5 w-3.5" />
                    Amount
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Status
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Tag className="h-3.5 w-3.5" />
                    Description
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Hash className="h-3.5 w-3.5" />
                    Transaction ID
                  </div>
                </th>
                <th className="text-right whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-[13px] text-gray-600">{tx.created}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {tx.type === 'deposit' ? (
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1cc88a]">
                          <ArrowDownCircle className="h-4 w-4" />
                          Deposit
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#e74a3b]">
                          <ArrowUpCircle className="h-4 w-4" />
                          Withdrawal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[13px] font-medium ${
                      tx.type === 'deposit' ? 'text-[#1cc88a]' : 'text-[#e74a3b]'
                    }`}>
                      {tx.type === 'deposit' ? '+' : '-'}${tx.amount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-md ${
                      tx.status === 'completed' 
                        ? 'bg-[#1cc88a]/10 text-[#1cc88a]'
                        : tx.status === 'pending'
                        ? 'bg-[#f6c23e]/10 text-[#f6c23e]'
                        : 'bg-[#e74a3b]/10 text-[#e74a3b]'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        tx.status === 'completed'
                          ? 'bg-[#1cc88a]'
                          : tx.status === 'pending'
                          ? 'bg-[#f6c23e]'
                          : 'bg-[#e74a3b]'
                      }`} />
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-[13px] text-gray-600">{tx.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="text-[13px] font-mono text-gray-600">{tx.transactionId}</code>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 