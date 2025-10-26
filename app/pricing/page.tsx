import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Check, ArrowRight, HelpCircle } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Clock className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Timer</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Características
            </Link>
            <Link
              href="/#benefits"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Beneficios
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-foreground">
              Precios
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Comenzar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary-50 to-background py-16 md:py-20">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-100">Precios</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Planes simples y transparentes
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Elige el plan perfecto para tu equipo. Sin costos ocultos, sin sorpresas.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Starter Plan */}
              <Card className="border-border flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <CardDescription>Perfecto para equipos pequeños</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">$29</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Hasta 10 empleados</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Registro por WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Geolocalización GPS</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Reportes básicos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Soporte por email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">1 ubicación</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/register">
                      Comenzar Gratis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Professional Plan - Featured */}
              <Card className="relative border-primary flex flex-col shadow-lg">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">Más Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Professional</CardTitle>
                  <CardDescription>Para equipos en crecimiento</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">$79</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Hasta 50 empleados</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Todo lo del plan Starter</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Reportes avanzados y exportación</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Gestión de turnos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Múltiples ubicaciones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Soporte prioritario</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Integraciones API</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/register">
                      Comenzar Gratis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border-border flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>Para grandes organizaciones</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">Custom</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Empleados ilimitados</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Todo lo del plan Professional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Empleados ilimitados</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Gerente de cuenta dedicado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Personalización avanzada</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">SLA garantizado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Capacitación personalizada</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/contact">
                      Contactar Ventas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">Preguntas Frecuentes</h2>
              <p className="text-lg text-muted-foreground">Todo lo que necesitas saber sobre nuestros planes</p>
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    ¿Puedo cambiar de plan en cualquier momento?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplican de inmediato y
                    solo pagas la diferencia prorrateada.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    ¿Hay costos de instalación o configuración?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No, no hay costos adicionales. El precio que ves es todo lo que pagas. Sin hardware, sin
                    instalaciones, sin sorpresas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    ¿Qué pasa si supero el límite de empleados?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Te notificaremos cuando te acerques al límite. Puedes actualizar tu plan fácilmente para acomodar
                    más empleados sin interrupciones en el servicio.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    ¿Ofrecen descuentos por pago anual?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sí, ofrecemos un 20% de descuento en todos los planes cuando pagas anualmente. Contáctanos para más
                    detalles.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    ¿Puedo cancelar en cualquier momento?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sí, puedes cancelar tu suscripción en cualquier momento sin penalizaciones. Tu acceso continuará
                    hasta el final del período de facturación actual.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              ¿Listo para comenzar?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Prueba Timer gratis durante 14 días. Sin tarjeta de crédito requerida.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link href="/register">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                <Link href="/contact">Hablar con Ventas</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Timer</span>
              </Link>
              <p className="text-sm text-muted-foreground">Control de asistencia 100% digital para equipos modernos.</p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#features" className="text-muted-foreground transition-colors hover:text-foreground">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Integraciones
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Timer. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
