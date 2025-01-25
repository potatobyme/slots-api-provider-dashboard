"use client"

// Mevcut transactions sayfasının tüm içeriğini buraya kopyalıyorum
import { useState } from "react"
import { 
  Search, 
  Filter,
  ChevronDown,
  ArrowUpDown,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Calendar,
  DollarSign,
  Tag,
  MoreHorizontal
} from "lucide-react"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  currency: string
  status: "completed" | "pending" | "failed"
  description: string
  date: string
  transactionId: string
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 500.00,
    currency: "USD",
    status: "completed",
    description: "Deposit from **** 1234",
    date: "2024-03-10 15:30 UTC",
    transactionId: "txn_1234567890"
  },
  {
    id: "2",
    type: "withdrawal",
    amount: 150.00,
    currency: "USD",
    status: "completed",
    description: "Withdrawal to **** 5678",
    date: "2024-03-09 12:45 UTC",
    transactionId: "txn_0987654321"
  },
  {
    id: "3",
    type: "deposit",
    amount: 1000.00,
    currency: "USD",
    status: "pending",
    description: "Deposit from **** 9012",
    date: "2024-03-08 09:15 UTC",
    transactionId: "txn_5678901234"
  }
]

export default function DepositWithdrawTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction
    direction: "asc" | "desc"
  } | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === "asc" ? "desc" : "asc"
    }))
  }

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = 
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus
      const matchesType = selectedType === "all" || transaction.type === selectedType

      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      if (!sortConfig) return 0

      const { key, direction } = sortConfig
      const aValue = a[key]
      const bValue = b[key]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" 
          ? aValue - bValue
          : bValue - aValue
      }

      return 0
    })

  return (
    <div className="p-6 space-y-4 bg-[#F8F9FC] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-medium text-gray-800">Transactions Deposit/Withdraw</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[250px] pl-9 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#18B69B] focus:border-[#18B69B] transition-all"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#18B69B] focus:border-[#18B69B] transition-all"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#18B69B] focus:border-[#18B69B] transition-all"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>

          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <Calendar className="h-3.5 w-3.5" />
            Date Range
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-[#18B69B]/5 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#18B69B] uppercase tracking-wider">
                  <button 
                    className="flex items-center gap-1.5 hover:text-[#18B69B]"
                    onClick={() => handleSort("date")}
                  >
                    Date
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#18B69B] uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#18B69B] uppercase tracking-wider">
                  <button 
                    className="flex items-center gap-1.5 hover:text-[#18B69B]"
                    onClick={() => handleSort("amount")}
                  >
                    Amount
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#18B69B] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#18B69B] uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#18B69B] uppercase tracking-wider">Transaction ID</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-[#18B69B]/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-sm text-gray-600">{transaction.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {transaction.type === "deposit" ? (
                        <ArrowDownRight className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
                      )}
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {transaction.amount.toFixed(2)} {transaction.currency}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                      transaction.status === 'completed' 
                        ? 'text-[#18B69B] bg-[#18B69B]/10'
                        : transaction.status === 'pending'
                        ? 'text-yellow-700 bg-yellow-50'
                        : 'text-red-700 bg-red-50'
                    }`}>
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-[#18B69B]'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`} />
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-sm text-gray-600">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="px-1.5 py-0.5 text-xs font-mono text-gray-600 bg-gray-50 rounded">
                      {transaction.transactionId}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-0.5 text-gray-400 hover:text-[#18B69B] hover:bg-[#18B69B]/10 rounded transition-colors">
                      <MoreHorizontal className="h-3.5 w-3.5" />
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
              Showing <span className="font-medium">{filteredTransactions.length}</span> results
            </p>
            <div className="flex items-center gap-1.5">
              <button 
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-[#18B69B] hover:bg-[#18B69B]/10 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                disabled
              >
                Previous
              </button>
              <button 
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-[#18B69B] hover:bg-[#18B69B]/10 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
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