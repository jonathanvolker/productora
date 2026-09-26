# Alcance funcional

## Objetivo

Construir dos experiencias publicas diferenciadas, Soulsbeat y Pura Vida, sobre una infraestructura compartida.
El visitante puede descubrir contenido y realizar consultas sin crear una cuenta.

## Principios obligatorios

- El contenido publico relevante es dinamico y administrable.
- La navegacion publica y los formularios comerciales funcionan como invitado.
- Los leads se guardan antes de abrir WhatsApp.
- La compra de tickets y la contratacion de artistas son flujos distintos.
- El registro social es opcional y solo se solicita cuando agrega valor.
- La experiencia es mobile-first, responsive y con SEO basico.
- No se define una paleta visual antes de resolver arquitectura de informacion y UX.

## MVP de Soulsbeat

- Home con eventos, talentos, noticias y accesos diferenciados para publico y booking.
- Catalogo y perfil de talentos.
- Categorias, redes sociales, plataformas musicales y galeria.
- Agenda de eventos con enlace externo a tickets.
- Noticias/blog relacionado con talentos y eventos.
- Formulario B2B de contratacion con guardado de consulta y WhatsApp prearmado.
- Administracion de talentos, eventos, noticias, categorias, medios, links, destacados y estados de consulta.

## MVP de Pura Vida

- Home, experiencias/paquetes y eventos.
- Alojamientos y traslados administrables.
- Aereos como parte de una cotizacion, sin motor de reservas.
- Beneficios, cupones simples y partners.
- Cotizador con identificador interno, persistencia y WhatsApp prearmado.
- Estados de cotizacion: nueva, en gestion, confirmada y cerrada.
- Administracion de todo el contenido anterior y de las consultas.

## Base compartida

- API y base de datos compartidas.
- Panel admin con contexto de marca y permisos.
- Usuarios administrativos, roles y auditoria minima.
- Biblioteca de medios.
- Configuracion de contacto, WhatsApp, SEO y redes.
- Registro opcional con Google OAuth y email/contraseña.
- Analitica de paginas, tickets, WhatsApp, contrataciones y cotizaciones.

## Fuera del MVP

- App nativa.
- Push, favoritos avanzados, historial de viajes y fidelizacion completa.
- Pagos online.
- Integracion profunda con ticketeras o sincronizacion de stock.
- Motor de vuelos, tarifas dinamicas o emision.
- CRM avanzado, foro, portal de partners y newsletter automatizado.
- PDF o press kit descargable.

## Criterio de aceptacion transversal

Cada formulario comercial debe validar datos, persistir la consulta, devolver confirmacion al usuario y solo luego
intentar abrir WhatsApp. Si WhatsApp no puede abrirse, la consulta no se pierde y queda visible en el panel.
