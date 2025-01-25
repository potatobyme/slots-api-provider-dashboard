"use client"

import { User, Mail, Key, Shield } from "lucide-react"
import { useQuery } from '@apollo/client'
import { ME_QUERY } from '@/lib/graphql/auth'

export default function ProfilePage() {
  const { data, loading, error } = useQuery(ME_QUERY, {
    fetchPolicy: 'network-only',
  })

  if (error) {
    console.error('Profile fetch error:', error);
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load profile data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded-full w-20 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-[#18B69B] flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-medium">{data?.me?.username}</h2>
                  <p className="text-gray-500">{data?.me?.email}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <p className="font-medium">{data?.me?.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Role</span>
                  </div>
                  <p className="font-medium capitalize">{data?.me?.role}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm">Username</span>
                  </div>
                  <p className="font-medium">{data?.me?.username}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Key className="h-4 w-4" />
                    <span className="text-sm">Account Status</span>
                  </div>
                  <p className="font-medium text-green-600">Active</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 