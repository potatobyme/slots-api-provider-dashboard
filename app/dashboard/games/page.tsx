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
  GamepadIcon,
  DollarSign,
  Hash,
  Percent,
  Layers,
  Shield
} from "lucide-react"

interface Game {
  id: string
  name: string
  provider: string
  type: string
  status: "active" | "disabled"
}

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const games: Game[] = [
    {
      id: "849115",
      name: "Sweet Bonanza",
      provider: "Pragmatic Play",
      type: "Slots",
      status: "active"
    },
    {
      id: "849116",
      name: "Crazy Time",
      provider: "Evolution",
      type: "Live Casino",
      status: "disabled"
    }
  ]

  const filteredGames = games.filter(game => {
    if (selectedStatus !== "all" && game.status !== selectedStatus) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        game.name.toLowerCase().includes(query) ||
        game.id.toLowerCase().includes(query) ||
        game.provider.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <div className="p-5 bg-[#F8F9FC]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[#5a5c69] text-2xl font-normal tracking-[-0.5px] flex items-center gap-2">
          <GamepadIcon className="h-6 w-6 text-[#18B69B]" />
          Games
          <ChevronRight className="h-5 w-5 text-[#858796]" />
          <span className="text-base text-[#858796] font-light">Management</span>
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search by ID, Name, Provider..."
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
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
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
                    <GamepadIcon className="h-3.5 w-3.5" />
                    Name
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    Provider
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <GamepadIcon className="h-3.5 w-3.5" />
                    Type
                  </div>
                </th>
                <th className="h-11 px-4 text-left text-[11px] font-semibold text-[#18B69B] uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
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
              {filteredGames.map((game, index) => (
                <tr 
                  key={game.id} 
                  className={`
                    h-12 border-b border-[#e3e6f0] last:border-0
                    hover:bg-[#f8f9fc] transition-colors
                    ${index % 2 === 0 ? 'bg-white' : 'bg-[#fcfcfd]'}
                  `}
                >
                  <td className="px-4 text-[13px] font-medium text-[#18B69B] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {game.id}
                      <button className="group p-1 hover:bg-[#18B69B]/10 rounded transition-colors">
                        <Copy className="h-3.5 w-3.5 text-[#858796] group-hover:text-[#18B69B] transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <GamepadIcon className="h-3.5 w-3.5 text-[#858796]" />
                      {game.name}
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-[#858796]" />
                      {game.provider}
                    </div>
                  </td>
                  <td className="px-4 text-[13px] text-[#858796] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <GamepadIcon className="h-3.5 w-3.5 text-[#858796]" />
                      {game.type}
                    </div>
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center h-[20px] px-2.5 text-[11px] font-medium rounded-full ${
                      game.status === 'active' 
                        ? 'text-[#18B69B] bg-[#18B69B]/10'
                        : 'text-red-700 bg-red-50'
                    }`}>
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        game.status === 'active'
                          ? 'bg-[#18B69B]'
                          : 'bg-red-500'
                      }`} />
                      {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
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