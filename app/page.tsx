import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Clock, MapPin, MessageSquare, ArrowRight, UserPlus, CheckCircle } from "lucide-react"

export default function LandingPage() {
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
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Características
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
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
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-50 to-background py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
                  El Reloj Checador que Tus Empleados Ya Tienen en el Bolsillo
                </h1>
                <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                  Control de asistencia 100% digital con WhatsApp y GPS. Sin hardware, sin instalaciones, sin
                  complicaciones.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="text-base" asChild>
                    <Link href="/register">
                      Comenzar Gratis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                    <Link href="/contact">Ver Demo en Video</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl border border-border bg-card p-8 shadow-2xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
                      <MessageSquare className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                      <p className="text-lg font-semibold text-foreground">Registro de Entrada</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-primary-50 p-4">
                      <p className="text-sm text-primary-900">¡Hola! 👋 Registra tu entrada</p>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-lg bg-primary p-4">
                        <p className="text-sm text-primary-foreground">✓ Entrada registrada</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-primary-foreground/80">
                          <MapPin className="h-3 w-3" />
                          <span>Oficina Central</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between rounded-lg bg-secondary-50 p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-secondary-600" />
                      <span className="text-sm font-medium text-secondary-900">08:45 AM</span>
                    </div>
                    <Badge className="bg-secondary-600 text-white hover:bg-secondary-600">A Tiempo</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="border-b border-border bg-muted/30 py-20 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                ¿Cansado de Estas Situaciones?
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-border bg-background transition-shadow hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 text-6xl">💸</div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">Hardware Costoso</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Inviertes $1,500+ en relojes checadores que se descomponen
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-shadow hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 text-6xl">🤥</div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">Fraude en Asistencia</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Empleados marcan por otros. Pierdes $22,880 MXN/año en horas fantasma
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-shadow hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 text-6xl">⏱️</div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">Pérdida de Tiempo</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    6 horas/quincena calculando nóminas manualmente
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Timer Elimina Todos Estos Problemas
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="p-4 text-left text-lg font-semibold text-foreground">Aspecto</th>
                    <th className="p-4 text-left text-lg font-semibold text-foreground">Hardware Tradicional</th>
                    <th className="bg-secondary-50 p-4 text-left text-lg font-semibold text-foreground">Timer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium text-foreground">Inversión inicial</td>
                    <td className="p-4 text-muted-foreground">$1,500</td>
                    <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">$100</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium text-foreground">Multi-sucursal</td>
                    <td className="p-4 text-muted-foreground">$1,500 por ubicación</td>
                    <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">Incluido</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium text-foreground">Mantenimiento</td>
                    <td className="p-4 text-muted-foreground">$300/año</td>
                    <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">$0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium text-foreground">Fraude</td>
                    <td className="p-4 text-muted-foreground">Vulnerable</td>
                    <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">Imposible (GPS)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium text-foreground">Setup</td>
                    <td className="p-4 text-muted-foreground">2-4 semanas</td>
                    <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">5 minutos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-b border-border bg-muted/30 py-20 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Todo lo que Necesitas en un Solo Lugar
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border bg-background transition-all hover:border-primary-300">
                <CardContent className="p-8">
                  <div className="mb-4 text-4xl text-primary-600">📱</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Sin Hardware</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Elimina relojes checadores. Tus empleados usan su celular
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-all hover:border-primary-300">
                <CardContent className="p-8">
                  <div className="mb-4 text-4xl text-primary-600">🗺️</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Multi-Sucursal</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Gestiona todas tus ubicaciones desde un solo dashboard
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-all hover:border-primary-300">
                <CardContent className="p-8">
                  <div className="mb-4 text-4xl text-primary-600">🎯</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Validación GPS</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Imposible falsificar. GPS verifica ubicación real
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-all hover:border-primary-300">
                <CardContent className="p-8">
                  <div className="mb-4 text-4xl text-primary-600">📊</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Reportes Automáticos</h3>
                  <p className="leading-relaxed text-muted-foreground">PDF y Excel listos para nómina en 30 segundos</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-all hover:border-primary-300">
                <CardContent className="p-8">
                  <div className="mb-4 text-4xl text-primary-600">⚡</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Setup en 5 Minutos</h3>
                  <p className="leading-relaxed text-muted-foreground">No requiere técnicos ni capacitación compleja</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-all hover:border-primary-300">
                <CardContent className="p-8">
                  <div className="mb-4 text-4xl text-primary-600">🔒</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">100% Seguro</h3>
                  <p className="leading-relaxed text-muted-foreground">Datos encriptados. Cumple con LFPDPPP</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Tan Simple como 1-2-3
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <UserPlus className="h-8 w-8 text-primary-600" />
                </div>
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Regístrate</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Crea tu cuenta en 2 minutos. Sin tarjeta de crédito para empezar.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <MapPin className="h-8 w-8 text-primary-600" />
                </div>
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Agrega Sucursales y Empleados</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Ubica tus sucursales en el mapa. Invita empleados por WhatsApp.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <CheckCircle className="h-8 w-8 text-primary-600" />
                </div>
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Comienza a Registrar</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Tus empleados envían su ubicación. Sistema valida y registra automáticamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="border-b border-border bg-muted/30 py-20 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Planes para Cada Tamaño de Negocio
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Básico */}
              <Card className="border-border bg-background">
                <CardContent className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-foreground">Básico</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$299</span>
                    <span className="text-muted-foreground"> MXN/mes</span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">2 sucursales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">15 empleados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Reportes básicos</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/register">Seleccionar Plan</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Profesional - Destacado */}
              <Card className="relative border-2 border-primary bg-background shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">⭐ MÁS POPULAR</Badge>
                </div>
                <CardContent className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-foreground">Profesional</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$599</span>
                    <span className="text-muted-foreground"> MXN/mes</span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">5 sucursales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">50 empleados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Reportes avanzados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Soporte prioritario</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/register">Seleccionar Plan</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Empresarial */}
              <Card className="border-border bg-background">
                <CardContent className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-foreground">Empresarial</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$1,199</span>
                    <span className="text-muted-foreground"> MXN/mes</span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">15 sucursales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">200 empleados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Reportes personalizados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary-600" />
                      <span className="text-sm text-muted-foreground">Account Manager</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/contact">Contactar Ventas</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Link href="/pricing" className="inline-flex items-center gap-2 text-primary hover:underline">
                Ver comparación completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Preguntas Frecuentes
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Necesito comprar hardware?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. Timer funciona 100% con los celulares que tus empleados ya tienen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Qué pasa si mis empleados no tienen smartphone?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  En México, 89% de población tiene smartphone. Para casos especiales, ofrecemos check-in desde terminal
                  compartida.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Los empleados pueden falsificar su ubicación?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Es muy difícil. Timer detecta patrones sospechosos como velocidades imposibles. Además, los Términos
                  prohíben falsificación.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Es legal recopilar ubicación de empleados?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí, siempre que informes a tus empleados y obtengan su consentimiento. Timer facilita este proceso.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Qué pasa si cancelo mi suscripción?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Puedes exportar todos tus reportes. Mantenemos tus datos 90 días por si decides regresar.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Timer sustituye a mi contador?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. Timer genera reportes que tu contador usa para nómina. Es una herramienta complementaria.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Funciona en zonas sin internet?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Los empleados necesitan conexión para enviar ubicación por WhatsApp. Estamos trabajando en modo
                  offline.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  ¿Ofrecen soporte en español?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí, 100% en español de México. Soporte por email y chat en horario laboral.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="border-b border-border bg-gradient-to-r from-primary to-primary-600 py-20 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">Toma el Control de Tu Nómina Hoy</h2>
            <p className="mb-8 text-xl text-white/90">
              Únete a cientos de negocios que ya eliminaron los relojes checadores
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-10 py-6 shadow-xl" asChild>
              <Link href="/register">
                Comenzar Gratis - Sin Tarjeta Requerida
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-white/80">Configuración en 5 minutos. Cancela cuando quieras.</p>
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
                  <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
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
                    FAQ
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

          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-muted-foreground">© 2025 Timer. Todos los derechos reservados.</p>
              <div className="flex gap-4">
                <Link href="mailto:support@timer.app" className="text-sm text-muted-foreground hover:text-foreground">
                  support@timer.app
                </Link>
                <Link href="mailto:business@timer.app" className="text-sm text-muted-foreground hover:text-foreground">
                  business@timer.app
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
