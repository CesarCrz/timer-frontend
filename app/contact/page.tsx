import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function ContactPage() {
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
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Precios
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground">
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Contáctanos</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              ¿Tienes preguntas? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Envíanos un mensaje</h2>
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Pérez" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="juan@empresa.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="+52 55 1234 5678" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" placeholder="Mi Empresa S.A." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employees">Número de empleados</Label>
                    <Input id="employees" type="number" placeholder="50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      rows={5}
                      required
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Enviar Mensaje
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Al enviar este formulario, aceptas nuestra{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Política de Privacidad
                    </Link>
                  </p>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-foreground">Información de contacto</h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    Nuestro equipo está disponible para responder tus preguntas y ayudarte a encontrar la mejor solución
                    para tu empresa.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                        <Mail className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                        <p className="text-sm text-muted-foreground">Respuesta en menos de 24 horas</p>
                        <a
                          href="mailto:contacto@timer.app"
                          className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                        >
                          contacto@timer.app
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary-100">
                        <Phone className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Teléfono</h3>
                        <p className="text-sm text-muted-foreground">Lun - Vie, 9:00 AM - 6:00 PM</p>
                        <a
                          href="tel:+525512345678"
                          className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                        >
                          +52 55 1234 5678
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-100">
                        <MessageSquare className="h-6 w-6 text-accent-600" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">Respuesta inmediata</p>
                        <a
                          href="https://wa.me/525512345678"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                        >
                          Iniciar chat
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                        <MapPin className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Oficina</h3>
                        <p className="text-sm text-muted-foreground">Ciudad de México, México</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Av. Insurgentes Sur 1234
                          <br />
                          Col. Del Valle, 03100
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-primary bg-primary-50">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-foreground">¿Necesitas una demo?</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Agenda una demostración personalizada y descubre cómo Timer puede transformar tu gestión de
                      asistencia.
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/register">Agendar Demo Gratis</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
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
