# Stack tecnologico recomendado

## Recomendacion corta

Si: Node.js y React son una buena eleccion para este proyecto. La recomendacion concreta es:

- TypeScript como lenguaje unico.
- Node.js en version LTS vigente.
- Next.js para Soulsbeat, Pura Vida y el panel admin.
- NestJS para la API compartida.
- PostgreSQL como base de datos relacional.
- Prisma como ORM y sistema de migraciones.
- pnpm + Turborepo para monorepo y tareas compartidas.
- Zod para validacion de entradas y contratos en los limites.
- Playwright para pruebas end-to-end.
- Vitest para pruebas unitarias.
- ESLint, Prettier y TypeScript strict para calidad automatica.

## Por que esta combinacion

Next.js resuelve renderizado, rutas publicas y SEO sin construir una capa web desde cero. NestJS aporta una API
modular con limites claros entre dominios, adecuada para reutilizar la logica desde futuras aplicaciones moviles.
PostgreSQL encaja mejor que una base documental con relaciones entre marcas, eventos, talentos, paquetes, leads y
permisos.

## Autenticacion

Se implementara autenticacion propia en la API, separando la experiencia administrativa de los usuarios finales.
No se dependera obligatoriamente de Supabase Auth, Auth0 o Clerk; son alternativas validas, pero agregan una
dependencia permanente, costos y potencial vendor lock-in.

La autenticacion propia debe incluir:

- Registro e inicio de sesion con email y contraseña.
- Hash de contraseñas con Argon2 o equivalente probado.
- Verificacion de email.
- Recuperacion y cambio de contraseña.
- Sesiones seguras con cookies `HttpOnly`, `Secure` y `SameSite` adecuado.
- Revocacion de sesiones y proteccion contra intentos abusivos.

Google se integrara con OAuth 2.0 usando un cliente creado en Google Cloud Console. No se necesita una API key.
Las variables son `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`; el secreto nunca se expone al navegador.
Se deben configurar pantalla de consentimiento, origenes autorizados y URLs de callback para local, staging y
produccion.

El login social es opcional en el MVP. No debe bloquear navegar, ver contenido ni enviar una consulta.

## UI y estilos

- Definir primero tokens de espaciado, tipografia, color y estados; no fijar una paleta sin validacion de marca.
- Usar componentes accesibles y responsivos.
- Mantener un paquete UI compartido para primitives, no para imponer una identidad visual igual en ambas marcas.
- Optimizar imagenes, formatos modernos, tamaños responsivos y texto alternativo.

## Decisiones que no se deben tomar aun

- No incorporar microservicios.
- No introducir una app nativa para el MVP.
- No implementar pagos, vuelos en vivo o ticketing profundo sin requerimiento aprobado.
- No elegir un proveedor SaaS por costumbre sin revisar exportacion de datos, costos y bloqueo del proveedor.

## Variables de entorno minimas

```text
DATABASE_URL
API_URL
SESSION_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
WHATSAPP_BOOKING_NUMBER
WHATSAPP_PURAVIDA_NUMBER
MEDIA_STORAGE_URL
```

Los nombres definitivos se fijan al implementar. Nunca se versionan valores reales.
