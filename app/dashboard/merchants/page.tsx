"use client"

import { useState } from "react"
import { 
  Search, 
  ChevronDown,
  ChevronRight,
  Calendar,
  FileText,
  Clock,
  Copy,
  Settings,
  DollarSign,
  Wallet,
  ArrowRight,
  Info,
  ArrowDownCircle,
  Filter
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface MerchantStats {
  todayPayments: number
  thisWeek: number
  thisMonth: number
  allTime: number
}

interface Merchant {
  id: string
  name: string
  login: string
  feePercent: number
  acceptedCoins: string[]
  autoConvertToUSDT: boolean
  autoWithdraw: boolean
  merchantAPIKey: string
}

interface MerchantTransaction {
  id: string
  merchantName: string
  type: string
  amount: string
  convertedTo: string
  status: string
  date: string
}

export default function MerchantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [transactionSearchQuery, setTransactionSearchQuery] = useState("")

  const stats: MerchantStats = {
    todayPayments: 0,
    thisWeek: 0,
    thisMonth: 3557,
    allTime: 48.3
  }

  const merchants: Merchant[] = [
    {
      id: "1",
      name: "zeroxjay2222",
      login: "zeroxjay2222",
      feePercent: 4.7,
      acceptedCoins: ["BTC", "ETH"],
      autoConvertToUSDT: false,
      autoWithdraw: false,
      merchantAPIKey: "UQRFG-HDSQW-SB"
    },
    {
      id: "2",
      name: "colorexpawn",
      login: "colorexpawn",
      feePercent: 5,
      acceptedCoins: ["BTC", "ETH"],
      autoConvertToUSDT: false,
      autoWithdraw: false,
      merchantAPIKey: "UVMBG-XZMWRL-GV"
    }
  ]

  const transactions: MerchantTransaction[] = [
    {
      id: "2222",
      merchantName: "Stats Wallet",
      type: "0.0088 ETH",
      amount: "0.0088 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 11:52:32"
    },
    {
      id: "zeroxjay2222",
      merchantName: "Stats Wallet",
      type: "0.00462768 ETH",
      amount: "0.00462768 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 12:28:24"
    },
    {
      id: "zeroxjay2222",
      merchantName: "Stats Wallet",
      type: "0.0001559 ETH",
      amount: "0.0001559 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 22:56:19"
    },
    {
      id: "zeroxjay2222",
      merchantName: "Stats Wallet",
      type: "0.00099 ETH",
      amount: "0.00099 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 22:28:35"
    },
    {
      id: "zeroxjay2222",
      merchantName: "Stats Wallet",
      type: "0.00099 ETH",
      amount: "0.00099 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 22:22:23"
    },
    {
      id: "colorexpawn",
      merchantName: "Color Exchange",
      type: "0.015 ETH",
      amount: "0.015 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 20:15:45"
    },
    {
      id: "colorexpawn",
      merchantName: "Color Exchange",
      type: "0.025 ETH",
      amount: "0.025 ETH",
      convertedTo: "-",
      status: "Pending",
      date: "1/5/2024, 19:30:12"
    },
    {
      id: "zeroxjay2222",
      merchantName: "Stats Wallet",
      type: "0.0075 ETH",
      amount: "0.0075 ETH",
      convertedTo: "-",
      status: "Failed",
      date: "1/5/2024, 18:45:33"
    },
    {
      id: "colorexpawn",
      merchantName: "Color Exchange",
      type: "0.012 ETH",
      amount: "0.012 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 17:20:55"
    },
    {
      id: "zeroxjay2222",
      merchantName: "Stats Wallet",
      type: "0.0045 ETH",
      amount: "0.0045 ETH",
      convertedTo: "-",
      status: "Confirmed",
      date: "1/5/2024, 16:10:18"
    }
  ]

  const chartData = [
    { name: 'Jan 1', amount: 2400 },
    { name: 'Jan 2', amount: 1398 },
    { name: 'Jan 3', amount: 9800 },
    { name: 'Jan 4', amount: 3908 },
    { name: 'Jan 5', amount: 4800 },
    { name: 'Jan 6', amount: 3800 },
    { name: 'Jan 7', amount: 4300 },
  ]

  return (
    <div className="p-4 sm:p-6 bg-[#F8F9FC] min-h-screen">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-[#18B69B]" />
          </div>
          <h1 className="text-[#2D3359] text-lg sm:text-xl font-semibold">Merchants</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">Today payments</span>
            <Info className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <DollarSign className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" />
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.todayPayments}</span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">This week</span>
            <Info className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <DollarSign className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" />
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.thisWeek}</span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">This month</span>
            <Info className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <DollarSign className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" />
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.thisMonth}</span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">All time</span>
            <Info className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <DollarSign className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" />
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.allTime}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column - Your merchants transactions */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-gray-900">Your merchants transactions</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search (hack ID, hash)"
                    value={transactionSearchQuery}
                    onChange={(e) => setTransactionSearchQuery(e.target.value)}
                    className="w-full sm:w-[200px] pl-9 pr-4 h-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all placeholder:text-gray-400"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button className="h-9 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-all">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[384px] custom-scrollbar">
              <table className="w-full border-collapse min-w-[600px]">
                <thead className="sticky top-0 bg-[#18B69B]/5 backdrop-blur-sm z-10">
                  <tr className="border-b border-gray-200">
                    <th className="text-left whitespace-nowrap px-3 sm:px-4 py-3">
                      <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                        Merchant name
                      </div>
                    </th>
                    <th className="text-left whitespace-nowrap px-3 sm:px-4 py-3">
                      <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                        Type
                      </div>
                    </th>
                    <th className="text-left whitespace-nowrap px-3 sm:px-4 py-3">
                      <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                        Amount received
                      </div>
                    </th>
                    <th className="text-left whitespace-nowrap px-3 sm:px-4 py-3">
                      <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                        Status
                      </div>
                    </th>
                    <th className="text-right whitespace-nowrap px-3 sm:px-4 py-3">
                      <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                        Details
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((tx, index) => (
                    <tr key={tx.id} className={`hover:bg-gray-50/50 transition-colors ${index >= 6 ? 'animate-fadeIn' : ''}`}>
                      <td className="px-3 sm:px-4 py-3">
                        <span className="text-[13px] text-gray-900">{tx.merchantName}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ArrowDownCircle className="h-4 w-4 text-[#1cc88a]" />
                          <span className="text-[13px] text-gray-600">{tx.type}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <span className="text-[13px] text-gray-900">{tx.amount}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded
                          ${tx.status === 'Confirmed' ? 'text-[#1cc88a] bg-[#1cc88a]/10' :
                            tx.status === 'Pending' ? 'text-yellow-600 bg-yellow-50' :
                            'text-red-600 bg-red-50'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center justify-end">
                          <button className="text-[13px] font-medium text-[#18B69B] hover:text-[#18B69B]/80 transition-colors">
                            Details
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

        {/* Right Column - Merchants payments statistics */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Merchants payments statistics</h2>
              <p className="text-sm text-gray-500">The last 7 days merchants payments</p>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="h-[300px] sm:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#18B69B" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#18B69B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#18B69B"
                    strokeWidth={2}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Merchant API Keys Section */}
      <div className="mt-4 sm:mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-gray-900">Your merchant API keys</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[200px] pl-9 pr-4 h-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#18B69B] focus:ring-2 focus:ring-[#18B69B]/20 transition-all placeholder:text-gray-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button className="h-9 px-4 text-sm text-white bg-[#18B69B] rounded-lg hover:bg-[#18B69B]/90 transition-colors flex items-center justify-center">
                Generate merchant API key
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#18B69B]/5 border-b border-gray-200">
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Name
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Merchant login
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Fee paid by payer
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Accepted coins
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Auto convert to USDT
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Auto withdraw
                  </div>
                </th>
                <th className="text-left whitespace-nowrap px-4 py-3">
                  <div className="text-[11px] font-semibold text-[#18B69B] uppercase">
                    Merchant API key
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
              {merchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-900">{merchant.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-600">{merchant.login}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-900">{merchant.feePercent}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {merchant.acceptedCoins.map((coin) => (
                        <span 
                          key={coin}
                          className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium text-[#18B69B] bg-[#18B69B]/5 rounded"
                        >
                          {coin}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-600">
                      {merchant.autoConvertToUSDT ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-600">
                      {merchant.autoWithdraw ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="text-[13px] font-mono text-gray-600">{merchant.merchantAPIKey}</code>
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all">
                        <Settings className="h-3.5 w-3.5" />
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