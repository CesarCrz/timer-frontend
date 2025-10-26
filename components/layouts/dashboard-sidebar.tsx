"use client"

import { BarChart3, Building2, CreditCard, FileText, LayoutDashboard, Users, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/branches", label: "Sucursales", icon: Building2 },
  { href: "/dashboard/employees", label: "Empleados", icon: Users },
  { href: "/dashboard/reports", label: "Reportes", icon: FileText },
  { href: "/dashboard/subscription", label: "Suscripción", icon: CreditCard },
]

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive ? "border-l-4 border-primary bg-blue-50 text-primary" : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="m-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-semibold text-gray-900">Plan Profesional</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-600">Sucursales</span>
                  <span className="font-medium text-gray-900">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-600">Empleados</span>
                  <span className="font-medium text-gray-900">28/50</span>
                </div>
                <Progress value={56} className="h-2" />
              </div>
            </div>

            <Button asChild className="mt-4 w-full" size="sm">
              <Link href="/dashboard/subscription">Mejorar Plan</Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
