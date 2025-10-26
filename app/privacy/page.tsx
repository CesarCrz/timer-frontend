import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function PrivacyPage() {
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">Política de Privacidad</h1>
            <p className="text-lg text-muted-foreground">Última actualización: 25 de octubre de 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">1. Introducción</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    En Timer, nos comprometemos a proteger su privacidad y la de sus empleados. Esta Política de
                    Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza
                    nuestro servicio de control de asistencia digital.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">2. Información que Recopilamos</h2>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">2.1 Información de Cuenta</h3>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Nombre y apellido</li>
                      <li>Dirección de correo electrónico</li>
                      <li>Nombre de la empresa</li>
                      <li>Número de teléfono</li>
                      <li>Información de facturación y pago</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground">2.2 Información de Empleados</h3>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Nombre completo</li>
                      <li>Número de teléfono (para WhatsApp)</li>
                      <li>Departamento y puesto</li>
                      <li>Horarios de trabajo</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground">2.3 Datos de Asistencia</h3>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Registros de entrada y salida</li>
                      <li>Datos de geolocalización GPS</li>
                      <li>Mensajes de WhatsApp relacionados con el registro</li>
                      <li>Fotografías (si están habilitadas)</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground">2.4 Información Técnica</h3>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Dirección IP</li>
                      <li>Tipo de navegador y dispositivo</li>
                      <li>Sistema operativo</li>
                      <li>Cookies y tecnologías similares</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">3. Cómo Usamos su Información</h2>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">Utilizamos la información recopilada para:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Proporcionar y mantener nuestro Servicio</li>
                      <li>Procesar registros de asistencia</li>
                      <li>Generar reportes y análisis</li>
                      <li>Verificar la ubicación de los registros</li>
                      <li>Comunicarnos con usted sobre el Servicio</li>
                      <li>Procesar pagos y facturación</li>
                      <li>Mejorar y personalizar el Servicio</li>
                      <li>Detectar y prevenir fraudes</li>
                      <li>Cumplir con obligaciones legales</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">4. Compartir Información</h2>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      No vendemos su información personal. Podemos compartir su información con:
                    </p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>
                        <strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar el Servicio
                        (procesamiento de pagos, hosting, análisis)
                      </li>
                      <li>
                        <strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros
                        derechos
                      </li>
                      <li>
                        <strong>Transferencias comerciales:</strong> En caso de fusión, adquisición o venta de activos
                      </li>
                      <li>
                        <strong>Con su consentimiento:</strong> Cuando usted nos autorice explícitamente
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">5. Geolocalización</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Timer utiliza datos de geolocalización GPS para verificar la ubicación de los registros de
                    asistencia. Esta información se recopila únicamente cuando un empleado realiza un registro de
                    entrada o salida. Los datos de ubicación se almacenan de forma segura y solo son accesibles por los
                    administradores autorizados de su empresa.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">6. Seguridad de los Datos</h2>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Implementamos medidas de seguridad técnicas y organizativas para proteger su información:
                    </p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Encriptación de datos en tránsito y en reposo (SSL/TLS)</li>
                      <li>Autenticación de dos factores disponible</li>
                      <li>Controles de acceso basados en roles</li>
                      <li>Auditorías de seguridad regulares</li>
                      <li>Copias de seguridad automáticas</li>
                      <li>Monitoreo continuo de amenazas</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">7. Retención de Datos</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Conservamos su información personal durante el tiempo que su cuenta esté activa o según sea
                    necesario para proporcionarle el Servicio. Los registros de asistencia se conservan durante el
                    período requerido por las leyes laborales aplicables (generalmente 5 años en México). Puede
                    solicitar la eliminación de sus datos en cualquier momento, sujeto a nuestras obligaciones legales.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">8. Sus Derechos</h2>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">Usted tiene derecho a:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Acceder a su información personal</li>
                      <li>Corregir datos inexactos</li>
                      <li>Solicitar la eliminación de sus datos</li>
                      <li>Oponerse al procesamiento de sus datos</li>
                      <li>Solicitar la portabilidad de sus datos</li>
                      <li>Retirar su consentimiento en cualquier momento</li>
                      <li>Presentar una queja ante la autoridad de protección de datos</li>
                    </ul>
                    <p className="leading-relaxed text-muted-foreground">
                      Para ejercer estos derechos, contáctenos en privacy@timer.app
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">9. Cookies y Tecnologías Similares</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el uso del Servicio
                    y personalizar el contenido. Puede controlar las cookies a través de la configuración de su
                    navegador. Sin embargo, deshabilitar las cookies puede afectar la funcionalidad del Servicio.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">10. Privacidad de Menores</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Nuestro Servicio no está dirigido a menores de 18 años. No recopilamos intencionalmente información
                    personal de menores. Si descubrimos que hemos recopilado información de un menor, la eliminaremos de
                    inmediato.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">11. Transferencias Internacionales</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Sus datos pueden ser transferidos y procesados en servidores ubicados fuera de su país de
                    residencia. Nos aseguramos de que dichas transferencias cumplan con las leyes de protección de datos
                    aplicables y que sus datos estén protegidos adecuadamente.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">12. Cambios a esta Política</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios
                    materiales publicando la nueva política en esta página y actualizando la fecha de "Última
                    actualización". Le recomendamos revisar esta política regularmente.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">13. Contacto</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos sus datos, puede
                    contactarnos en:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>Email: privacy@timer.app</li>
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
