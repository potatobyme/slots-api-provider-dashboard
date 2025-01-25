"use client"

import { useState } from "react"
import { 
  Search, 
  ChevronDown, 
  ArrowUpDown,
  Calendar,
  Tag,
  MoreHorizontal,
  FileText,
  ChevronRight,
  Filter,
  RefreshCw,
  Download,
  Clock,
  DollarSign
} from "lucide-react"

interface Transaction {
  id: string
  date: string
  type: string
  amount: number
  status: string
  description: string
  transactionId: string
}

export default function DepositWithdrawTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2024-01-15 10:48 PM UTC",
      type: "deposit",
      amount: 64740,
      status: "completed",
      description: "Deposit via USDT",
      transactionId: "tx_66061354"
    },
    {
      id: "2",
      date: "2024-01-15 10:48 PM UTC",
      type: "withdrawal",
      amount: 40000,
      status: "pending",
      description: "Withdrawal request",
      transactionId: "tx_66061353"
    }
  ]

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedStatus !== "all" && transaction.status !== selectedStatus) return false
    if (selectedType !== "all" && transaction.type !== selectedType) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        transaction.transactionId.toLowerCase().includes(query) ||
        transaction.description.toLowerCase().includes(query)
      )
    }
    return true
  })

  const handleSort = (column: string) => {
    // Implement sorting logic here
    console.log("Sorting by:", column)
  }

  return (
    <div className="p-5 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[#5a5c69] text-2xl font-normal tracking-[-0.5px] flex items-center gap-2">
          <FileText className="h-6 w-6 text-[#18B69B]" />
          Transactions
          <ChevronRight className="h-5 w-5 text-[#858796]" />
          <span className="text-base text-[#858796] font-light">Deposit/Withdraw</span>
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search by ID, Description..."
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-[34px] px-3 text-[13px] text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>

          <button className="h-[34px] px-3 text-[13px] text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 flex items-center gap-1.5 transition-colors">
            <Calendar className="h-3.5 w-3.5" />
            Date Range
          </button>
          <button className="h-[34px] px-3 text-[13px] text-[#6e707e] bg-white border border-[#e3e6f0] rounded hover:bg-gray-50 flex items-center gap-1.5 transition-colors">
            <Filter className="h-3.5 w-3.5" />
            Filters
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
                    <Clock className="h-3.5 w-3.5" />
                    Date
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    Type
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    Amount
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    Status
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    Description
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    Transaction ID
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
              {filteredTransactions.map((transaction, index) => (
                <tr 
                  key={transaction.id} 
                  className={`
                    h-12 border-b border-[#e3e6f0] last:border-0
                    hover:bg-[#f8f9fc] transition-colors
                    ${index % 2 === 0 ? 'bg-white' : 'bg-[#fcfcfd]'}
                  `}
                >
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#858796]" />
                      {transaction.date}
                    </div>
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <span className="inline-flex items-center h-[20px] px-2.5 text-[11px] font-medium bg-[#18B69B]/10 text-[#18B69B] rounded-full capitalize">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 text-[13px] font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-[#858796]" />
                      <span className={transaction.type === 'deposit' ? 'text-[#1cc88a]' : 'text-[#e74a3b]'}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center h-[20px] px-2.5 text-[11px] font-medium rounded-full ${
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
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-[#858796]" />
                      {transaction.description}
                    </div>
                  </td>
                  <td className="px-4 text-[13px] font-mono text-[#858796] whitespace-nowrap">
                    {transaction.transactionId}
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button className="group p-1.5 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <MoreHorizontal className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
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