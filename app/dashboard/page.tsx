"use client"

import { CreditCard, Clock, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 bg-[#F8F9FC]">
      {/* Deposit Info Card */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-[15px] font-medium text-gray-900 mb-3">
          <CreditCard className="h-4 w-4 text-[#18B69B]" />
          Deposit Info
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#18B69B]/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-[#18B69B]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-gray-600 mb-2">Your balance deposit address - USDT</p>
              <div className="flex items-center gap-2 bg-gray-50/75 rounded-lg p-2.5 break-all">
                <code className="text-[13px] font-mono text-gray-900">0xa38b04735C44F5e8ca6EAbFb3611E068F323a31f</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Statistics */}
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-[15px] font-medium text-gray-900">
          <Clock className="h-4 w-4 text-[#18B69B]" />
          Billing Statistics
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Billing Balance Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
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
              <span className="text-2xl font-semibold text-gray-900">14.98</span>
            </div>
          </div>

          {/* Current Billing Cycle Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
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
              <span className="text-2xl font-semibold text-gray-900">0</span>
            </div>
          </div>

          {/* Billing Cycle Limit Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
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
              <span className="text-2xl font-semibold text-gray-900">0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

