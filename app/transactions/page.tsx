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

export default function TransactionsPage() {
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

  const filteredTransactions = transactions.filter(tx => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        tx.id.toLowerCase().includes(query) ||
        tx.playerId.toLowerCase().includes(query) ||
        tx.username.toLowerCase().includes(query) ||
        tx.gameId.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <div className="p-4 sm:p-6 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <FileText className="h-4.5 w-4.5 text-[#18B69B]" />
          </div>
          <h1 className="text-[#2D3359] text-xl sm:text-2xl font-semibold">Transactions</h1>
        </div>
        <div className="flex items-center gap-2 text-[#858796]">
          <span className="text-xs sm:text-sm">Archive</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <input
              type="text"
              placeholder="Search by ID, Player ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 h-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all placeholder:text-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <button className="h-9 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all whitespace-nowrap">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
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
                    <Hash className="h-3.5 w-3.5" />
                    ID
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <User className="h-3.5 w-3.5" />
                    Player ID
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <User className="h-3.5 w-3.5" />
                    Username
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Operator
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Hash className="h-3.5 w-3.5" />
                    Round ID
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <GamepadIcon className="h-3.5 w-3.5" />
                    Game ID
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
                    Credit
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <DollarSign className="h-3.5 w-3.5" />
                    Debit
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Currency
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#18B69B] uppercase">
                    <Clock className="h-3.5 w-3.5" />
                    Created
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
                      <span className="text-[13px] font-medium text-[#18B69B]">{tx.id}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(tx.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-900">{tx.playerId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-900">{tx.username}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-600">{tx.operator}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="text-[13px] font-mono text-gray-600">{tx.roundId}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(tx.roundId)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-600">{tx.gameId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-[#18B69B] bg-[#18B69B]/5 rounded-md">
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] font-medium text-[#1cc88a]">
                      {tx.credit > 0 ? `+${tx.credit}` : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] font-medium text-[#e74a3b]">
                      {tx.debit > 0 ? `-${tx.debit}` : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-600">{tx.currency}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-600">{tx.created}</span>
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