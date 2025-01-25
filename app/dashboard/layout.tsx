"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import LoadingBar from "@/components/loading-bar"
import NavBar from "@/components/navbar"
import { Menu } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleToggle = () => {
      setIsSidebarOpen(prev => !prev)
    }

    window.addEventListener('toggle-sidebar', handleToggle)
    return () => window.removeEventListener('toggle-sidebar', handleToggle)
  }, [])

  return (
    <div className="min-h-screen">
      <LoadingBar />
      <div className="flex h-[calc(100vh-0px)]">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 overflow-auto bg-[#F8F9FC] lg:ml-64">
          <NavBar />
          <main>
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed bottom-4 right-4 p-3 bg-[#18B69B] text-white rounded-full shadow-lg hover:bg-[#18B69B]/90 transition-colors z-50"
        onClick={() => setIsSidebarOpen(prev => !prev)}
      >
        <Menu className="h-6 w-6" />
      </button>
    </div>
  )
}

