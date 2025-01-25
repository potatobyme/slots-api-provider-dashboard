"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  User, 
  Key, 
  Receipt, 
  Building2, 
  Gift, 
  HelpCircle,
  ChevronDown,
  FileText,
  Users,
  GamepadIcon,
  PhoneCall,
  FileCode,
  Menu
} from "lucide-react"
import { useState, useEffect } from "react"

interface MenuItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  isActive?: boolean
}

function MenuItem({ href, icon, children, isActive }: MenuItemProps) {
  return (
    <Link 
      href={href} 
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-gray-100 text-gray-900 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }
      `}
    >
      {icon}
      <span className="text-sm">{children}</span>
    </Link>
  )
}

interface SubMenuProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  isActive?: boolean
}

function SubMenu({ title, icon, children, defaultOpen = false, isActive = false }: SubMenuProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200
          ${isActive || isOpen
            ? 'bg-gray-100 text-gray-900 font-medium'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }
        `}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm">{title}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`
          pl-4 space-y-1 overflow-hidden transition-all duration-200
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        {children}
      </div>
    </div>
  )
}

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const sidebarContent = (
    <div className="w-64 h-[calc(100vh-64px)] bg-white border-r flex flex-col">
      <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        <MenuItem 
          href="/" 
          icon={<LayoutDashboard className="h-5 w-5" />}
          isActive={pathname === '/'}
        >
          Main
        </MenuItem>

        <MenuItem 
          href="/account" 
          icon={<User className="h-5 w-5" />}
          isActive={pathname === '/account'}
        >
          Account
        </MenuItem>

        <MenuItem 
          href="/api-keys" 
          icon={<Key className="h-5 w-5" />}
          isActive={pathname === '/api-keys'}
        >
          API Keys
        </MenuItem>

        <SubMenu 
          title="Billing" 
          icon={<Receipt className="h-5 w-5" />}
          isActive={pathname.startsWith('/billing')}
        >
          <MenuItem 
            href="/billing/statements" 
            icon={<FileText className="h-5 w-5" />}
            isActive={pathname === '/billing/statements'}
          >
            Bill Statements
          </MenuItem>
          <MenuItem 
            href="/billing/provider-stats" 
            icon={<Building2 className="h-5 w-5" />}
            isActive={pathname === '/billing/provider-stats'}
          >
            Provider Stats
          </MenuItem>
        </SubMenu>

        <SubMenu 
          title="Backoffice" 
          icon={<Building2 className="h-5 w-5" />}
          isActive={pathname.startsWith('/backoffice')}
        >
          <MenuItem 
            href="/backoffice/transactions-recent" 
            icon={<Receipt className="h-5 w-5" />}
            isActive={pathname === '/backoffice/transactions-recent'}
          >
            Transactions (Recent - 2 Days)
          </MenuItem>
          <MenuItem 
            href="/backoffice/transactions-archive" 
            icon={<Receipt className="h-5 w-5" />}
            isActive={pathname === '/backoffice/transactions-archive'}
          >
            Transactions (Archive - 10 Days)
          </MenuItem>
          <MenuItem 
            href="/backoffice/players" 
            icon={<Users className="h-5 w-5" />}
            isActive={pathname === '/backoffice/players'}
          >
            Players
          </MenuItem>
          <MenuItem 
            href="/backoffice/games" 
            icon={<GamepadIcon className="h-5 w-5" />}
            isActive={pathname === '/backoffice/games'}
          >
            Games
          </MenuItem>
          <MenuItem 
            href="/backoffice/callback" 
            icon={<PhoneCall className="h-5 w-5" />}
            isActive={pathname === '/backoffice/callback'}
          >
            Callback Log
          </MenuItem>
        </SubMenu>

        <SubMenu 
          title="Bonus" 
          icon={<Gift className="h-5 w-5" />}
          isActive={pathname.startsWith('/bonus')}
        >
          <MenuItem 
            href="/bonus/free-spins" 
            icon={<Gift className="h-5 w-5" />}
            isActive={pathname === '/bonus/free-spins'}
          >
            Free Spins
          </MenuItem>
        </SubMenu>

        <SubMenu 
          title="Help" 
          icon={<HelpCircle className="h-5 w-5" />}
          isActive={pathname.startsWith('/help')}
        >
          <MenuItem 
            href="/help/support" 
            icon={<HelpCircle className="h-5 w-5" />}
            isActive={pathname === '/help/support'}
          >
            Support
          </MenuItem>
          <MenuItem 
            href="/help/api-docs" 
            icon={<FileCode className="h-5 w-5" />}
            isActive={pathname === '/help/api-docs'}
          >
            API Documentation
          </MenuItem>
        </SubMenu>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 p-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden animate-in slide-in-from-left">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  )
}

