"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Clock, MapPin, Plus, Edit, Trash2, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api/client"
import { BranchModal } from "@/components/dashboard/branch-modal"
import { DeleteBranchDialog } from "@/components/dashboard/delete-branch-dialog"
import { toast } from "sonner"

interface Branch {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  tolerance_radius_meters: number
  timezone: string
  business_hours_start: string
  business_hours_end: string
  active_employees_count: number
  status: string
}

interface BranchesResponse {
  branches: Branch[]
  total: number
  max_allowed: number
}

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [total, setTotal] = useState(0)
  const [maxAllowed, setMaxAllowed] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null)

  useEffect(() => {
    fetchBranches()
  }, [])

  const fetchBranches = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await apiClient.get<BranchesResponse>("/branches")
      setBranches(data.branches)
      setTotal(data.total)
      setMaxAllowed(data.max_allowed)
    } catch (err: any) {
      setError(err.message || "Error al cargar sucursales")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBranch = () => {
    if (total >= maxAllowed) {
      toast.error("Límite alcanzado", {
        description: `Has alcanzado el límite de ${maxAllowed} sucursales de tu plan`,
      })
      return
    }
    setSelectedBranch(null)
    setIsModalOpen(true)
  }

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch)
    setIsModalOpen(true)
  }

  const handleDeleteBranch = (branch: Branch) => {
    setBranchToDelete(branch)
  }

  const handleBranchSaved = () => {
    setIsModalOpen(false)
    setSelectedBranch(null)
    fetchBranches()
  }

  const handleBranchDeleted = () => {
    setBranchToDelete(null)
    fetchBranches()
  }

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchBranches}>
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
          <h1 className="text-3xl font-bold text-gray-900">Sucursales</h1>
          <p className="text-gray-600">
            {total}/{maxAllowed} sucursales activas
          </p>
        </div>
        <Button onClick={handleCreateBranch} disabled={total >= maxAllowed}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Sucursal
        </Button>
      </div>

      {branches.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Building2 className="mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No tienes sucursales</h3>
            <p className="mb-6 text-gray-600">Crea tu primera sucursal para comenzar</p>
            <Button onClick={handleCreateBranch}>
              <Plus className="mr-2 h-4 w-4" />
              Crear Primera Sucursal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <Card key={branch.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  {branch.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">{branch.address}</p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Tolerancia:</span>
                    <Badge variant="secondary">{branch.tolerance_radius_meters}m</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {branch.business_hours_start} - {branch.business_hours_end}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    <span className="text-xs">Zona: {branch.timezone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    {branch.active_employees_count} empleados activos
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => handleEditBranch(branch)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                    onClick={() => handleDeleteBranch(branch)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BranchModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedBranch(null)
        }}
        branch={selectedBranch}
        onSaved={handleBranchSaved}
      />

      <DeleteBranchDialog
        branch={branchToDelete}
        onClose={() => setBranchToDelete(null)}
        onDeleted={handleBranchDeleted}
      />
    </div>
  )
}
