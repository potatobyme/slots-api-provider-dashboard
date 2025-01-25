'use client';

import React from 'react'
import { 
  Info, 
  Copy, 
  MoreHorizontal, 
  Key,
  DollarSign,
  Clock,
  BarChart,
  AlertCircle,
  CreditCard,
  Users
} from "lucide-react"

interface DashboardData {
  billingBalance: number
  currentBillingCycle: number
  billingCycleLimit: number
  depositAddress: string
  totalUsers: number
  activeGames: number
}

const dashboardData: DashboardData = {
  billingBalance: 14.98,
  currentBillingCycle: 0.00,
  billingCycleLimit: 0,
  depositAddress: '0xa38b04735C44F5e8ca6EAbFb3611E068F323a31f',
  totalUsers: 1234,
  activeGames: 56
}

export default function MainPage() {
  return (
    <div className="p-6 space-y-6 bg-[#F8F9FC]">
      {/* Deposit Info Section */}
      <section>
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[#18B69B]" />
          Deposit Info
        </h2>
        <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#18B69B]/10 rounded-lg">
              <Info className="h-6 w-6 text-[#18B69B]" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Your balance deposit address - USDT ERC-20:</div>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-md">
                  {dashboardData.depositAddress}
                </code>
                <button 
                  className="p-2 hover:bg-[#18B69B]/10 rounded-lg transition-colors" 
                  title="Copy address"
                >
                  <Copy className="h-4 w-4 text-gray-500 hover:text-[#18B69B]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing Stats Section */}
      <section>
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <BarChart className="h-5 w-5 text-[#18B69B]" />
          Billing Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="text-sm font-medium text-gray-500">Billing Balance ($)</div>
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="p-4 pt-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="text-2xl font-semibold">{dashboardData.billingBalance}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="text-sm font-medium text-gray-500">Current Billing Cycle ($)</div>
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="p-4 pt-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-2xl font-semibold">{dashboardData.currentBillingCycle}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="text-sm font-medium text-gray-500">Billing Cycle Limit Reached (%)</div>
              <div className="text-sm text-gray-500">0</div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-amber-500" />
                </div>
                <div className="text-2xl font-semibold">{dashboardData.billingCycleLimit}%</div>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: `${dashboardData.billingCycleLimit}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User General Info Section */}
      <section>
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-[#18B69B]" />
          User General Info
        </h2>
        <div className="bg-white rounded-lg border hover:shadow-md transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-50 rounded-lg shrink-0">
                <Info className="h-6 w-6 text-violet-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">Billing Method: GGR Billing - billed per 3 days (limit)</div>
                <div className="text-sm text-gray-500 mt-1">
                  GGR is billed every 3 days from your account balance, make sure it is sufficient.
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg shrink-0">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg shrink-0">
                <Key className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">Amount of API Keys: 1</div>
                <div className="text-sm text-gray-500 mt-1">
                  Feel free to ask support additional api keys for your integration.
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg shrink-0">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 