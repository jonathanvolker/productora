# Guia de incorporacion

Este documento permite que un estudiante, colaborador o nueva IA entienda el estado del proyecto sin asumir que
las funcionalidades del documento funcional ya estan implementadas.

## Estado actual

El proyecto se encuentra en la etapa de base tecnica inicial.

### Ya disponible

- Monorepo administrado con pnpm y Turborepo.
- TypeScript en modo estricto.
- Aplicacion publica inicial de Soulsbeat.
- Aplicacion publica inicial de Pura Vida.
- Aplicacion inicial del panel administrativo.
- API NestJS con endpoint `GET /health`.
- Paquetes compartidos `@productora/domain` y `@productora/ui`.
- Configuracion inicial de Prettier y variables de entorno.
- Documentacion funcional, arquitectura, stack, dominio y calidad.

### Todavia no implementado

- Base de datos y migraciones Prisma.
- Autenticacion propia.
- Google OAuth.
- Roles y permisos reales.
- CRUD de talentos, eventos, experiencias y contenidos.
- Formularios de booking y cotizacion.
- Persistencia de leads.
- Integracion con WhatsApp.
- Biblioteca de medios.
- Analitica y SEO dinamico.
- Diseño visual definitivo.

Los textos actuales de las aplicaciones son placeholders. No deben interpretarse como pantallas terminadas.

## Requisitos locales

- Node.js LTS, recomendado Node 22 o superior.
- Corepack habilitado.
- pnpm 12.x, gestionado por Corepack.
- Git.
- PostgreSQL sera necesario cuando se implemente persistencia.

## Como instalar

Desde la raiz del repositorio:

```bash
corepack enable pnpm
pnpm install
```

El archivo `.env.example` contiene las variables previstas. Para el estado actual no es necesario completar todas
las credenciales, pero al trabajar con API o base de datos se debe crear un `.env` local y nunca versionarlo.

## Como levantar el proyecto

Para iniciar todas las aplicaciones:

```bash
pnpm dev
```

URLs locales:

- Soulsbeat: `http://localhost:3000`
- Pura Vida: `http://localhost:3001`
- Panel admin: `http://localhost:3002`
- API: `http://localhost:4000`
- Salud de API: `http://localhost:4000/health`

También se puede iniciar una aplicación individual:

```bash
pnpm --filter @productora/soulsbeat-web dev
pnpm --filter @productora/puravida-web dev
pnpm --filter @productora/admin dev
pnpm --filter @productora/api dev
```

## Comandos de validacion

Ejecutar desde la raiz antes de entregar cambios:

```bash
pnpm typecheck
pnpm build
pnpm format:check
pnpm test
```

El lint esta declarado como pendiente de configurar formalmente con ESLint. No se debe afirmar que existe una
validacion de lint real hasta completar esa tarea.

## Como leer el repositorio

```text
apps/soulsbeat-web  Sitio publico Soulsbeat
apps/puravida-web   Sitio publico Pura Vida
apps/admin          Panel interno compartido
apps/api            Backend y reglas de negocio
packages/domain     Tipos y estados del dominio compartidos
packages/ui         Primitives visuales compartidas
docs                Fuente de verdad funcional y tecnica
```

Orden recomendado de lectura:

1. `docs/01-alcance-funcional.md`
2. `docs/02-arquitectura.md`
3. `docs/03-stack-tecnologico.md`
4. `docs/05-modelo-dominio.md`
5. `docs/07-decisiones-pendientes.md`
6. Este documento
7. El codigo dentro de `apps/`

## Orden recomendado para avanzar

### Paso 1: cerrar decisiones de negocio

Resolver las preguntas de `docs/07-decisiones-pendientes.md` antes de construir integraciones o presupuestar
funcionalidades. No inventar proveedores, precios, dominios o reglas comerciales.

### Paso 2: configurar calidad de codigo

- Incorporar ESLint flat config.
- Agregar Vitest y reemplazar los placeholders de test.
- Configurar CI para typecheck, lint, tests, formato y build.
- Mantener Node y pnpm fijados para todo el equipo.

### Paso 3: implementar persistencia

- Agregar Prisma y PostgreSQL.
- Diseñar el esquema inicial a partir de `docs/05-modelo-dominio.md`.
- Crear migraciones y datos seed de desarrollo.
- Separar repositorios de la logica de los casos de uso.
- Probar aislamiento por `brandId`.

### Paso 4: implementar autenticacion y permisos

- Registro e inicio de sesion con email y contraseña.
- Hash con Argon2, verificacion y recuperacion de email.
- Google OAuth 2.0 con credenciales de Google Cloud.
- Sesiones seguras y revocables.
- Roles `SUPER_ADMIN`, `SOULSBEAT_ADMIN`, `PURAVIDA_ADMIN`, `CONTENT_EDITOR` y `SALES_AGENT`.
- Guardas de autorizacion en la API y no solo en la interfaz.

### Paso 5: construir el panel administrativo

- Contexto de marca.
- Gestion de medios.
- CRUD de categorias, talentos, eventos y noticias.
- CRUD de experiencias, alojamientos, traslados, partners y beneficios.
- Publicar, despublicar y destacar.
- Gestionar consultas y estados.

### Paso 6: construir las experiencias publicas

- Layout y sistema visual provisorio validado en mobile.
- Listados, filtros y paginas de detalle.
- Slugs, metadata y estados de contenido.
- Relaciones entre talentos, eventos y experiencias.
- Estados de carga, error y vacio en cada pantalla.

### Paso 7: construir los flujos comerciales

- Booking profesional de Soulsbeat.
- Cotizador de Pura Vida.
- Validacion server-side.
- Guardado de lead o cotizacion antes de WhatsApp.
- Mensajes prearmados y fallback si WhatsApp no abre.
- Estados simples y notas internas.

### Paso 8: analitica, seguridad y salida

- Eventos de tickets, WhatsApp, booking y cotizaciones.
- Rate limiting y anti-spam.
- Backups y observabilidad.
- Pruebas end-to-end de los flujos prioritarios.
- Revisión SEO, accesibilidad, rendimiento y responsive.
- Staging con datos anonimizados antes de produccion.

## Reglas para trabajar con IA

Antes de pedir un cambio, indicar:

- Objetivo concreto.
- Aplicacion o paquete afectado.
- Flujo de usuario involucrado.
- Criterios de aceptacion.
- Restricciones del MVP.
- Comando esperado para validar.

La IA debe:

- Leer primero la documentacion y el codigo relacionado.
- No reintroducir funciones excluidas del MVP.
- No inventar integraciones ni credenciales.
- No poner secretos en el repositorio.
- Validar permisos en backend.
- Mantener separadas las reglas de cada marca.
- Hacer cambios pequeños y explicar archivos modificados.
- Ejecutar typecheck, formato y pruebas relevantes.

Ejemplo de pedido correcto:

```text
Implementar el endpoint para crear una BookingInquiry.
Usar las reglas de docs/01-alcance-funcional.md y docs/05-modelo-dominio.md.
Debe validar el payload, guardar la marca y el estado NEW, y devolver un identificador.
No abrir WhatsApp desde la API ni agregar autenticacion obligatoria.
Validar con typecheck y una prueba de integracion.
```

## Definition of Done

Una tarea no esta terminada solo porque la pantalla se vea. Debe cumplir la Definition of Done de
`docs/06-calidad-seguridad-operacion.md`, incluyendo validacion, permisos, estados de interfaz, pruebas y ausencia
de secretos.
