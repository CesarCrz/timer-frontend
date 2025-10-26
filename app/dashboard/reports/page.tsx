"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileText, Loader2, Mail, CheckCircle } from "lucide-react"
import { apiClient } from "@/lib/api/client"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ReportResponse {
  report_url: string
  expires_at: string
}

export default function ReportsPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [branchId, setBranchId] = useState("all")
  const [employeeId, setEmployeeId] = useState("all")
  const [format, setFormat] = useState<"pdf" | "excel">("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportUrl, setReportUrl] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")

  const setQuickRange = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)

    setEndDate(end.toISOString().split("T")[0])
    setStartDate(start.toISOString().split("T")[0])
  }

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      toast.error("Selecciona un rango de fechas")
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La fecha de inicio debe ser anterior a la fecha final")
      return
    }

    setIsGenerating(true)

    try {
      const data = await apiClient.post<ReportResponse>("/reports/generate", {
        start_date: startDate,
        end_date: endDate,
        branch_id: branchId === "all" ? null : branchId,
        employee_id: employeeId === "all" ? null : employeeId,
        format,
      })

      setReportUrl(data.report_url)
      setExpiresAt(data.expires_at)
      setShowSuccessModal(true)
      toast.success("Reporte generado exitosamente")
    } catch (error: any) {
      toast.error("Error al generar reporte", {
        description: error.message,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendEmail = async () => {
    if (!reportUrl) return

    setIsSendingEmail(true)

    try {
      await apiClient.post("/reports/send-email", {
        report_url: reportUrl,
        email: emailAddress || undefined,
      })

      toast.success("Reporte enviado por email", {
        description: `Se envió a ${emailAddress || "tu correo registrado"}`,
      })
      setShowSuccessModal(false)
    } catch (error: any) {
      toast.error("Error al enviar email", {
        description: error.message,
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  const handleDownload = () => {
    if (reportUrl) {
      window.open(reportUrl, "_blank")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generar Reporte de Asistencia</h1>
        <p className="text-gray-600">Crea reportes detallados de asistencia para nómina y análisis</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Configuración del Reporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">Rango de Fechas *</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start" className="text-sm text-gray-600">
                        Fecha Inicio
                      </Label>
                      <Input
                        id="start"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end" className="text-sm text-gray-600">
                        Fecha Fin
                      </Label>
                      <Input
                        id="end"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setQuickRange(7)}>
                      Última Semana
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setQuickRange(15)}>
                      Últimas 2 Semanas
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setQuickRange(30)}>
                      Último Mes
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Sucursal</Label>
                  <Select value={branchId} onValueChange={setBranchId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las sucursales</SelectItem>
                      <SelectItem value="branch1">Sucursal Centro</SelectItem>
                      <SelectItem value="branch2">Sucursal Norte</SelectItem>
                      <SelectItem value="branch3">Sucursal Sur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee">Empleado</Label>
                  <Select value={employeeId} onValueChange={setEmployeeId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los empleados</SelectItem>
                      <SelectItem value="emp1">Juan Pérez</SelectItem>
                      <SelectItem value="emp2">María González</SelectItem>
                      <SelectItem value="emp3">Carlos López</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Formato</Label>
                  <RadioGroup value={format} onValueChange={(value) => setFormat(value as "pdf" | "excel")}>
                    <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4">
                      <RadioGroupItem value="pdf" id="pdf" />
                      <label htmlFor="pdf" className="flex-1 cursor-pointer">
                        <p className="font-medium">PDF</p>
                        <p className="text-sm text-gray-500">Recomendado - Más profesional</p>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4">
                      <RadioGroupItem value="excel" id="excel" />
                      <label htmlFor="excel" className="flex-1 cursor-pointer">
                        <p className="font-medium">Excel</p>
                        <p className="text-sm text-gray-500">Para procesamiento en software de nómina</p>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generando reporte...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Generar Reporte
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">El reporte incluye:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-blue-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span>Horas trabajadas por empleado</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span>Llegadas tarde con indicador visual</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span>Tiempo extra calculado automáticamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span>Total a pagar por empleado</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Reportes Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="font-medium text-gray-900">01-15 Oct</p>
                    <p className="text-xs text-gray-500">Todas las sucursales</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="font-medium text-gray-900">16-30 Sep</p>
                    <p className="text-xs text-gray-500">Sucursal Centro</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl">Reporte Generado</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {format === "pdf" && (
              <div className="aspect-video w-full rounded-lg border border-gray-200 bg-gray-50">
                <div className="flex h-full items-center justify-center text-gray-500">
                  <FileText className="h-12 w-12" />
                </div>
              </div>
            )}

            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
              <p className="font-medium">Este link expira en 24 horas</p>
              <p className="mt-1 text-xs">Expira: {expiresAt ? new Date(expiresAt).toLocaleString("es-MX") : ""}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Enviar por email (opcional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@empresa.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline" className="flex-1 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
              <Button onClick={handleSendEmail} disabled={isSendingEmail} className="flex-1">
                {isSendingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                Enviar Email
              </Button>
            </div>

            <Button variant="ghost" onClick={() => setShowSuccessModal(false)} className="w-full">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
