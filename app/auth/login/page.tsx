"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { LoadingSpinner, LoadingOverlay } from "@/components/ui/loading"

export default function LoginPage() {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(formData.email, formData.password, formData.rememberMe)
      // No need to redirect here as it's handled in the auth context
    } catch (err: any) {
      setError(err.message || "Login failed")
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] p-4">
        <div className="w-full max-w-[400px] space-y-6">
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-xl bg-[#18B69B]/10 flex items-center justify-center">
                <User className="h-6 w-6 text-[#18B69B]" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-[#2D3359]">Welcome back</h1>
            <p className="text-gray-500">Please enter your details to sign in</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#18B69B]/30"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link href="/auth/forgot-password" className="text-sm text-[#18B69B] hover:text-[#18B69B]/80">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#18B69B]/30"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="rounded border-gray-300 text-[#18B69B] focus:ring-[#18B69B]"
                disabled={loading}
              />
              <span className="text-sm text-gray-600">Keep me signed in</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-[#18B69B] text-white font-medium hover:bg-[#18B69B]/90 focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-[#18B69B] hover:text-[#18B69B]/80 font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
} 