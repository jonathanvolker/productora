# Plan de Acción — Soulsbeat + Pura Vida
**Versión:** 1.0  
**Fecha:** 2026-09-29  
**Basado en:** Especificación Funcional Consolidada v2  
**Objetivo:** Guía paso a paso para construir el MVP desde cero, aprendiendo en el proceso.

---

## 1. Resumen Ejecutivo

| Aspecto | Decisión |
|---------|----------|
| **Stack** | Next.js 14+ (App Router) + TypeScript + Tailwind CSS + shadcn/ui |
| **Base de datos** | PostgreSQL + Prisma ORM |
| **Auth** | Auth.js (next-auth) v5 — Google, Facebook, Credentials opcional |
| **Monorepo** | Turborepo (apps: web-soulsbeat, web-puravida, admin; packages: shared, ui, db, auth) |
| **Deploy** | Vercel (gratis para empezar) |
| **Media** | UploadThing o Cloudinary |
| **WhatsApp** | Links `wa.me/?text=...` generados en backend (tracking previo) |

---

## 2. Arquitectura de Alto Nivel

```
pura-vida-soulsbeat/
├── apps/
│   ├── web-soulsbeat/        # Frontend público Soulsbeat (PWA)
│   ├── web-puravida/         # Frontend público Pura Vida (PWA)
│   └── admin/                # Panel administrativo unificado
├── packages/
│   ├── shared/               # Tipos TypeScript, validaciones Zod, constantes
│   ├── ui/                   # Componentes base (shadcn/ui + Tailwind)
│   ├── db/                   # Cliente Prisma + esquemas + helpers
│   └── auth/                 # Config Auth.js compartida + tipos de sesión
├── prisma/
│   └── schema.prisma         # Esquema completo multi-marca
├── turbo.json                # Config Turborepo
└── package.json              # Workspace root
```

**Multi-marca:** Un solo backend, `brandId: 'SOULSBEAT' | 'PURAVIDA'` en todas las entidades. Subdominios: `soulsbeat.tudominio.com`, `puravida.tudominio.com`, `admin.tudominio.com`.

---

## 3. Esquema de Base de Datos (Prisma) — Resumen

