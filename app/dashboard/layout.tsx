import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">APIProvider</h1>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block">
            Dashboard
          </Link>
          <Link href="/dashboard/create-api" className="block">
            Create API
          </Link>
          <Link href="/dashboard/settings" className="block">
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

