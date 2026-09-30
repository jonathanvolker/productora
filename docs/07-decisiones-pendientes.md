# Decisiones pendientes

Estas preguntas deben cerrarse antes de presupuestar con precision o comprometer integraciones.

## Cliente y negocio

- Dominios definitivos y estrategia de acceso cruzado entre marcas.
- Quienes administran cada marca y cuantos usuarios tendra el panel.
- Si Soulsbeat publica solo talentos representados o tambien externos.
- Si cada talento tiene booking agent propio.
- Si se muestran tarifas o siempre se cotiza.
- Si Pura Vida vende tickets o deriva a proveedores.
- Origen y confiabilidad de precios, cupos y disponibilidad de alojamientos.
- Requisitos reales del asesor para evitar repreguntas por WhatsApp.
- Monedas, idioma inicial, politica de datos y retencion.
- Necesidad de notificaciones por email.

## Integraciones

- Proveedor de OAuth y cuentas disponibles.
- Confirmar si el registro tradicional requiere verificacion de email desde el primer lanzamiento.
- Definir proveedor de envio de emails para verificacion y recuperacion de contraseña.
- Proveedor de almacenamiento de medios.
- Numeros de WhatsApp por marca y por booking agent.
- Proveedores de ticketing actuales y existencia de APIs/acuerdos.
- Herramienta actual de cotizacion, vuelos y alojamientos.
- Herramienta de analitica y consentimiento requerido.

## Decisiones ya tomadas

- Dos frentes publicos y backend/admin compartidos.
- Navegacion y consultas sin registro obligatorio.
- Autenticacion propia con email/password y Google OAuth opcional.
- No depender obligatoriamente de Supabase Auth, Auth0 o Clerk.
- Leads persistidos antes de abrir WhatsApp.
- Tickets externos en el MVP.
- Aereos cotizables, sin motor de reservas.
- Estados comerciales simples.
- Sin foro, app nativa, pagos online, CRM avanzado ni press kit en el MVP.

## Registro de cambios

Cada cambio de alcance debe agregar fecha, decision, responsable, impacto y documentos afectados. No modificar esta
lista silenciosamente durante una implementacion.
