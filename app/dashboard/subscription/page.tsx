"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, CreditCard, Download, Loader2, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { apiClient } from "@/lib/api/client"
import { ChangePlanDialog } from "@/components/dashboard/change-plan-dialog"
import { toast } from "sonner"

interface SubscriptionData {
  current_tier: {
    name: string
    price_monthly: number
    max_branches: number
    max_employees: number
  }
  current_usage: {
    branches: number
    employees: number
  }
  stripe_subscription: {
    status: string
    current_period_end: string
    cancel_at_period_end: boolean
  }
}

const PLANS = [
  {
    id: "basic",
    name: "Básico",
    price: 299,
    maxBranches: 2,
    maxEmployees: 15,
    features: ["2 sucursales", "15 empleados", "Reportes básicos", "Soporte por email", "Historial 3 meses"],
  },
  {
    id: "professional",
    name: "Profesional",
    price: 599,
    maxBranches: 5,
    maxEmployees: 50,
    features: [
      "5 sucursales",
      "50 empleados",
      "Reportes avanzados",
      "Soporte prioritario",
      "Historial ilimitado",
      "Exportar a Excel",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: 1199,
    maxBranches: 999,
    maxEmployees: 999,
    features: [
      "Sucursales ilimitadas",
      "Empleados ilimitados",
      "Reportes personalizados",
      "Soporte 24/7",
      "API access",
      "Gerente de cuenta dedicado",
    ],
  },
]

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreatingPortal, setIsCreatingPortal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await apiClient.get<SubscriptionData>("/subscription")
      setSubscription(data)
    } catch (err: any) {
      setError(err.message || "Error al cargar suscripción")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManagePayment = async () => {
    setIsCreatingPortal(true)

    try {
      const response = await apiClient.post<{ url: string }>("/subscription/create-portal", {})
      window.location.href = response.url
    } catch (error: any) {
      toast.error("Error al abrir portal de pagos", {
        description: error.message,
      })
      setIsCreatingPortal(false)
    }
  }

  const handleChangePlan = (planId: string) => {
    setSelectedPlan(planId)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchSubscription}>
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!subscription) return null

  const currentPlanId = subscription.current_tier.name.toLowerCase()
  const branchesPercentage = (subscription.current_usage.branches / subscription.current_tier.max_branches) * 100
  const employeesPercentage = (subscription.current_usage.employees / subscription.current_tier.max_employees) * 100

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Suscripción</h1>
        <p className="text-gray-600">Gestiona tu plan y métodos de pago</p>
      </div>

      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              Plan Actual: {subscription.current_tier.name}
              {currentPlanId === "professional" && <Badge className="bg-orange-500">Popular</Badge>}
            </CardTitle>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-3xl font-bold text-gray-900">${subscription.current_tier.price_monthly} MXN/mes</p>
            <p className="text-sm text-gray-600">
              Próximo pago: {new Date(subscription.stripe_subscription.current_period_end).toLocaleDateString("es-MX")}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">Sucursales</span>
                <span className="text-gray-900">
                  {subscription.current_usage.branches}/{subscription.current_tier.max_branches}
                </span>
              </div>
              <Progress value={branchesPercentage} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">Empleados</span>
                <span className="text-gray-900">
                  {subscription.current_usage.employees}/{subscription.current_tier.max_employees}
                </span>
              </div>
              <Progress value={employeesPercentage} className="h-2" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => handleChangePlan(currentPlanId)} className="flex-1">
              Cambiar Plan
            </Button>
            <Button
              variant="outline"
              onClick={handleManagePayment}
              disabled={isCreatingPortal}
              className="flex-1 bg-transparent"
            >
              {isCreatingPortal ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              Gestionar Pago
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Comparación de Planes</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === currentPlanId
            const isUpgrade = plan.price > subscription.current_tier.price_monthly
            const isDowngrade = plan.price < subscription.current_tier.price_monthly

            return (
              <Card key={plan.id} className={isCurrent ? "border-2 border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.popular && !isCurrent && <Badge className="bg-orange-500">Popular</Badge>}
                    {isCurrent && <Badge>Actual</Badge>}
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-gray-900">${plan.price}</p>
                    <p className="text-sm text-gray-600">MXN/mes</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <Button variant="outline" disabled className="w-full bg-transparent">
                      Plan Actual
                    </Button>
                  ) : isUpgrade ? (
                    <Button onClick={() => handleChangePlan(plan.id)} className="w-full">
                      Mejorar Plan
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleChangePlan(plan.id)}
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      Cambiar a {plan.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Facturación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Monto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Factura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">15 Oct 2024</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$599 MXN</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-700">Pagado</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">15 Sep 2024</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$599 MXN</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-700">Pagado</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={handleManagePayment}>
              Ver historial completo en Stripe →
            </Button>
          </div>
        </CardContent>
      </Card>

      <ChangePlanDialog
        currentPlan={currentPlanId}
        selectedPlan={selectedPlan}
        currentUsage={subscription.current_usage}
        onClose={() => setSelectedPlan(null)}
        onChanged={fetchSubscription}
      />
    </div>
  )
}
