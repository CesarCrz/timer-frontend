"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"

export default function OnboardingPage() {
  const [fullName, setFullName] = useState("")
  const [company, setCompany] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      setFullName(user.user_metadata?.full_name || "")
      setCompany(user.user_metadata?.company || "")

      if (user.user_metadata?.company && user.user_metadata?.full_name) {
        router.push("/dashboard")
      }
    }
  }, [user, loading, router])

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          company: company,
        },
      })

      if (error) throw error

      toast.success("Perfil completado", {
        description: "Bienvenido a Timer",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast.error("Error al completar perfil", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Clock className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Timer</span>
        </div>

        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Completa tu perfil</CardTitle>
            <CardDescription>Solo necesitamos algunos datos para comenzar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleComplete} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled className="bg-gray-50" />
                <p className="text-xs text-muted-foreground">Este es el email con el que te registraste</p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Completar y Continuar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
