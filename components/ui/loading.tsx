'use client';

import { Loader2 } from "lucide-react"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
  text?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
}

export function Loading({ 
  className = "", 
  size = "md", 
  fullScreen = false,
  text
}: LoadingProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizeMap[size]} animate-spin text-blue-500`} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

export function LoadingContainer({ children, isLoading, className = "" }: {
  children: React.ReactNode
  isLoading: boolean
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
          <Loading />
        </div>
      )}
    </div>
  )
}

export function LoadingSpinner({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8"
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-[#18B69B]`} />
  );
}

export function LoadingPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoadingSpinner size="large" />
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
        <LoadingSpinner />
        <span className="text-gray-700">Loading...</span>
      </div>
    </div>
  );
} 