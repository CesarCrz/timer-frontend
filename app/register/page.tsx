"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Loader2, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [company, setCompany] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?setup=true&name=${encodeURIComponent(fullName)}&company=${encodeURIComponent(company)}`,
          data: {
            full_name: fullName,
            company: company,
          },
        },
      })

      if (error) throw error

      setMagicLinkSent(true)
      toast.success("Link de registro enviado", {
        description: "Revisa tu correo para completar el registro",
      })
    } catch (error: any) {
      toast.error("Error al registrar", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    if (!termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones")
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?setup=true`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      toast.error("Error al registrar", {
        description: error.message,
      })
      setIsLoading(false)
    }
  }

  if (magicLinkSent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-background p-4">
        <div className="w-full max-w-md">
          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Revisa tu correo</CardTitle>
              <CardDescription>
                Hemos enviado un link de registro a <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                <p className="font-medium">Próximos pasos:</p>
                <ol className="mt-2 list-inside list-decimal space-y-1">
                  <li>Abre tu correo electrónico</li>
                  <li>Haz clic en el link que te enviamos</li>
                  <li>Completa tu perfil</li>
                  <li>Comienza tu prueba gratuita</li>
                </ol>
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setMagicLinkSent(false)}>
                Usar otro correo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-background p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Clock className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Timer</span>
        </Link>

        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>Comienza tu prueba gratuita de 14 días. Sin tarjeta de crédito.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                  id="fullName"
                  placeholder="Juan Pérez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  placeholder="Mi Empresa S.A."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm leading-relaxed text-muted-foreground">
                  Acepto los{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Términos de Servicio
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !termsAccepted}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear Cuenta Gratis
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleGoogleRegister}
              disabled={isLoading || !termsAccepted}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="w-full text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
