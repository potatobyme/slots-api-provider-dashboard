"use client"

import Sidebar from "@/components/sidebar"
import LoadingBar from "@/components/loading-bar"
import NavBar from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <LoadingBar />
      <div className="flex h-[calc(100vh-0px)]">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-[#F8F9FC] lg:ml-64">
          <NavBar />
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

