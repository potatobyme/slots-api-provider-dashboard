"use client"

import { useState } from "react"
import {
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ArrowRight,
  Bell,
  Wallet,
  BarChart3
} from "lucide-react"

export default function OverviewPage() {
  const [recentTransactions] = useState([
    { id: 1, type: "deposit", amount: 1500, status: "completed", date: "2024-01-20 14:30" },
    { id: 2, type: "withdraw", amount: 500, status: "pending", date: "2024-01-20 13:15" },
    { id: 3, type: "deposit", amount: 2000, status: "completed", date: "2024-01-20 12:45" },
    { id: 4, type: "withdraw", amount: 750, status: "completed", date: "2024-01-20 11:20" },
  ])

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#2D3359]">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-[#18B69B]" />
              </div>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Balance</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold text-[#2D3359]">$24,500</h3>
              <span className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                8.2%
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Players</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold text-[#2D3359]">1,245</h3>
              <span className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                12.5%
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-purple-500" />
              </div>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Deposits</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold text-[#2D3359]">$18,400</h3>
              <span className="text-xs text-red-500 flex items-center">
                <ArrowDownRight className="h-3 w-3" />
                3.2%
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold text-[#2D3359]">$32,800</h3>
              <span className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                15.3%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2D3359]">Recent Transactions</h2>
              <button className="text-sm text-[#18B69B] hover:text-[#18B69B]/80 font-medium flex items-center gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="divide-y">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg ${
                      transaction.type === "deposit" 
                        ? "bg-green-500/10" 
                        : "bg-red-500/10"
                    } flex items-center justify-center`}>
                      {transaction.type === "deposit" ? (
                        <ArrowDownRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#2D3359] capitalize">
                        {transaction.type}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === "deposit" 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}>
                      {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 