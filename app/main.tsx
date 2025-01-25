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
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="p-4 sm:p-6 bg-[#F8F9FC]">
      {/* Deposit Info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[15px] font-medium text-gray-900 mb-3">
          <div className="h-5 w-5 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-[#18B69B]" />
          </div>
          <span>Deposit Info</span>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#18B69B]/10 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-[#18B69B]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-gray-600 mb-2">Your deposit address - Ethereum (ERC20)</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 text-[13px] font-mono text-gray-900 bg-gray-50/75 rounded-lg truncate">
                    {dashboardData.depositAddress}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(dashboardData.depositAddress)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                    title="Copy address"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Statistics */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-[15px] font-medium text-gray-900 mb-3">
          <Clock className="h-4 w-4 text-[#18B69B]" />
          Billing Statistics
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Billing Balance */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-gray-600">Billing Balance ($)</span>
              <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="4" cy="8" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-[#18B69B]">$</span>
              </div>
              <span className="text-2xl font-semibold text-gray-900">{dashboardData.billingBalance}</span>
            </div>
          </div>

          {/* Current Billing Cycle */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-gray-600">Current Billing Cycle ($)</span>
              <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="4" cy="8" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-2xl font-semibold text-gray-900">{dashboardData.currentBillingCycle}</span>
            </div>
          </div>

          {/* Billing Cycle Limit */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-gray-600">Billing Cycle Limit Reached (%)</span>
              <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="4" cy="8" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-amber-500" />
              </div>
              <span className="text-2xl font-semibold text-gray-900">{dashboardData.billingCycleLimit}%</span>
            </div>
          </div>
        </div>
      </div>

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