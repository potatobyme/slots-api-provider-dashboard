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

const MenuItem = ({ href, icon, children, isActive }: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  isActive?: boolean
}) => {
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

const SubMenu = ({ title, icon, children, defaultOpen = false, isActive = false }: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  isActive?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || isActive)

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

const Sidebar = () => {
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

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-4 right-4 p-3 bg-[#18B69B] text-white rounded-full shadow-lg hover:bg-[#18B69B]/90 transition-colors z-50"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white">
            <div className="h-16 flex items-center px-4 border-b">
              <span className="text-xl font-semibold text-gray-900">Dashboard</span>
            </div>

            <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
                  href="/transactions" 
                  icon={<Receipt className="h-5 w-5" />}
                  isActive={pathname === '/transactions'}
                >
                  Transactions
                </MenuItem>
                <MenuItem 
                  href="/transactions/deposit-withdraw" 
                  icon={<Receipt className="h-5 w-5" />}
                  isActive={pathname === '/transactions/deposit-withdraw'}
                >
                  Deposit/Withdraw
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
                  href="/bonus/active" 
                  icon={<FileCode className="h-5 w-5" />}
                  isActive={pathname === '/bonus/active'}
                >
                  Active Bonuses
                </MenuItem>
                <MenuItem 
                  href="/bonus/history" 
                  icon={<FileCode className="h-5 w-5" />}
                  isActive={pathname === '/bonus/history'}
                >
                  Bonus History
                </MenuItem>
              </SubMenu>

              <SubMenu 
                title="Help" 
                icon={<HelpCircle className="h-5 w-5" />}
                isActive={pathname.startsWith('/help')}
              >
                <MenuItem 
                  href="/help/docs" 
                  icon={<FileCode className="h-5 w-5" />}
                  isActive={pathname === '/help/docs'}
                >
                  Documentation
                </MenuItem>
                <MenuItem 
                  href="/help/support" 
                  icon={<FileCode className="h-5 w-5" />}
                  isActive={pathname === '/help/support'}
                >
                  Support
                </MenuItem>
              </SubMenu>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r z-40">
        <div className="h-16 flex items-center px-4 border-b">
          <span className="text-xl font-semibold text-gray-900">Dashboard</span>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
              href="/transactions" 
              icon={<Receipt className="h-5 w-5" />}
              isActive={pathname === '/transactions'}
            >
              Transactions
            </MenuItem>
            <MenuItem 
              href="/transactions/deposit-withdraw" 
              icon={<Receipt className="h-5 w-5" />}
              isActive={pathname === '/transactions/deposit-withdraw'}
            >
              Deposit/Withdraw
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
              href="/bonus/active" 
              icon={<FileCode className="h-5 w-5" />}
              isActive={pathname === '/bonus/active'}
            >
              Active Bonuses
            </MenuItem>
            <MenuItem 
              href="/bonus/history" 
              icon={<FileCode className="h-5 w-5" />}
              isActive={pathname === '/bonus/history'}
            >
              Bonus History
            </MenuItem>
          </SubMenu>

          <SubMenu 
            title="Help" 
            icon={<HelpCircle className="h-5 w-5" />}
            isActive={pathname.startsWith('/help')}
          >
            <MenuItem 
              href="/help/docs" 
              icon={<FileCode className="h-5 w-5" />}
              isActive={pathname === '/help/docs'}
            >
              Documentation
            </MenuItem>
            <MenuItem 
              href="/help/support" 
              icon={<FileCode className="h-5 w-5" />}
              isActive={pathname === '/help/support'}
            >
              Support
            </MenuItem>
          </SubMenu>
        </div>
      </div>
    </>
  )
}

export default Sidebar

