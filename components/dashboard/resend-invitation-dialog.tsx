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
import { Loader2, Mail } from "lucide-react"
import { apiClient } from "@/lib/api/client"
import { toast } from "sonner"

interface Employee {
  id: string
  full_name: string
  phone: string
}

interface ResendInvitationDialogProps {
  employee: Employee | null
  onClose: () => void
  onResent: () => void
}

export function ResendInvitationDialog({ employee, onClose, onResent }: ResendInvitationDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleResend = async () => {
    if (!employee) return

    setIsLoading(true)

    try {
      await apiClient.post(`/employees/${employee.id}/resend-invitation`, {})
      toast.success("Nueva invitación enviada", {
        description: `Se envió un nuevo link a ${employee.phone}`,
      })
      onResent()
    } catch (error: any) {
      toast.error("Error al reenviar invitación", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={!!employee} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <AlertDialogTitle className="text-center">¿Reenviar invitación a {employee?.full_name}?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3 text-center">
            <p>Se generará un nuevo link válido por 24 horas</p>
            <p className="text-sm text-gray-600">El link anterior quedará inválido</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleResend} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reenviar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
