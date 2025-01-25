'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Search, Eye, Copy, MoreHorizontal } from "lucide-react";

interface AccountData {
  id: string;
  name: string;
  email: string;
  created: string;
  billingBalance: number;
  currentBillingCycle: number;
  billingCycleEvolution: number;
  billingCycleLimit: number;
  apiAccess: boolean;
  paymentAddress: string;
}

export default function AccountPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - replace with actual API call
  const accountData: AccountData = {
    id: '83',
    name: 'Doubleit',
    email: 'Doubleitcorp@gmail.com',
    created: '01/05/2025, 02:22 PM UTC',
    billingBalance: 14.98,
    currentBillingCycle: 0.00,
    billingCycleEvolution: 0.00,
    billingCycleLimit: 16.48,
    apiAccess: true,
    paymentAddress: '0xa38b04735C44F5e8ca6EAbFb3611E068F323a31f'
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search"
            className="w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="p-2 hover:bg-gray-100 rounded-md shrink-0">
            <MoreHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-medium">ID</TableHead>
                <TableHead className="font-medium">NAME</TableHead>
                <TableHead className="font-medium">EMAIL</TableHead>
                <TableHead className="font-medium">CREATED</TableHead>
                <TableHead className="font-medium">BILLING BALANCE</TableHead>
                <TableHead className="font-medium">CURRENT BILLING CYCLE</TableHead>
                <TableHead className="font-medium">CURRENT BILLING CYCLE (EVOLUTION)</TableHead>
                <TableHead className="font-medium">BILLING CYCLE LIMIT</TableHead>
                <TableHead className="font-medium">API ACCESS</TableHead>
                <TableHead className="font-medium">PAYMENT ADDRESS</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50/50">
                <TableCell>{accountData.id}</TableCell>
                <TableCell className="font-medium">{accountData.name}</TableCell>
                <TableCell>{accountData.email}</TableCell>
                <TableCell>{accountData.created}</TableCell>
                <TableCell>${accountData.billingBalance}</TableCell>
                <TableCell>${accountData.currentBillingCycle}</TableCell>
                <TableCell>${accountData.billingCycleEvolution}</TableCell>
                <TableCell>${accountData.billingCycleLimit}</TableCell>
                <TableCell>
                  {accountData.apiAccess ? 
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      <span className="mr-1">✓</span> Enabled
                    </span> : 
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                      <span className="mr-1">✗</span> Disabled
                    </span>
                  }
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                      {accountData.paymentAddress.slice(0, 8)}...{accountData.paymentAddress.slice(-8)}
                    </code>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Copy address">
                      <Copy className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="View details">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
          <div className="text-sm text-gray-500">1-1 of 1</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded" disabled>Previous</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
} 