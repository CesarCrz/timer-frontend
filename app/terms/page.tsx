import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function TermsPage() {
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
        <section className="border-b border-border bg-gradient-to-b from-primary-50 to-background py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">Términos de Servicio</h1>
            <p className="text-lg text-muted-foreground">Última actualización: 25 de octubre de 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">1. Aceptación de los Términos</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Al acceder y utilizar Timer ("el Servicio"), usted acepta estar sujeto a estos Términos de Servicio.
                    Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al Servicio.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">2. Descripción del Servicio</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Timer es una plataforma de control de asistencia digital que permite a las empresas gestionar el
                    registro de entrada y salida de sus empleados mediante WhatsApp y geolocalización GPS. El Servicio
                    incluye funcionalidades de reportes, gestión de equipos y análisis de datos.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">3. Registro y Cuenta</h2>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Para utilizar el Servicio, debe crear una cuenta proporcionando información precisa y completa.
                      Usted es responsable de:
                    </p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Mantener la confidencialidad de su contraseña</li>
                      <li>Todas las actividades que ocurran bajo su cuenta</li>
                      <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                      <li>Asegurar que la información de su cuenta esté actualizada</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">4. Uso Aceptable</h2>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">Usted se compromete a no:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Utilizar el Servicio para fines ilegales o no autorizados</li>
                      <li>Intentar obtener acceso no autorizado a nuestros sistemas</li>
                      <li>Interferir con el funcionamiento del Servicio</li>
                      <li>Transmitir virus, malware o código malicioso</li>
                      <li>Violar los derechos de propiedad intelectual de terceros</li>
                      <li>Recopilar información de otros usuarios sin su consentimiento</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">5. Planes y Pagos</h2>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Timer ofrece diferentes planes de suscripción. Los términos de pago incluyen:
                    </p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Las suscripciones se facturan mensual o anualmente según el plan elegido</li>
                      <li>Los pagos se procesan automáticamente al inicio de cada período de facturación</li>
                      <li>Puede cancelar su suscripción en cualquier momento</li>
                      <li>No se realizan reembolsos por períodos parciales</li>
                      <li>Los precios pueden cambiar con previo aviso de 30 días</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">6. Propiedad Intelectual</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    El Servicio y su contenido original, características y funcionalidad son propiedad exclusiva de
                    Timer y están protegidos por derechos de autor, marcas registradas y otras leyes de propiedad
                    intelectual. Usted conserva todos los derechos sobre los datos que carga al Servicio.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">7. Privacidad y Protección de Datos</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Su privacidad es importante para nosotros. El uso del Servicio también está regido por nuestra{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Política de Privacidad
                    </Link>
                    , que describe cómo recopilamos, usamos y protegemos su información personal.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">8. Limitación de Responsabilidad</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Timer no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos,
                    incluyendo pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles,
                    resultantes de su acceso o uso del Servicio.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">9. Modificaciones del Servicio</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Nos reservamos el derecho de modificar o discontinuar, temporal o permanentemente, el Servicio (o
                    cualquier parte del mismo) con o sin previo aviso. No seremos responsables ante usted ni ante
                    terceros por cualquier modificación, suspensión o discontinuación del Servicio.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">10. Terminación</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Podemos terminar o suspender su cuenta y acceso al Servicio inmediatamente, sin previo aviso ni
                    responsabilidad, por cualquier motivo, incluyendo sin limitación si usted incumple los Términos de
                    Servicio. Todas las disposiciones de los Términos que por su naturaleza deban sobrevivir a la
                    terminación, sobrevivirán a la terminación.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">11. Ley Aplicable</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Estos Términos se regirán e interpretarán de acuerdo con las leyes de México, sin tener en cuenta
                    sus disposiciones sobre conflictos de leyes. Cualquier disputa relacionada con estos términos estará
                    sujeta a la jurisdicción exclusiva de los tribunales de Ciudad de México.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">12. Cambios a los Términos</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos sobre
                    cambios materiales publicando los nuevos términos en esta página y actualizando la fecha de "Última
                    actualización". Su uso continuado del Servicio después de dichos cambios constituye su aceptación de
                    los nuevos términos.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">13. Contacto</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>Email: legal@timer.app</li>
                    <li>Teléfono: +52 55 1234 5678</li>
                    <li>Dirección: Av. Insurgentes Sur 1234, Col. Del Valle, 03100, Ciudad de México, México</li>
                  </ul>
                </div>
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
