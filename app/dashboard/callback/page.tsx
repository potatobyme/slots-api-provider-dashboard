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
  Link2,
  Hash,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Send
} from "lucide-react"

interface CallbackLog {
  id: string
  url: string
  method: "POST" | "GET"
  status: "success" | "failed" | "pending"
  timestamp: string
  responseTime: string
}

export default function CallbackPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const logs: CallbackLog[] = [
    {
      id: "749115",
      url: "https://api.example.com/callback/win",
      method: "POST",
      status: "success",
      timestamp: "2024-01-15 10:48 PM UTC",
      responseTime: "245ms"
    },
    {
      id: "749116",
      url: "https://api.example.com/callback/bet",
      method: "GET",
      status: "failed",
      timestamp: "2024-01-15 10:47 PM UTC",
      responseTime: "1240ms"
    },
    {
      id: "749117",
      url: "https://api.example.com/callback/refund",
      method: "POST",
      status: "pending",
      timestamp: "2024-01-15 10:46 PM UTC",
      responseTime: "89ms"
    }
  ]

  const filteredLogs = logs.filter(log => {
    if (selectedStatus !== "all" && log.status !== selectedStatus) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        log.url.toLowerCase().includes(query) ||
        log.id.toLowerCase().includes(query) ||
        log.method.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <div className="p-5 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[#5a5c69] text-2xl font-normal tracking-[-0.5px] flex items-center gap-2">
          <Send className="h-6 w-6 text-[#18B69B]" />
          Callback
          <ChevronRight className="h-5 w-5 text-[#858796]" />
          <span className="text-base text-[#858796] font-light">Requests</span>
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search by ID, URL, Method..."
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
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>

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
                    <Link2 className="h-3.5 w-3.5" />
                    URL
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                    Method
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Response Time
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Timestamp
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Status
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
              {filteredLogs.map((log, index) => (
                <tr 
                  key={log.id} 
                  className={`
                    h-12 border-b border-[#e3e6f0] last:border-0
                    hover:bg-[#f8f9fc] transition-colors
                    ${index % 2 === 0 ? 'bg-white' : 'bg-[#fcfcfd]'}
                  `}
                >
                  <td className="px-4 text-[13px] font-medium text-[#18B69B] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {log.id}
                      <button className="group p-1 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <Copy className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Link2 className="h-3.5 w-3.5 text-[#858796]" />
                      {log.url}
                      <button className="group p-1 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <Copy className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Send className="h-3.5 w-3.5 text-[#858796]" />
                      {log.method}
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#858796]" />
                      {log.responseTime}
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#858796]" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center h-[20px] px-2.5 text-[11px] font-medium rounded-full ${
                      log.status === 'success' 
                        ? 'text-[#18B69B] bg-[#18B69B]/10'
                        : log.status === 'failed'
                        ? 'text-red-700 bg-red-50'
                        : 'text-yellow-700 bg-yellow-50'
                    }`}>
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        log.status === 'success'
                          ? 'bg-[#18B69B]'
                          : log.status === 'failed'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`} />
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </td>
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