"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { LoadingSpinner, LoadingOverlay } from "@/components/ui/loading"

export default function RegisterPage() {
  const { register } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await register(formData.username, formData.email, formData.password, formData.rememberMe)
      // No need to redirect here as it's handled in the auth context
    } catch (err: any) {
      setError(err.message || "Registration failed")
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
            <h1 className="text-2xl font-semibold text-[#2D3359]">Create an account</h1>
            <p className="text-gray-500">Please enter your details to sign up</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#18B69B]/30"
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>
            </div>

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
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#18B69B]/30"
                  placeholder="Create a password"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#18B69B]/30"
                  placeholder="Confirm your password"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  required
                  className="rounded border-gray-300 text-[#18B69B] focus:ring-[#18B69B]"
                  disabled={loading}
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#18B69B] hover:text-[#18B69B]/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#18B69B] hover:text-[#18B69B]/80">
                    Privacy Policy
                  </Link>
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-[#18B69B] text-white font-medium hover:bg-[#18B69B]/90 focus:outline-none focus:ring-2 focus:ring-[#18B69B]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#18B69B] hover:text-[#18B69B]/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
} 