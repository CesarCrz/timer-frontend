"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, Loader2, MapPin } from "lucide-react"
import { apiClient } from "@/lib/api/client"
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
}

interface BranchModalProps {
  isOpen: boolean
  onClose: () => void
  branch: Branch | null
  onSaved: () => void
}

const TIMEZONES = [
  { value: "America/Mexico_City", label: "Ciudad de México (Centro)" },
  { value: "America/Monterrey", label: "Monterrey (Norte)" },
  { value: "America/Tijuana", label: "Tijuana (Pacífico)" },
  { value: "America/Cancun", label: "Cancún (Sureste)" },
]

export function BranchModal({ isOpen, onClose, branch, onSaved }: BranchModalProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    timezone: "America/Mexico_City",
    address: "",
    latitude: 20.659699,
    longitude: -103.349609,
    tolerance_radius_meters: 100,
    business_hours_start: "08:00",
    business_hours_end: "23:00",
  })

  useEffect(() => {
    if (branch) {
      setFormData({
        name: branch.name,
        timezone: branch.timezone,
        address: branch.address,
        latitude: branch.latitude,
        longitude: branch.longitude,
        tolerance_radius_meters: branch.tolerance_radius_meters,
        business_hours_start: branch.business_hours_start,
        business_hours_end: branch.business_hours_end,
      })
    } else {
      setFormData({
        name: "",
        timezone: "America/Mexico_City",
        address: "",
        latitude: 20.659699,
        longitude: -103.349609,
        tolerance_radius_meters: 100,
        business_hours_start: "08:00",
        business_hours_end: "23:00",
      })
    }
    setStep(1)
  }, [branch, isOpen])

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.timezone)) {
      toast.error("Completa todos los campos requeridos")
      return
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      if (branch) {
        await apiClient.put(`/branches/${branch.id}`, formData)
        toast.success("Sucursal actualizada exitosamente")
      } else {
        await apiClient.post("/branches", formData)
        toast.success("Sucursal creada exitosamente")
      }
      onSaved()
    } catch (error: any) {
      if (error.status === 403) {
        toast.error("Límite de plan alcanzado", {
          description: "Mejora tu plan para agregar más sucursales",
        })
      } else {
        toast.error("Error al guardar sucursal", {
          description: error.message,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{branch ? "Editar Sucursal" : "Nueva Sucursal"}</DialogTitle>
          <p className="text-sm text-gray-600">Paso {step} de 3</p>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la sucursal *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Sucursal Centro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zona horaria *</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  placeholder="Calle Ejemplo 123, Guadalajara"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>
                    Coordenadas: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                  </span>
                </div>

                <div className="aspect-video w-full rounded-lg bg-gray-200">
                  <div className="flex h-full items-center justify-center text-gray-500">Mapa interactivo (Mapbox)</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Radio de tolerancia: {formData.tolerance_radius_meters}m</Label>
                <Slider
                  value={[formData.tolerance_radius_meters]}
                  onValueChange={(value) => setFormData({ ...formData, tolerance_radius_meters: value[0] })}
                  min={10}
                  max={200}
                  step={10}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Empleados pueden marcar dentro de este radio</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start">Hora de apertura</Label>
                  <Input
                    id="start"
                    type="time"
                    value={formData.business_hours_start}
                    onChange={(e) => setFormData({ ...formData, business_hours_start: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end">Hora de cierre</Label>
                  <Input
                    id="end"
                    type="time"
                    value={formData.business_hours_end}
                    onChange={(e) => setFormData({ ...formData, business_hours_end: e.target.value })}
                  />
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                <p className="font-medium">Estos horarios se usan para:</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Detectar llegadas tarde</li>
                  <li>Cerrar automáticamente check-ins pendientes</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-2 font-medium text-gray-900">Resumen:</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Nombre:</span> {formData.name}
                  </p>
                  <p>
                    <span className="font-medium">Ubicación:</span> {formData.address || "Sin dirección"}
                  </p>
                  <p>
                    <span className="font-medium">Tolerancia:</span> {formData.tolerance_radius_meters}m
                  </p>
                  <p>
                    <span className="font-medium">Horario:</span> {formData.business_hours_start} -{" "}
                    {formData.business_hours_end}
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

            {step < 3 ? (
              <Button onClick={handleNext}>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {branch ? "Actualizar" : "Guardar"} Sucursal
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
