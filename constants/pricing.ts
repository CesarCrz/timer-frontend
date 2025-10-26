import type { SubscriptionTier } from "@/types"

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: "basic",
    name: "Básico",
    price_monthly: 299,
    price_yearly: 2870, // 20% discount
    max_branches: 2,
    max_employees: 15,
    features: ["reportes_pdf", "soporte_email", "validacion_gps", "whatsapp_integration"],
  },
  {
    id: "professional",
    name: "Profesional",
    price_monthly: 599,
    price_yearly: 5750, // 20% discount
    max_branches: 5,
    max_employees: 50,
    features: [
      "reportes_pdf",
      "reportes_excel",
      "soporte_email",
      "soporte_prioritario",
      "validacion_gps",
      "whatsapp_integration",
      "multi_zona_horaria",
    ],
    is_popular: true,
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price_monthly: 1199,
    price_yearly: 11510, // 20% discount
    max_branches: 15,
    max_employees: 200,
    features: [
      "reportes_pdf",
      "reportes_excel",
      "reportes_personalizados",
      "soporte_email",
      "soporte_prioritario",
      "account_manager",
      "validacion_gps",
      "whatsapp_integration",
      "multi_zona_horaria",
      "api_access",
    ],
  },
]

export const FEATURE_LABELS: Record<string, string> = {
  reportes_pdf: "Reportes PDF",
  reportes_excel: "Reportes Excel",
  reportes_personalizados: "Reportes Personalizados",
  soporte_email: "Soporte por Email",
  soporte_prioritario: "Soporte Prioritario",
  account_manager: "Account Manager Dedicado",
  validacion_gps: "Validación GPS",
  whatsapp_integration: "Integración WhatsApp",
  multi_zona_horaria: "Multi Zona Horaria",
  api_access: "Acceso API",
}
