"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  LayoutGrid, 
  User, 
  Key, 
  Receipt, 
  Building2, 
  Gift, 
  HelpCircle,
  ChevronDown,
  FileText,
  Wallet,
  Users,
  Gamepad2,
  PhoneCall,
  CircleDollarSign
} from "lucide-react"

interface MenuItem {
  href: string
  icon: React.ReactNode
  label: string
}

interface SubMenu {
  label: string
  icon: React.ReactNode
  items: MenuItem[]
}

interface SidebarProps {
  isOpen: boolean
}

const MenuItem = ({ href, icon, children, isActive = false }: { href: string, icon: React.ReactNode, children: React.ReactNode, isActive?: boolean }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
        isActive 
          ? "bg-[#18B69B]/10 text-[#18B69B] font-medium" 
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

const SubMenu = ({ label, icon, children, isActive = false }: { label: string, icon: React.ReactNode, children: React.ReactNode, isActive?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
          isActive 
            ? "bg-[#18B69B]/10 text-[#18B69B] font-medium" 
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-gray-200 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-4 border-b border-gray-200">
        <span className="font-semibold text-[#2D3359]">Dashboard</span>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <MenuItem 
          href="/dashboard" 
          icon={<LayoutGrid className="h-5 w-5" />}
          isActive={pathname === "/dashboard"}
        >
          Main
        </MenuItem>

        <MenuItem 
          href="/dashboard/account" 
          icon={<User className="h-5 w-5" />}
          isActive={pathname === "/dashboard/account"}
        >
          Account
        </MenuItem>

        <MenuItem 
          href="/dashboard/api-keys" 
          icon={<Key className="h-5 w-5" />}
          isActive={pathname === "/dashboard/api-keys"}
        >
          API Keys
        </MenuItem>

        <MenuItem 
          href="/dashboard/merchants" 
          icon={<Building2 className="h-5 w-5" />}
          isActive={pathname === "/dashboard/merchants"}
        >
          Merchants
        </MenuItem>

        <SubMenu 
          label="Billing" 
          icon={<CircleDollarSign className="h-5 w-5" />}
          isActive={pathname.includes("/dashboard/billing")}
        >
          <MenuItem
            href="/dashboard/billing/invoices"
            icon={<Receipt className="h-4 w-4" />}
            isActive={pathname === "/dashboard/billing/invoices"}
          >
            Invoices
          </MenuItem>
          <MenuItem
            href="/dashboard/billing/payments"
            icon={<Receipt className="h-4 w-4" />}
            isActive={pathname === "/dashboard/billing/payments"}
          >
            Payments
          </MenuItem>
        </SubMenu>

        <SubMenu 
          label="Backoffice" 
          icon={<Building2 className="h-5 w-5" />}
          isActive={pathname.includes("/dashboard/backoffice")}
        >
          <MenuItem
            href="/dashboard/backoffice/transactions"
            icon={<Receipt className="h-4 w-4" />}
            isActive={pathname === "/dashboard/backoffice/transactions"}
          >
            Transactions
          </MenuItem>
          <MenuItem
            href="/dashboard/backoffice/deposit-withdraw"
            icon={<Wallet className="h-4 w-4" />}
            isActive={pathname === "/dashboard/backoffice/deposit-withdraw"}
          >
            Deposit/Withdraw
          </MenuItem>
          <MenuItem
            href="/dashboard/backoffice/players"
            icon={<Users className="h-4 w-4" />}
            isActive={pathname === "/dashboard/backoffice/players"}
          >
            Players
          </MenuItem>
          <MenuItem
            href="/dashboard/backoffice/games"
            icon={<Gamepad2 className="h-4 w-4" />}
            isActive={pathname === "/dashboard/backoffice/games"}
          >
            Games
          </MenuItem>
          <MenuItem
            href="/dashboard/backoffice/callback-log"
            icon={<PhoneCall className="h-4 w-4" />}
            isActive={pathname === "/dashboard/backoffice/callback-log"}
          >
            Callback Log
          </MenuItem>
        </SubMenu>

        <SubMenu 
          label="Bonus" 
          icon={<Gift className="h-5 w-5" />}
          isActive={pathname.includes("/dashboard/bonus")}
        >
          <MenuItem
            href="/dashboard/bonus/active"
            icon={<Gift className="h-4 w-4" />}
            isActive={pathname === "/dashboard/bonus/active"}
          >
            Active Bonuses
          </MenuItem>
          <MenuItem
            href="/dashboard/bonus/history"
            icon={<FileText className="h-4 w-4" />}
            isActive={pathname === "/dashboard/bonus/history"}
          >
            Bonus History
          </MenuItem>
        </SubMenu>

        <SubMenu 
          label="Help" 
          icon={<HelpCircle className="h-5 w-5" />}
          isActive={pathname.includes("/dashboard/help")}
        >
          <MenuItem
            href="/dashboard/help/faq"
            icon={<HelpCircle className="h-4 w-4" />}
            isActive={pathname === "/dashboard/help/faq"}
          >
            FAQ
          </MenuItem>
          <MenuItem
            href="/dashboard/help/support"
            icon={<HelpCircle className="h-4 w-4" />}
            isActive={pathname === "/dashboard/help/support"}
          >
            Support
          </MenuItem>
        </SubMenu>
      </div>
    </aside>
  )
}

