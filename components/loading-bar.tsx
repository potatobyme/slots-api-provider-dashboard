"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function LoadingBar() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    setProgress(30)

    const timer1 = setTimeout(() => setProgress(60), 200)
    const timer2 = setTimeout(() => setProgress(80), 400)
    const timer3 = setTimeout(() => {
      setProgress(100)
      const timer4 = setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 200)
      return () => clearTimeout(timer4)
    }, 600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="h-0.5 bg-[#18B69B] transition-all duration-200 ease-out"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 2px 4px rgba(24, 182, 155, 0.3)'
        }}
      />
    </div>
  )
} 