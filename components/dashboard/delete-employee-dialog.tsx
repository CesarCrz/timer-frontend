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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api/client"
import { toast } from "sonner"

interface Employee {
  id: string
  full_name: string
  phone: string
}

interface DeleteEmployeeDialogProps {
  employee: Employee | null
  onClose: () => void
  onDeleted: () => void
}

export function DeleteEmployeeDialog({ employee, onClose, onDeleted }: DeleteEmployeeDialogProps) {
  const [phoneConfirmation, setPhoneConfirmation] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!employee || !confirmed || phoneConfirmation !== employee.phone) {
      toast.error("Verifica la información de confirmación")
      return
    }

    setIsLoading(true)

    try {
      await apiClient.delete(`/employees/${employee.id}`)
      toast.success("Empleado eliminado exitosamente")
      onDeleted()
    } catch (error: any) {
      toast.error("Error al eliminar empleado", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
      setPhoneConfirmation("")
      setConfirmed(false)
    }
  }

  const isValid = phoneConfirmation === employee?.phone && confirmed

  return (
    <AlertDialog open={!!employee} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <AlertDialogTitle className="text-center">Eliminar Empleado</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p className="text-center">
              Vas a eliminar a: <strong>{employee?.full_name}</strong>
            </p>

            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-900">
              <p className="font-medium">Esto eliminará:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>El empleado del sistema</li>
                <li>TODOS sus registros de asistencia históricos</li>
                <li>Esta acción NO se puede deshacer</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Para confirmar, escribe el número de teléfono del empleado:</Label>
              <Input
                id="phone"
                placeholder={employee?.phone}
                value={phoneConfirmation}
                onChange={(e) => setPhoneConfirmation(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              />
              <label htmlFor="confirm" className="text-sm leading-relaxed">
                Entiendo que se perderán todos los registros
              </label>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={!isValid || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Eliminar Permanentemente
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
