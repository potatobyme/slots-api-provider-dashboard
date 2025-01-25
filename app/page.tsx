"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TypeAnimation } from 'react-type-animation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-[#18B69B] to-[#13D3BD] bg-clip-text text-transparent">SlotDashboard</span>
            </div>
            <div className="hidden sm:flex sm:items-center sm:gap-4">
              <Link 
                href="/dashboard"
                className="text-gray-600 hover:text-[#18B69B] px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/docs"
                className="text-gray-600 hover:text-[#18B69B] px-3 py-2 text-sm font-medium transition-colors"
              >
                Documentation
              </Link>
              <Link 
                href="/auth/login"
                className="text-gray-600 hover:text-[#18B69B] px-3 py-2 text-sm font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
            <div className="sm:hidden">
              <Link 
                href="/auth/login"
                className="text-gray-600 hover:text-[#18B69B] px-3 py-2 text-sm font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              <span className="bg-gradient-to-r from-[#18B69B] to-[#13D3BD] bg-clip-text text-transparent">
                <TypeAnimation
                  sequence={[
                    'Gaming Platform Management',
                    2000,
                    'Player Management',
                    2000,
                    'Transaction Management',
                    2000,
                    'API Integration',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
              <br className="hidden sm:block" />
              Made <span className="bg-gradient-to-r from-[#18B69B] to-[#13D3BD] bg-clip-text text-transparent">Simple</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Comprehensive solution for gaming operators. Manage your players, transactions, and API integrations all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#18B69B] to-[#13D3BD] hover:opacity-90 transition-all shadow-lg shadow-[#18B69B]/20 hover:shadow-xl hover:shadow-[#18B69B]/30"
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/docs"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all hover:border-[#18B69B] hover:text-[#18B69B]"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#18B69B]/30 transition-colors hover:shadow-lg group">
              <div className="h-12 w-12 bg-[#18B69B]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#18B69B]/20 transition-colors">
                <svg className="h-6 w-6 text-[#18B69B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#18B69B] transition-colors">Secure & Reliable</h3>
              <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Enterprise-grade security with 24/7 monitoring and support.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#18B69B]/30 transition-colors hover:shadow-lg group">
              <div className="h-12 w-12 bg-[#18B69B]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#18B69B]/20 transition-colors">
                <svg className="h-6 w-6 text-[#18B69B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#18B69B] transition-colors">Game Management</h3>
              <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Easily manage and monitor all your game integrations.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#18B69B]/30 transition-colors hover:shadow-lg group">
              <div className="h-12 w-12 bg-[#18B69B]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#18B69B]/20 transition-colors">
                <svg className="h-6 w-6 text-[#18B69B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#18B69B] transition-colors">Payment Processing</h3>
              <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Seamless payment integration with multiple providers.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#18B69B]/30 transition-colors hover:shadow-lg group">
              <div className="h-12 w-12 bg-[#18B69B]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#18B69B]/20 transition-colors">
                <svg className="h-6 w-6 text-[#18B69B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#18B69B] transition-colors">Easy Integration</h3>
              <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Quick and easy API integration with detailed documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#18B69B] to-[#13D3BD] bg-clip-text text-transparent mb-8">Ready to get started?</h2>
            <Link
              href="/auth/register"
              className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#18B69B] to-[#13D3BD] hover:opacity-90 transition-all shadow-lg shadow-[#18B69B]/20 hover:shadow-xl hover:shadow-[#18B69B]/30"
            >
              Create your account now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/dashboard" className="text-sm text-gray-600 hover:text-[#18B69B] transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-sm text-gray-600 hover:text-[#18B69B] transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-sm text-gray-600 hover:text-[#18B69B] transition-colors">
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:support@example.com" className="text-sm text-gray-600 hover:text-[#18B69B] transition-colors">
                    support@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} SlotDashboard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 