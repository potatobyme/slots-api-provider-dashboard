"use client"

import { BookOpen, Search, ChevronRight } from "lucide-react"

const DocSection = ({ title, description, href }: { title: string; description: string; href: string }) => {
  return (
    <a
      href={href}
      className="p-4 rounded-xl border border-gray-200 hover:border-[#18B69B]/30 transition-colors group"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-[#2D3359] group-hover:text-[#18B69B]">{title}</h3>
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#18B69B]" />
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    </a>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-[#18B69B]/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-[#18B69B]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#2D3359]">Documentation</h1>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#18B69B]/30"
          />
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DocSection
            title="Getting Started"
            description="Learn the basics of our platform and how to integrate our services into your application."
            href="/docs/getting-started"
          />
          <DocSection
            title="API Reference"
            description="Comprehensive API documentation with examples and use cases for all endpoints."
            href="/docs/api-reference"
          />
          <DocSection
            title="Webhooks"
            description="Set up and manage webhooks to receive real-time updates about events in your application."
            href="/docs/webhooks"
          />
          <DocSection
            title="SDK Integration"
            description="Step-by-step guides for integrating our SDKs in various programming languages."
            href="/docs/sdk-integration"
          />
          <DocSection
            title="Best Practices"
            description="Learn about security best practices, performance optimization, and coding standards."
            href="/docs/best-practices"
          />
          <DocSection
            title="FAQs"
            description="Find answers to commonly asked questions about our platform and services."
            href="/docs/faqs"
          />
        </div>
      </div>
    </div>
  )
} 