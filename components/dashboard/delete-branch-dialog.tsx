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
import { Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api/client"
import { toast } from "sonner"

interface Branch {
  id: string
  name: string
  active_employees_count: number
}

interface DeleteBranchDialogProps {
  branch: Branch | null
  onClose: () => void
  onDeleted: () => void
}

export function DeleteBranchDialog({ branch, onClose, onDeleted }: DeleteBranchDialogProps) {
  const [confirmed, setConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!branch || !confirmed) return

    setIsLoading(true)

    try {
      await apiClient.delete(`/branches/${branch.id}`)
      toast.success("Sucursal eliminada exitosamente")
      onDeleted()
    } catch (error: any) {
      if (error.status === 400) {
        toast.error("No se puede eliminar", {
          description: "Esta sucursal tiene empleados activos",
        })
      } else {
        toast.error("Error al eliminar sucursal", {
          description: error.message,
        })
      }
    } finally {
      setIsLoading(false)
      setConfirmed(false)
    }
  }

  return (
    <AlertDialog open={!!branch} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar {branch?.name}?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            {branch && branch.active_employees_count > 0 ? (
              <div className="rounded-lg bg-red-50 p-4 text-red-900">
                <p className="font-medium">No puedes eliminar esta sucursal</p>
                <p className="mt-1 text-sm">
                  Tiene {branch.active_employees_count} empleados activos. Primero desactiva o reasigna los empleados.
                </p>
              </div>
            ) : (
              <>
                <p>Esta sucursal tiene {branch?.active_employees_count || 0} empleados activos. Al eliminarla:</p>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>Los empleados NO se eliminarán</li>
                  <li>Sus registros de asistencia se conservarán</li>
                  <li>Los empleados quedarán sin sucursal asignada</li>
                </ul>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="confirm"
                    checked={confirmed}
                    onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                  />
                  <label htmlFor="confirm" className="text-sm leading-relaxed">
                    Entiendo que esta acción no se puede deshacer
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
          {branch && branch.active_employees_count === 0 && (
            <Button variant="destructive" onClick={handleDelete} disabled={!confirmed || isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Eliminar
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
