"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Building2, CheckCircle, Clock, Loader2, Mail, MapPin, XCircle } from "lucide-react"
import { apiClient } from "@/lib/api/client"
import { toast } from "sonner"
import Link from "next/link"

interface InvitationData {
  valid: boolean
  invitation?: {
    employee_name: string
    business_name: string
    branches: Array<{ name: string }>
    expires_at: string
  }
  error?: string
}

export default function EmployeeConfirmationPage() {
  const params = useParams()
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("")

  useEffect(() => {
    validateToken()
  }, [])

  useEffect(() => {
    if (invitation?.valid && invitation.invitation?.expires_at) {
      const interval = setInterval(() => {
        const now = new Date().getTime()
        const expiry = new Date(invitation.invitation!.expires_at).getTime()
        const diff = expiry - now

        if (diff <= 0) {
          setTimeRemaining("Expirado")
          clearInterval(interval)
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          setTimeRemaining(`${hours}h ${minutes}m`)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [invitation])

  const validateToken = async () => {
    setIsLoading(true)

    try {
      const data = await apiClient.get<InvitationData>(`/invitations/validate/${params.token}`)
      setInvitation(data)
    } catch (error: any) {
      setInvitation({
        valid: false,
        error: error.message || "Invitación no válida",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async () => {
    if (!termsAccepted) {
      toast.error("Debes aceptar los términos laborales")
      return
    }

    setIsAccepting(true)

    try {
      await apiClient.post("/invitations/accept", {
        token: params.token,
      })

      setAccepted(true)
      toast.success("Te has unido exitosamente al equipo")
    } catch (error: any) {
      toast.error("Error al aceptar invitación", {
        description: error.message,
      })
    } finally {
      setIsAccepting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-background p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-gray-600">Validando invitación...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!invitation?.valid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-background p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">
              {invitation?.error?.includes("expired") ? "Invitación Expirada" : "Invitación No Válida"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-gray-600">
              {invitation?.error?.includes("expired")
                ? "Esta invitación ya no es válida. Expiró el " +
                  new Date(invitation.invitation?.expires_at || "").toLocaleString("es-MX")
                : "No pudimos encontrar esta invitación"}
            </p>

            <div className="rounded-lg bg-gray-50 p-4 text-left text-sm text-gray-700">
              <p className="font-medium">Posibles causas:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>El link es incorrecto</li>
                <li>Ya fue utilizada</li>
                <li>Fue cancelada por el empleador</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600">Contacta a tu empleador para que te envíe una nueva invitación</p>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">Ir al inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (accepted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-background p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Bienvenido al Equipo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="font-medium text-green-900">Te has unido exitosamente a:</p>
              <p className="mt-1 text-xl font-bold text-green-900">{invitation.invitation?.business_name}</p>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-gray-900">Próximos pasos:</p>

              <div className="space-y-3">
                <div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Guarda este número en tus contactos:</p>
                    <p className="mt-1 text-lg font-bold text-primary">+52 33 xxxx xxxx</p>
                    <p className="text-sm text-gray-600">(WhatsApp de Timer)</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Para marcar tu entrada:</p>
                    <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-gray-600">
                      <li>Abre WhatsApp</li>
                      <li>Envía tu ubicación actual a Timer</li>
                      <li>Recibirás confirmación automática</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Para marcar tu salida:</p>
                    <p className="text-sm text-gray-600">Repite el proceso al terminar tu turno</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-900">
              <p className="font-medium">Listo Ya estás registrado</p>
              <p className="mt-1">Puedes cerrar esta ventana</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-background p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Clock className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Timer</span>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Invitación de Trabajo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-600">
                Hola <span className="font-semibold text-gray-900">{invitation.invitation?.employee_name}</span>,
              </p>
              <p className="mt-2 text-gray-600">Has sido invitado a trabajar en:</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                <p className="text-2xl font-bold text-gray-900">{invitation.invitation?.business_name}</p>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <p className="mb-3 font-medium text-blue-900">Podrás marcar asistencia en:</p>
              <div className="space-y-2">
                {invitation.invitation?.branches.map((branch, index) => (
                  <div key={index} className="flex items-center gap-2 text-blue-900">
                    <MapPin className="h-4 w-4" />
                    <span>{branch.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 font-medium text-gray-900">Al aceptar, podrás:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>Marcar entrada/salida por WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>Recibir confirmaciones automáticas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>Ver tu historial de asistencia</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 rounded-lg border-2 border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label htmlFor="terms" className="flex-1 cursor-pointer text-sm leading-relaxed text-gray-700">
                  Acepto los términos laborales de {invitation.invitation?.business_name}
                  <Button variant="link" className="h-auto p-0 text-sm text-primary" asChild>
                    <Link href="#terms" onClick={(e) => e.preventDefault()}>
                      Ver términos
                    </Link>
                  </Button>
                </label>
              </div>
            </div>

            <Button onClick={handleAccept} disabled={!termsAccepted || isAccepting} className="w-full" size="lg">
              {isAccepting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Unirme al Equipo"
              )}
            </Button>

            <div className="text-center">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                <Clock className="mr-1 h-3 w-3" />
                Esta invitación expira en: {timeRemaining}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