```prisma
enum Brand { SOULSBEAT PURAVIDA }
enum Role { SUPER_ADMIN SOULSBEAT_ADMIN PURAVIDA_ADMIN CONTENT_EDITOR SALES_AGENT GUEST }
enum EventStatus { UPCOMING AVAILABLE SOLD_OUT FINISHED }
enum QuoteStatus { NEW IN_PROGRESS CONFIRMED CLOSED }
enum BookingStatus { NEW IN_PROGRESS CLOSED }

model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  name          String?
  image         String?
  role          Role      @default(GUEST)
  brandAccess   Brand[]   // Qué marcas puede administrar
  accounts      Account[]
  sessions      Session[]
  favorites     Favorite[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Talent {
  id            String   @id @default(cuid())
  brandId       Brand    @default(SOULSBEAT)
  name          String
  slug          String   @unique
  category      String
  specialty     String?
  bio           String?
  country       String?
  city          String?
  coverImage    String?
  gallery       String[]
  socialLinks   Json     // {instagram, youtube, spotify, soundcloud, tiktok...}
  bookingAgentId String?  // User que gestiona booking
  isFeatured    Boolean  @default(false)
  isPublished   Boolean  @default(false)
  events        EventTalent[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Event {
  id            String   @id @default(cuid())
  brandId       Brand
  title         String
  slug          String   @unique
  description   String?
  coverImage    String?
  date          DateTime
  venue         String?
  city          String?
  country       String?
  status        EventStatus @default(UPCOMING)
  ticketUrl     String?
  organizer     String?
  priceFrom     Float?
  talents       EventTalent[]
  packages      Package[]     // Vinculación Pura Vida
  isPublished   Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model EventTalent {
  id        String @id @default(cuid())
  eventId   String
  talentId  String
  event     Event  @relation(fields: [eventId], references: [id], onDelete: Cascade)
  talent    Talent @relation(fields: [talentId], references: [id], onDelete: Cascade)
  @@unique([eventId, talentId])
}

model Package {
  id            String   @id @default(cuid())
  brandId       Brand    @default(PURAVIDA)
  name          String
  slug          String   @unique
  description   String?
  images        String[]
  includes      String[]
  optionals     String[]
  nights        Int?
  priceFrom     Float?
  priceType     PriceType @default(FROM) // FROM | CONSULT
  eventId       String?  @unique
  event         Event?   @relation(fields: [eventId], references: [id])
  isPublished   Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Quote {
  id            String      @id @default(cuid())
  brandId       Brand       @default(PURAVIDA)
  packageId     String?
  eventId       String?
  userId        String?
  status        QuoteStatus @default(NEW)
  data          Json        // Formulario completo serializado
  whatsappMsg   String      // Mensaje prearmado para WhatsApp
  notes         String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model BookingInquiry {
  id           String        @id @default(cuid())
  brandId      Brand         @default(SOULSBEAT)
  talentId     String
  userId       String?
  status       BookingStatus @default(NEW)
  contactName  String
  company      String?
  city         String
  eventDate    DateTime
  eventType    String
  capacity     Int?
  budget       Float?
  comments     String?
  whatsappMsg  String
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Accommodation {
  id          String   @id @default(cuid())
  brandId     Brand    @default(PURAVIDA)
  name        String
  slug        String   @unique
  description String?
  images      String[]
  location    String?
  services    String[]
  category    String?
  priceFrom   Float?
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Transfer {
  id          String   @id @default(cuid())
  brandId     Brand    @default(PURAVIDA)
  name        String
  description String?
  type        String   // PRIVATE, GROUP, BUS
  priceFrom   Float?
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Benefit {
  id          String   @id @default(cuid())
  brandId     Brand    @default(PURAVIDA)
  title       String
  description String?
  conditions  String?
  validFrom   DateTime?
  validUntil  DateTime?
  location    String?
  partnerId   String?
  code        String?  // Código promocional simple
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Partner {
  id          String   @id @default(cuid())
  brandId     Brand    @default(PURAVIDA)
  name        String
  logo        String?
  category    String?
  description String?
  address     String?
  instagram   String?
  whatsapp    String?
  website     String?
  benefitId   String?  @unique
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model News {
  id          String   @id @default(cuid())
  brandId     Brand    @default(SOULSBEAT)
  title       String
  slug        String   @unique
  excerpt     String?
  content     String   // Markdown/HTML
  coverImage  String?
  talentIds   String[]
  eventIds    String[]
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Media {
  id        String   @id @default(cuid())
  url       String
  type      String   // IMAGE, VIDEO
  alt       String?
  brandId   Brand?
  createdAt DateTime @default(now())
}

model AnalyticsEvent {
  id        String   @id @default(cuid())
  brandId   Brand
  eventType String   // PAGE_VIEW, WHATSAPP_CLICK, TICKET_CLICK, QUOTE_START, QUOTE_SUBMIT, BOOKING_INQUIRY
  entityId  String?
  entityType String? // TALENT, EVENT, PACKAGE, ACCOMMODATION, BENEFIT
  userId    String?
  sessionId String?
  metadata  Json?
  createdAt DateTime @default(now())
}

// Next-auth models
model Account { ... }
model Session { ... }
model VerificationToken { ... }
```

---

## 4. Fases de Implementación

### FASE 0 — Fundamentos y Setup (Semana 1-2)
**Objetivo de aprendizaje:** Entender monorepos, TypeScript, tooling moderno.

| Tarea | Aprenderás | Entregable |
|-------|------------|------------|
| 0.1 Instalar Node.js 20+, pnpm, Git | Gestión de versiones, package managers | Entorno listo |
| 0.2 Inicializar Turborepo + 3 apps Next.js | Monorepos, workspaces, build pipeline | `pnpm dev` levanta todo |
| 0.3 Configurar TypeScript strict + ESLint + Prettier | Tipado estricto, code quality | Zero warnings |
| 0.4 Configurar Tailwind CSS + shadcn/ui en `packages/ui` | Utility-first CSS, component library | Button, Card, Input funcionando |
| 0.5 Setup Prisma + PostgreSQL local (Docker) | ORM, migraciones, Prisma Studio | `pnpm db:push` OK |
| 0.6 Configurar Auth.js v5 (Google + Facebook) | OAuth, callbacks, session, middleware | Login/logout funciona |
| 0.7 Middleware de marca (subdominio → brandId) | Next.js middleware, cookies, headers | Contexto de marca automático |

