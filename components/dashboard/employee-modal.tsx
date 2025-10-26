"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Loader2, Mail } from "lucide-react"
import { apiClient } from "@/lib/api/client"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Employee {
  id: string
  full_name: string
  phone: string
  hourly_rate: number
  branches: Array<{ id: string; name: string }>
}

interface EmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  onSaved: () => void
}

const MOCK_BRANCHES = [
  { id: "1", name: "Sucursal Centro" },
  { id: "2", name: "Sucursal Norte" },
  { id: "3", name: "Sucursal Sur" },
]

export function EmployeeModal({ isOpen, onClose, employee, onSaved }: EmployeeModalProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [invitationSent, setInvitationSent] = useState(false)
  const [invitationLink, setInvitationLink] = useState("")
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    hourly_rate: 50,
    branch_ids: [] as string[],
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        full_name: employee.full_name,
        phone: employee.phone,
        hourly_rate: employee.hourly_rate,
        branch_ids: employee.branches.map((b) => b.id),
      })
    } else {
      setFormData({
        full_name: "",
        phone: "",
        hourly_rate: 50,
        branch_ids: [],
      })
    }
    setStep(1)
    setInvitationSent(false)
  }, [employee, isOpen])

  const handleNext = () => {
    if (step === 1) {
      if (!formData.full_name || formData.full_name.length < 3) {
        toast.error("El nombre debe tener al menos 3 caracteres")
        return
      }
      if (!formData.phone || !/^\+52\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
        toast.error("Ingresa un teléfono válido con formato +52 seguido de 10 dígitos")
        return
      }
      if (formData.hourly_rate < 50 || formData.hourly_rate > 10000) {
        toast.error("La tarifa debe estar entre $50 y $10,000")
        return
      }
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const toggleBranch = (branchId: string) => {
    setFormData((prev) => ({
      ...prev,
      branch_ids: prev.branch_ids.includes(branchId)
        ? prev.branch_ids.filter((id) => id !== branchId)
        : [...prev.branch_ids, branchId],
    }))
  }

  const handleSave = async () => {
    if (formData.branch_ids.length === 0) {
      toast.error("Selecciona al menos una sucursal")
      return
    }

    setIsLoading(true)

    try {
      if (employee) {
        await apiClient.put(`/employees/${employee.id}`, formData)
        toast.success("Empleado actualizado exitosamente")
        onSaved()
      } else {
        const response = await apiClient.post<{ employee: Employee; invitation_link: string }>("/employees", formData)
        setInvitationLink(response.invitation_link)
        setInvitationSent(true)
      }
    } catch (error: any) {
      if (error.status === 403) {
        toast.error("Límite de plan alcanzado", {
          description: "Mejora tu plan para agregar más empleados",
        })
      } else {
        toast.error("Error al guardar empleado", {
          description: error.message,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (invitationSent) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl">Invitación Enviada</DialogTitle>
          </DialogHeader>

          <Alert className="bg-blue-50">
            <AlertDescription>
              <p className="font-medium text-blue-900">Invitación enviada por WhatsApp al {formData.phone}</p>
              <p className="mt-2 text-sm text-blue-800">
                El empleado recibirá un link único que expira en 24 horas. Puedes reenviar la invitación desde la tabla
                si no la acepta.
              </p>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Link de invitación (opcional):</Label>
            <div className="flex gap-2">
              <Input value={invitationLink} readOnly className="text-xs" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(invitationLink)
                  toast.success("Link copiado")
                }}
              >
                Copiar
              </Button>
            </div>
          </div>

          <Button
            onClick={() => {
              setInvitationSent(false)
              onSaved()
            }}
            className="w-full"
          >
            Listo
          </Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{employee ? "Editar Empleado" : "Nuevo Empleado"}</DialogTitle>
          <p className="text-sm text-gray-600">Paso {step} de 2</p>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  placeholder="Juan Pérez"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono WhatsApp *</Label>
                <Input
                  id="phone"
                  placeholder="+52 332 623 2840"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <p className="text-xs text-gray-500">Formato: +52 seguido de 10 dígitos</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Tarifa por hora (MXN) *</Label>
                <Input
                  id="rate"
                  type="number"
                  min={50}
                  max={10000}
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData({ ...formData, hourly_rate: Number(e.target.value) })}
                />
                <p className="text-xs text-gray-500">El empleado NO verá su tarifa por hora en la invitación</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">¿En qué sucursales puede trabajar? *</Label>
                <div className="space-y-2">
                  {MOCK_BRANCHES.map((branch) => (
                    <div key={branch.id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                      <Checkbox
                        id={branch.id}
                        checked={formData.branch_ids.includes(branch.id)}
                        onCheckedChange={() => toggleBranch(branch.id)}
                      />
                      <label htmlFor={branch.id} className="flex-1 cursor-pointer text-sm font-medium">
                        {branch.name}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  El empleado podrá marcar asistencia en todas las sucursales seleccionadas
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-2 font-medium text-gray-900">Resumen:</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Nombre:</span> {formData.full_name}
                  </p>
                  <p>
                    <span className="font-medium">Teléfono:</span> {formData.phone}
                  </p>
                  <p>
                    <span className="font-medium">Tarifa:</span> ${formData.hourly_rate}/hora
                  </p>
                  <p>
                    <span className="font-medium">Sucursales:</span>{" "}
                    {formData.branch_ids.length > 0
                      ? MOCK_BRANCHES.filter((b) => formData.branch_ids.includes(b.id))
                          .map((b) => b.name)
                          .join(", ")
                      : "Ninguna"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>
            ) : (
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            )}

            {step < 2 ? (
              <Button onClick={handleNext}>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {employee ? "Actualizar" : "Enviar Invitación"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
