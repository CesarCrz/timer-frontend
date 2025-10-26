"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Loader2, TrendingUp } from "lucide-react"
import { apiClient } from "@/lib/api/client"
import { toast } from "sonner"
import Link from "next/link"

interface ChangePlanDialogProps {
  currentPlan: string
  selectedPlan: string | null
  currentUsage: {
    branches: number
    employees: number
  }
  onClose: () => void
  onChanged: () => void
}

const PLAN_LIMITS: Record<string, { maxBranches: number; maxEmployees: number; price: number; name: string }> = {
  basic: { maxBranches: 2, maxEmployees: 15, price: 299, name: "Básico" },
  professional: { maxBranches: 5, maxEmployees: 50, price: 599, name: "Profesional" },
  enterprise: { maxBranches: 999, maxEmployees: 999, price: 1199, name: "Empresarial" },
}

export function ChangePlanDialog({
  currentPlan,
  selectedPlan,
  currentUsage,
  onClose,
  onChanged,
}: ChangePlanDialogProps) {
  const [confirmed, setConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!selectedPlan || selectedPlan === currentPlan) return null

  const newPlan = PLAN_LIMITS[selectedPlan]
  const oldPlan = PLAN_LIMITS[currentPlan]
  const isUpgrade = newPlan.price > oldPlan.price
  const isDowngrade = newPlan.price < oldPlan.price

  const exceedsBranches = currentUsage.branches > newPlan.maxBranches
  const exceedsEmployees = currentUsage.employees > newPlan.maxEmployees
  const cannotDowngrade = isDowngrade && (exceedsBranches || exceedsEmployees)

  const handleConfirm = async () => {
    if (!confirmed && isDowngrade) return

    setIsLoading(true)

    try {
      await apiClient.post("/subscription/change-plan", {
        new_plan: selectedPlan,
      })

      toast.success(isUpgrade ? "Plan mejorado exitosamente" : "Plan cambiado exitosamente")
      onChanged()
      onClose()
    } catch (error: any) {
      toast.error("Error al cambiar plan", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
      setConfirmed(false)
    }
  }

  if (cannotDowngrade) {
    return (
      <AlertDialog open={!!selectedPlan} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-center">No puedes hacer downgrade</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              {exceedsBranches && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-900">
                  <p className="font-medium">Tienes {currentUsage.branches} sucursales activas</p>
                  <p className="mt-1">
                    El plan {newPlan.name} permite solo {newPlan.maxBranches}. Desactiva{" "}
                    {currentUsage.branches - newPlan.maxBranches} sucursal(es) para poder cambiar de plan.
                  </p>
                </div>
              )}

              {exceedsEmployees && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-900">
                  <p className="font-medium">Tienes {currentUsage.employees} empleados activos</p>
                  <p className="mt-1">
                    El plan {newPlan.name} permite solo {newPlan.maxEmployees}. Desactiva{" "}
                    {currentUsage.employees - newPlan.maxEmployees} empleado(s) para poder cambiar de plan.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {exceedsBranches && (
              <Button asChild>
                <Link href="/dashboard/branches">Ir a Sucursales</Link>
              </Button>
            )}
            {exceedsEmployees && (
              <Button asChild>
                <Link href="/dashboard/employees">Ir a Empleados</Link>
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <AlertDialog open={!!selectedPlan} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <AlertDialogTitle className="text-center">
            {isUpgrade ? `Mejorar a Plan ${newPlan.name}` : `Cambiar a Plan ${newPlan.name}`}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            {isUpgrade ? (
              <>
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                  <p className="font-medium">Cambios inmediatos:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Sucursales: {oldPlan.maxBranches} → {newPlan.maxBranches}
                    </li>
                    <li>
                      Empleados: {oldPlan.maxEmployees} → {newPlan.maxEmployees}
                    </li>
                    <li>Reportes avanzados incluidos</li>
                    <li>Soporte prioritario</li>
                  </ul>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">Costo:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Precio nuevo: ${newPlan.price}/mes</li>
                    <li>Prorrateo hoy: ${Math.round((newPlan.price - oldPlan.price) * 0.4)} MXN</li>
                    <li className="text-xs">(por los días restantes del periodo)</li>
                  </ul>
                  <p className="text-gray-600">
                    Próximo pago completo: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("es-MX")}{" "}
                    - ${newPlan.price}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-900">
                  <p className="font-medium">Perderás acceso a:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      {oldPlan.maxBranches} sucursales → {newPlan.maxBranches} sucursales
                    </li>
                    <li>
                      {oldPlan.maxEmployees} empleados → {newPlan.maxEmployees} empleados
                    </li>
                    <li>Reportes avanzados</li>
                    <li>Soporte prioritario</li>
                  </ul>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">Costo:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Precio nuevo: ${newPlan.price}/mes</li>
                    <li>
                      Cambio efectivo: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("es-MX")}
                    </li>
                    <li className="text-xs">(fin de periodo actual)</li>
                    <li>No hay reembolso prorrateado</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-900">
                  <p className="font-medium">Uso actual:</p>
                  <ul className="mt-1 space-y-1">
                    <li>
                      {currentUsage.branches}/{newPlan.maxBranches} sucursales (dentro del límite)
                    </li>
                    <li>
                      {currentUsage.employees}/{newPlan.maxEmployees} empleados (dentro del límite)
                    </li>
                  </ul>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="confirm"
                    checked={confirmed}
                    onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                  />
                  <label htmlFor="confirm" className="text-sm leading-relaxed">
                    Entiendo los cambios y quiero continuar
                  </label>
                </div>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={(isDowngrade && !confirmed) || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUpgrade ? "Confirmar Upgrade" : "Confirmar Cambio"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
