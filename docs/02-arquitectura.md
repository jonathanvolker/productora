# Arquitectura propuesta

## Decision principal

Usar un monorepo TypeScript con tres aplicaciones web y una API compartida:

```text
apps/
  soulsbeat-web    # experiencia publica Soulsbeat
  puravida-web     # experiencia publica Pura Vida
  admin            # panel interno compartido
  api              # API y reglas de negocio
packages/
  ui               # componentes y accesibilidad compartidos
  config           # TypeScript, lint y formatos compartidos
  domain           # tipos, validaciones y contratos sin acceso a infraestructura
```

La estructura puede comenzar con menos aplicaciones durante el prototipo, pero no se deben mezclar reglas de

## Capas

- Web: renderizado publico, SEO, formularios y consumo de API.
- API: autenticacion, autorizacion, validacion, casos de uso, persistencia y adaptadores externos.
- Dominio: entidades, estados validos y reglas que no dependen de HTTP o del proveedor de base de datos.
- Persistencia: repositorios y migraciones.
- Integraciones: WhatsApp/enlaces, OAuth, almacenamiento de medios y futuras ticketeras.

## Separacion por marca

Las entidades compartidas pueden tener `brandId` cuando corresponde. La API debe aplicar el contexto de marca en
servidor, no confiar en un filtro enviado por el navegador. Un administrador solo puede consultar o modificar datos
de marcas autorizadas.

Un evento puede relacionarse con una experiencia de Pura Vida sin duplicar el registro. La relacion debe ser
explicita y no debe hacer que una marca publique accidentalmente contenido de la otra.

## Frontends publicos

Cada marca tiene rutas, metadata, navegacion y tono propios. Comparten infraestructura, contratos y componentes
base, pero no una pagina generica parametrizada que termine ocultando diferencias de negocio.

Los contenidos indexables deben renderizarse de forma compatible con SEO. Las paginas de detalle necesitan slug,
titulo, descripcion, imagen social y canonical administrables.

## Autenticacion

La autenticacion sera propia de la plataforma, sin depender obligatoriamente de Supabase Auth, Auth0 o Clerk.
Esto permite conservar control sobre usuarios, sesiones, permisos y datos, evitando agregar un proveedor permanente
de identidad por comodidad de implementacion.

Se ofreceran tres recorridos:

- Continuar con Google mediante OAuth 2.0.
- Registrarse e iniciar sesion con email y contraseña.
- Continuar como invitado para navegar y enviar consultas.

Google sera una integracion externa, pero no se utilizara una API key. Se configurara un cliente OAuth 2.0 con
`GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`. El secreto solo vive en el backend. La autenticacion tradicional usara
hash seguro de contraseñas, verificacion de email, recuperacion de contraseña y sesiones seguras.

## API e integraciones

La API es la unica capa autorizada para escribir leads, cotizaciones, usuarios y contenido administrativo. Los
frontends nunca deben escribir directamente en la base de datos.

WhatsApp se trata como adaptador: primero `createLead` o `createQuote`, luego se genera un mensaje y URL con datos
minimos. No se debe poner informacion sensible innecesaria en la URL.

Las entradas se modelan inicialmente como URL externa. Un proveedor de tickets debe agregarse detras de una
interfaz de integracion cuando exista una necesidad y acuerdo comercial real.

## Despliegue inicial sugerido

- Webs y admin en una plataforma con soporte para Next.js.
- API en un servicio Node.js administrado.
- PostgreSQL administrado.
- Almacenamiento de imagenes compatible con S3 o servicio especializado.
- Entornos separados: local, staging y produccion.
- Secretos exclusivamente mediante variables de entorno del proveedor.
