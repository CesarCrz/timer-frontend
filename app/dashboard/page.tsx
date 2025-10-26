"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Clock, CreditCard, TrendingUp, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { apiClient } from "@/lib/api/client"

interface DashboardStats {
  today: {
    active_employees: number
    late_arrivals: number
    total_employees: number
  }
  weekly_chart: Array<{
    day: string
    on_time: number
    late: number
    absent: number
  }>
  active_now: Array<{
    id: string
    name: string
    branch: string
    check_in_time: string
  }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await apiClient.get<DashboardStats>("/dashboard/stats")
      setStats(data)
    } catch (err: any) {
      setError(err.message || "Error al cargar estadísticas")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateDuration = (checkInTime: string) => {
    const checkIn = new Date(checkInTime)
    const now = new Date()
    const diff = now.getTime() - checkIn.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="mb-2 h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-1 h-8 w-16" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchStats}>
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vista general de tu negocio</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Empleados Activos Hoy</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900">
              {stats.today.active_employees}/{stats.today.total_employees}
            </div>
            <p className="mt-1 text-sm text-gray-500">Empleados trabajando ahora</p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Llegadas Tarde</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold text-gray-900">{stats.today.late_arrivals}</div>
              {stats.today.late_arrivals > 0 && (
                <Badge variant="destructive" className="text-xs">
                  Hoy
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">Llegadas tarde hoy</p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sucursales</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900">3/5</div>
            <Link href="/dashboard/branches" className="mt-1 text-sm text-primary hover:underline">
              Gestionar
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Suscripción</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <CreditCard className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-gray-900">Plan Profesional</div>
            <Link href="/dashboard/subscription" className="mt-1 text-sm text-primary hover:underline">
              Ver detalles
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="h-6 w-6 text-primary" />
            Asistencia Esta Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={stats.weekly_chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="on_time" fill="#10B981" name="A Tiempo" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" fill="#F59E0B" name="Tarde" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#9CA3AF" name="Ausente" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Activos en Este Momento</CardTitle>
            {stats.active_now.length > 5 && (
              <Link href="/dashboard/employees?filter=active">
                <Button variant="outline" size="sm">
                  Ver todos
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {stats.active_now.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-4 h-16 w-16 text-gray-300" />
              <p className="text-lg font-medium text-gray-600">No hay empleados trabajando en este momento</p>
              <p className="mt-1 text-sm text-gray-500">Los empleados activos aparecerán aquí</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sucursal</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Hora de Entrada</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {stats.active_now.slice(0, 5).map((employee) => (
                    <tr key={employee.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{employee.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{employee.branch}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(employee.check_in_time).toLocaleTimeString("es-MX", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {calculateDuration(employee.check_in_time)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
