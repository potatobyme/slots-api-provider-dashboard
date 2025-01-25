"use client"

import { useState } from "react"
import { 
  Search, 
  ChevronDown, 
  Eye,
  ArrowUpDown,
  ChevronRight,
  Calendar,
  Filter,
  Copy,
  MoreVertical,
  RefreshCw,
  Download,
  FileText,
  Clock,
  User,
  GamepadIcon,
  DollarSign,
  Hash
} from "lucide-react"

interface Transaction {
  id: string
  playerId: string
  username: string
  operator: string
  roundId: string
  gameId: string
  type: string
  credit: number
  debit: number
  currency: string
  created: string
}

const TransactionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const transactions: Transaction[] = [
    {
      id: "66061354",
      playerId: "349115",
      username: "Blazed_USD",
      operator: "134",
      roundId: "hac-69e1164e833358d1aeda417a5bbf636e",
      gameId: "hacksaw/DorkUnit",
      type: "spin",
      credit: 64740,
      debit: 0,
      currency: "USD",
      created: "01/15/2025, 10:48 PM UTC"
    },
    {
      id: "66061353",
      playerId: "349115",
      username: "Blazed_USD",
      operator: "134",
      roundId: "hac-69e1164e833358d1aeda417a5bbf636e",
      gameId: "hacksaw/DorkUnit",
      type: "spin",
      credit: 0,
      debit: 40000,
      currency: "USD",
      created: "01/15/2025, 10:48 PM UTC"
    }
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.gameId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-5 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[#5a5c69] text-2xl font-normal tracking-[-0.5px] flex items-center gap-2">
          <FileText className="h-6 w-6 text-[#18B69B]" />
          Transactions
          <ChevronRight className="h-5 w-5 text-[#858796]" />
          <span className="text-base text-[#858796] font-light">Archive - 10 Days</span>
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search by ID, Username, Game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 h-[34px] text-[13px] border border-[#e3e6f0] rounded focus:outline-none focus:border-[#18B69B] focus:shadow-[0_0_0_1px_#18B69B20] transition-all placeholder:text-[#858796]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#858796]" />
        </div>

        <div className="flex items-center gap-2">
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
                    <Hash className="h-3.5 w-3.5" />
                    ID
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    Player ID
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    Username
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    Operator
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    Round ID
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <GamepadIcon className="h-3.5 w-3.5" />
                    Game ID
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
                    Credit
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    Debit
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    Currency
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Created
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
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
                  <td className="px-4 text-[13px] font-medium text-[#18B69B] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {transaction.id}
                      <button className="group p-1 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <Copy className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">{transaction.playerId}</td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">{transaction.username}</td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">{transaction.operator}</td>
                  <td className="px-4 text-[13px] font-mono text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {transaction.roundId}
                      <button className="group p-1 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <Copy className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">{transaction.gameId}</td>
                  <td className="px-4 whitespace-nowrap">
                    <span className="inline-flex items-center h-[20px] px-2.5 text-[11px] font-medium bg-[#18B69B]/10 text-[#18B69B] rounded-full">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 text-[13px] font-medium text-[#1cc88a] whitespace-nowrap">
                    {transaction.credit > 0 ? `+${transaction.credit}` : '-'}
                  </td>
                  <td className="px-4 text-[13px] font-medium text-[#e74a3b] whitespace-nowrap">
                    {transaction.debit > 0 ? `-${transaction.debit}` : '-'}
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">{transaction.currency}</td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">{transaction.created}</td>
                  <td className="px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button className="group p-1.5 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <Eye className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                      <button className="group p-1.5 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <MoreVertical className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
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

export default TransactionsPage 