"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus, Search, UserPlus, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { apiClient } from "@/lib/api/client"
import { EmployeeModal } from "@/components/dashboard/employee-modal"
import { DeleteEmployeeDialog } from "@/components/dashboard/delete-employee-dialog"
import { ResendInvitationDialog } from "@/components/dashboard/resend-invitation-dialog"
import { toast } from "sonner"

interface Employee {
  id: string
  full_name: string
  phone: string
  hourly_rate: number
  status: "active" | "pending" | "inactive"
  branches: Array<{ id: string; name: string }>
  invitation_status: "accepted" | "pending" | "expired"
  created_at: string
}

interface EmployeesResponse {
  employees: Employee[]
  total: number
  max_allowed: number
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [total, setTotal] = useState(0)
  const [maxAllowed, setMaxAllowed] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [branchFilter, setBranchFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null)
  const [employeeToResend, setEmployeeToResend] = useState<Employee | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [employees, activeTab, searchQuery, branchFilter])

  const fetchEmployees = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await apiClient.get<EmployeesResponse>("/employees")
      setEmployees(data.employees)
      setTotal(data.total)
      setMaxAllowed(data.max_allowed)
    } catch (err: any) {
      setError(err.message || "Error al cargar empleados")
    } finally {
      setIsLoading(false)
    }
  }

  const filterEmployees = () => {
    let filtered = employees.filter((emp) => emp.status === activeTab)

    if (searchQuery) {
      filtered = filtered.filter(
        (emp) => emp.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.phone.includes(searchQuery),
      )
    }

    if (branchFilter !== "all") {
      filtered = filtered.filter((emp) => emp.branches.some((branch) => branch.id === branchFilter))
    }

    setFilteredEmployees(filtered)
  }

  const handleCreateEmployee = () => {
    if (total >= maxAllowed) {
      toast.error("Límite alcanzado", {
        description: `Has alcanzado el límite de ${maxAllowed} empleados de tu plan`,
      })
      return
    }
    setSelectedEmployee(null)
    setIsModalOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  const handleResendInvitation = (employee: Employee) => {
    setEmployeeToResend(employee)
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployeeToDelete(employee)
  }

  const handleEmployeeSaved = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
    fetchEmployees()
  }

  const handleEmployeeDeleted = () => {
    setEmployeeToDelete(null)
    fetchEmployees()
  }

  const handleInvitationResent = () => {
    setEmployeeToResend(null)
    fetchEmployees()
  }

  const getStatusBadge = (status: string, invitationStatus: string) => {
    if (status === "active") {
      return (
        <Badge className="bg-green-100 text-green-700">
          <span className="mr-1">●</span> Activo
        </Badge>
      )
    }
    if (status === "pending") {
      return (
        <Badge className="bg-yellow-100 text-yellow-700">
          <span className="mr-1">⏳</span> Pendiente
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
        <span className="mr-1">○</span> Inactivo
      </Badge>
    )
  }

  const activeCount = employees.filter((e) => e.status === "active").length
  const pendingCount = employees.filter((e) => e.status === "pending").length
  const inactiveCount = employees.filter((e) => e.status === "inactive").length

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
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
          <Button variant="outline" size="sm" onClick={fetchEmployees}>
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Empleados</h1>
          <p className="text-gray-600">
            {total}/{maxAllowed} empleados activos
          </p>
        </div>
        <Button onClick={handleCreateEmployee} disabled={total >= maxAllowed}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Activos ({activeCount})</TabsTrigger>
          <TabsTrigger value="pending">Pendientes ({pendingCount})</TabsTrigger>
          <TabsTrigger value="inactive">Inactivos ({inactiveCount})</TabsTrigger>
        </TabsList>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Filtrar por sucursal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las sucursales</SelectItem>
              <SelectItem value="branch1">Sucursal Centro</SelectItem>
              <SelectItem value="branch2">Sucursal Norte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {filteredEmployees.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Users className="mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {searchQuery || branchFilter !== "all"
                    ? "No hay empleados que coincidan con los filtros"
                    : "No tienes empleados"}
                </h3>
                {!searchQuery && branchFilter === "all" && (
                  <>
                    <p className="mb-6 text-gray-600">Invita a tu primer empleado para comenzar</p>
                    <Button onClick={handleCreateEmployee}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invitar Primer Empleado
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teléfono</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sucursales</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarifa/h</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="transition-colors hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{employee.full_name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{employee.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {employee.branches.map((b) => b.name).join(", ")}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">${employee.hourly_rate}</td>
                          <td className="px-6 py-4">{getStatusBadge(employee.status, employee.invitation_status)}</td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>Editar</DropdownMenuItem>
                                {employee.status === "pending" && (
                                  <DropdownMenuItem onClick={() => handleResendInvitation(employee)}>
                                    Reenviar Invitación
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => handleDeleteEmployee(employee)}
                                  className="text-red-600"
                                >
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEmployee(null)
        }}
        employee={selectedEmployee}
        onSaved={handleEmployeeSaved}
      />

      <DeleteEmployeeDialog
        employee={employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onDeleted={handleEmployeeDeleted}
      />

      <ResendInvitationDialog
        employee={employeeToResend}
        onClose={() => setEmployeeToResend(null)}
        onResent={handleInvitationResent}
      />
    </div>
  )
}
