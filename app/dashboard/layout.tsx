"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/layouts/dashboard-header"
import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
      </main>
    </div>
  )
}
