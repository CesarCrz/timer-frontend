# Timer - Control de Asistencia Digital

Sistema de control de asistencia 100% digital con WhatsApp y GPS para PYMEs en México.

## Estructura del Proyecto

\`\`\`
/app                    # Next.js App Router
  /(public)            # Rutas públicas
  /(dashboard)         # Rutas protegidas (próximamente)
/components            # Componentes React
  /ui                  # Design System (shadcn/ui)
  /sections            # Secciones de páginas
  /layouts             # Layouts reutilizables
/lib                   # Utilidades
  /api                 # Cliente API
/types                 # TypeScript types
/constants             # Datos mock y constantes
/public                # Assets estáticos
\`\`\`

## Variables de Entorno

Copia `.env.example` a `.env.local` y configura las variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### Variables Requeridas:

- `NEXT_PUBLIC_API_URL`: URL del backend API
- `NEXT_PUBLIC_SUPABASE_URL`: URL de Supabase (para auth)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key de Supabase

## Instalación

\`\`\`bash
npm install
npm run dev
\`\`\`

## Stack Tecnológico

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React (iconos)
- Sonner (toasts)

## Design System

Basado en PRD-Frontend-Core.md:
- Colores: Azul primario, Verde éxito, Amarillo atención
- Tipografía: Inter
- Componentes: shadcn/ui personalizados

## Desarrollo

1. Todas las páginas públicas están en `/app/(public)`
2. Los componentes reutilizables están en `/components`
3. Los tipos TypeScript están en `/types`
4. Las constantes y datos mock están en `/constants`
5. El cliente API está en `/lib/api`

## Próximos Pasos

- [ ] Landing Page
- [ ] Pricing Page
- [ ] Contact Page
- [ ] Auth Pages
- [ ] Dashboard (próximamente)