**Recursos:**
- [Turborepo docs](https://turbo.build/repo/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [Auth.js v5 Guide](https://authjs.dev/getting-started)

---

### FASE 1 — Core Compartido + Admin Base (Semana 2-3)
**Objetivo de aprendizaje:** CRUD genérico, RBAC, componentes de tabla/formulario.

| Tarea | Aprenderás | Entregable |
|-------|------------|------------|
| 1.1 Crear `packages/shared`: tipos, validaciones Zod, constantes | Zod, inferencia de tipos, DRY | `shared/schemas.ts` |
| 1.2 Componentes UI base en `packages/ui`: Table, Form, Modal, Select, Tabs | Compound components, Radix UI, React Hook Form | Storybook opcional |
| 1.3 Layout Admin: Sidebar, Header, Breadcrumbs, Responsive | Layouts Next.js, Server/Client Components | Navegación admin |
| 1.4 Auth Admin: proteger rutas, redirigir según rol/brandAccess | Middleware, server actions, roles | Solo admins entran |
| 1.5 CRUD Genérico: lista (tabla + filtros + paginación), crear, editar, eliminar | Server Actions, revalidación, optimistic UI | Funciona para Talent, Event, Package |
| 1.6 Subida de imágenes (UploadThing) + galería | Client upload, serverless, transformaciones | Media manager |
| 1.7 SEO Base: metadata dinámica, sitemap.xml, robots.txt | Metadata API, generateMetadata | URLs indexables |

**Patrón clave:** **Server Actions** para mutaciones + **React Query / SWR** para data fetching en client components.

---

### FASE 2 — Soulsbeat MVP (Semana 3-5)
**Objetivo de aprendizaje:** Routing dinámico, SSR/ISR, relaciones many-to-many, formularios complejos.

| Módulo | Tareas clave | Aprenderás |
|--------|--------------|------------|
| **2.1 Home Soulsbeat** | Hero, eventos destacados, talentos destacados, noticias, categorías, CTA dual | `generateStaticParams`, ISR, data fetching paralelo |
| **2.2 Catálogo Talentos** | Listado paginado, búsqueda, filtros (categoría, país, ciudad), destacados | Search params, debounce, URL state |
| **2.3 Perfil Talento** | Página `/talentos/[slug]`, galería, redes, eventos próximos, CTA booking | Dynamic routes, metadata, imagen optimizada |
| **2.4 Eventos** | Listado, detalle `/eventos/[slug]`, artistas participantes, estado, ticket URL | Relaciones Prisma, condicionales UI |
| **2.5 Tickets (CTA externo)** | Campo `ticketUrl` admin, botón "Comprar entrada" con tracking click | Analytics events, outbound links |
| **2.6 Noticias/Blog** | Listado, detalle `/noticias/[slug]`, relación talento/evento | Markdown rendering (next-mdx-remote) |
| **2.7 Booking Profesional** | Formulario react-hook-form + Zod, guardado BD, WhatsApp prearmado | Server Actions, JSON serialization, wa.me links |
| **2.8 Admin Soulsbeat** | CRUD Talentos, Eventos, Noticias, Categorías, Booking Agents | Permisos por marca, bulk actions |

**Endpoints WhatsApp:**
```
Booking: wa.me/54911XXXXXXXX?text=Hola%20[agent]%2C%20quiero%20contratar%20a%20[talent]%20para%20[eventDate]%20en%20[city]...
```

---

### FASE 3 — Pura Vida MVP (Semana 5-7)
**Objetivo de aprendizaje:** Formularios multi-paso, estado complejo, cotizador, relaciones flexibles.

| Módulo | Tareas clave | Aprenderás |
|--------|--------------|------------|
| **3.1 Home Pura Vida** | Hero experiencias, destinos, beneficios, partners, CTA cotización | Composition patterns, reusable sections |
| **3.2 Experiencias/Paquetes** | Listado, filtros, detalle `/experiencias/[slug]`, inclusiones, opcionales, precio | Conditional rendering, price formatting |
| **3.3 Cotizador Multi-paso** | Step 1: Paquete/Evento → Step 2: Fechas/Pax → Step 3: Servicios → Step 4: Datos contacto → WhatsApp | React Hook Form wizard, state persistence, localStorage |
| **3.4 Alojamientos** | CRUD admin, ficha pública, galería, servicios, CTA "Incluir en cotización" | Image optimization, relation to packages |
| **3.5 Traslados** | Tipos (privado, grupal, bus), precio, agregar a cotización | Enum types, dynamic pricing |
| **3.6 Aéreos (solo cotizable)** | Checkbox "Cotizar aéreo", campo ciudad origen, notas asesor | Optional fields, conditional logic |
| **3.7 Beneficios/Cuponera** | Listado, detalle, código promo, guardado en favoritos (requiere login) | Auth-gated features, user favorites |
| **3.8 Partners/Comercios** | CRUD admin, logo, rubro, beneficio asociado, vigencia | Date ranges, active/inactive |
| **3.9 Admin Pura Vida** | CRUD Paquetes, Alojamientos, Traslados, Beneficios, Partners, Cotizaciones | Notes internas, cambio de estado, dashboard |

**Cotizador → WhatsApp:**
```typescript
const whatsappMsg = `Nueva cotización #${quote.id}
Paquete: ${pkg.name}
Fechas: ${start} - ${end}
Pasajeros: ${pax}
Aéreo: ${air ? 'Sí' : 'No'}
Alojamiento: ${accommodation}
Traslados: ${transfers}
Entradas: ${tickets}
Comentarios: ${comments}
--- 
Desde: Pura Vida Web`;
```

---

### FASE 4 — Integración Cruzada + Analytics (Semana 7-8)
**Objetivo de aprendizaje:** Cross-linking, tracking eventos, dashboard analytics.

| Tarea | Descripción |
|-------|-------------|
| 4.1 Vincular Evento Soulsbeat ↔ Paquete Pura Vida | Admin: selector de paquete en evento, y viceversa |
| 4.2 Cross-links en UI pública | "Ver experiencia en Pura Vida" en evento / "Ver evento en Soulsbeat" en paquete |
| 4.3 Analytics Events | Track: `WHATSAPP_CLICK`, `TICKET_CLICK`, `QUOTE_START`, `QUOTE_SUBMIT`, `BOOKING_INQUIRY` |
| 4.4 Dashboard Admin | Cards: leads hoy, cotizaciones pendientes, booking inquiries, top páginas |
| 4.5 SEO Avanzado | Open Graph dinámico, JSON-LD (Event, Product, Organization), sitemap por marca |

---

### FASE 5 — Pulido, Testing, Deploy (Semana 8-9)
**Objetivo de aprendizaje:** Testing, CI/CD, performance, accesibilidad.

| Tarea | Descripción |
|-------|-------------|
| 5.1 Unit/Integration Tests | Vitest + React Testing Library: utils, schemas, server actions |
| 5.2 E2E Tests | Playwright: flujos críticos (booking, cotización, auth) |
| 5.3 CI/CD GitHub Actions | Lint, typecheck, test, build, deploy preview |
| 5.4 Performance | Lighthouse > 90, Image optimization, Bundle analysis |
| 5.5 Accesibilidad | axe-core, semantic HTML, focus management, contrast |
| 5.6 Deploy Producción | Vercel: custom domains, env vars, preview deployments |
| 5.7 Documentación técnica | README, API docs (OpenAPI), runbooks |

---

## 5. Plan de Aprendizaje Paralelo (Para ti)

| Semana | Tema de Estudio | Recurso Recomendado | Práctica en Proyecto |
|--------|-----------------|---------------------|----------------------|
| 1 | TypeScript Fundamentals | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | Tipar `packages/shared/schemas.ts` |
| 1-2 | React Server Components | [Next.js RSC Docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components) | Admin lists, public pages |
| 2 | Next.js App Router Deep Dive | [Next.js Learn Course](https://nextjs.org/learn) | Routing, layouts, metadata |
| 2-3 | Prisma ORM | [Prisma Workshop](https://www.prisma.io/workshops) | Schema, queries, migrations |
| 3 | Auth.js v5 | [Auth.js Tutorial](https://authjs.dev/getting-started) | Login, middleware, roles |
| 3-4 | React Hook Form + Zod | [RHF Docs](https://react-hook-form.com/) | Booking form, Quote wizard |
| 4 | Server Actions | [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) | CRUD, WhatsApp generation |
| 4-5 | Tailwind + shadcn/ui | [Tailwind Course](https://tailwindcss.com/plus) | Todo el UI |
| 5 | Testing (Vitest + Playwright) | [Testing Library](https://testing-library.com/) | Critical paths |
| 6 | PostgreSQL / SQL | [Postgres Tutorial](https://www.postgresqltutorial.com/) | Queries complejas, índices |
| 7 | Deployment + CI/CD | [Vercel Docs](https://vercel.com/docs) + [GitHub Actions](https://docs.github.com/en/actions) | Pipeline completo |

---

## 6. Comandos Útiles del Día a Día

```bash
# Desarrollo
pnpm dev                    # Levanta todas las apps (turborepo)
pnpm dev --filter=web-soulsbeat  # Solo una app

# Base de datos
pnpm db:push                # Push schema a DB (dev)
pnpm db:migrate             # Crear migración
pnpm db:studio              # Prisma Studio GUI
pnpm db:seed                # Seed data

# Calidad
pnpm lint                   # ESLint all
pnpm typecheck              # tsc --noEmit
pnpm test                   # Vitest
pnpm test:e2e               # Playwright

# Build
pnpm build                  # Build all
pnpm build --filter=admin   # Build solo admin
```

---

## 7. Estructura de Commits Sugerida (Conventional Commits)

```
feat(soulsbeat): add talent catalog with filters
fix(admin): prevent non-admin access to brand settings
chore(db): add index on Quote.createdAt
docs: update API routes documentation
refactor(ui): extract Button variants to shared config
test(quote): add e2e test for multi-step wizard
```

---

## 8. Preguntas Pendientes del Cliente (Bloquean decisiones)

Antes de **FASE 2-3**, resolver:

**Soulsbeat:**
1. ¿Solo talentos representados o también externos?
2. ¿Quién publica eventos? ¿Soulsbeat o terceros?
3. ¿Venden entradas o solo derivan?
4. ¿Cada artista tiene booking agent distinto?
5. ¿Mostrar tarifas de contratación o siempre "consultar"?
6. ¿Calendario real de disponibilidad del artista?
7. ¿Quién carga noticias/eventos? ¿Cuántos admins?

**Pura Vida:**
1. ¿Alojamientos propios, acuerdos o catálogo terceros?
2. ¿Precios manuales o dinámicos?
3. ¿Paquetes precio cerrado o cotización?
4. ¿Aéreos cotización manual?
5. ¿Venden entradas o derivan? ¿Stock propio?
6. ¿Con qué ticketeras trabajan?
7. ¿Beneficios solo para clientes que compraron?
8. ¿Cómo validan cliente actual?
9. ¿Comercios administran beneficios o solo Pura Vida?
10. ¿Cobro online? ¿Monedas?

**Ambas:**
1. ¿Dos dominios distintos o subdominios?
2. ¿Acceso cruzado visible entre marcas?
3. ¿Multiidioma desde inicio?
4. ¿Qué datos guardar de usuarios registrados?
5. ¿Proveedor login social ya configurado?
6. ¿Notificaciones email además de WhatsApp?

---

## 9. Próximo Paso Inmediato

**Ejecutar FASE 0.1 - 0.7** para tener el esqueleto funcionando.

¿Quieres que empecemos ahora con la **inicialización del monorepo** (Turborepo + 3 apps Next.js + TypeScript + Tailwind + Prisma + Auth.js)?

Te iré explicando cada comando y archivo que creemos, para que vayas entendiendo el "por qué" de cada cosa.