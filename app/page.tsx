'use client';

import { Info, Copy, MoreHorizontal, Key } from "lucide-react"

interface DashboardData {
  billingBalance: number
  currentBillingCycle: number
  billingCycleLimit: number
  depositAddress: string
}

const dashboardData: DashboardData = {
  billingBalance: 14.98,
  currentBillingCycle: 0.00,
  billingCycleLimit: 0,
  depositAddress: '0xa38b04735C44F5e8ca6EAbFb3611E068F323a31f'
}

export default function MainPage() {
  return (
    <div className="p-6 space-y-6 bg-[#F8F9FC]">
      {/* Deposit Info Section */}
      <section>
        <h2 className="text-lg font-medium mb-4">Deposit Info</h2>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-4">
            <Info className="h-5 w-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500 mb-1">Your balance deposit address - USDT ERC-20:</div>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">
                  {dashboardData.depositAddress}
                </code>
                <button className="p-1 hover:bg-gray-100 rounded" title="Copy address">
                  <Copy className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border">
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="text-sm font-medium text-gray-500">Billing Balance ($)</div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="p-4 pt-0">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-50 rounded-md">
                <div className="h-4 w-4 bg-green-500 rounded-sm" />
              </div>
              <div className="text-2xl font-semibold">{dashboardData.billingBalance}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="text-sm font-medium text-gray-500">Current Billing Cycle ($)</div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="p-4 pt-0">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-50 rounded-md">
                <div className="h-4 w-4 bg-green-500 rounded-sm" />
              </div>
              <div className="text-2xl font-semibold">{dashboardData.currentBillingCycle}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="text-sm font-medium text-gray-500">Billing Cycle Limit Reached (%)</div>
            <div className="text-sm text-gray-500">0</div>
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-semibold mb-2">{dashboardData.billingCycleLimit}%</div>
            <div className="h-2 w-full bg-gray-100 rounded-full">
              <div className="h-2 w-0 bg-green-500 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* User General Info Section */}
      <section>
        <h2 className="text-lg font-medium mb-4">User General Info</h2>
        <div className="bg-white rounded-lg border">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Info className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">Billing Method: GGR Billing - billed per 3 days (limit)</div>
                <div className="text-sm text-gray-500">
                  GGR is billed every 3 days from your account balance, make sure it is sufficient.
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded ml-auto">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Key className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">Amount of API Keys: 1</div>
                <div className="text-sm text-gray-500">
                  Feel free to ask support additional api keys for your integration.
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded ml-auto">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

