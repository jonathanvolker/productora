# Modelo de dominio inicial

Este modelo orienta el analisis. El esquema definitivo se define con las decisiones comerciales y las migraciones.

## Entidades comunes

- `Brand`: Soulsbeat o Pura Vida.
- `AdminUser`, `Role`, `Permission`: acceso al panel.
- `User`: usuario final opcional.
- `MediaAsset`: imagen o video con metadata y almacenamiento externo.
- `Event`: evento publico, venue, fecha, artistas, ticket URL y relaciones comerciales.
- `Lead`: consulta comercial normalizada y origen.
- `SiteConfiguration`: contactos, WhatsApp, redes y configuracion por marca.
- `SeoMetadata`: slug, title, description, imagen social y canonical.

## Soulsbeat

- `Talent` y `TalentCategory`.
- `TalentSocialLink` y `TalentMedia`.
- `BookingInquiry`: artista, contacto, empresa, ciudad, fecha, tipo, capacidad, presupuesto y comentarios.
- `Article` y `ArticleCategory`.

Estados de `BookingInquiry`: `NEW`, `IN_PROGRESS`, `CLOSED`. El resultado opcional distingue confirmada o descartada.

## Pura Vida

- `Experience` o paquete comercial.
- `Accommodation`.
- `Transfer`.
- `TravelQuote` con pasajeros, fechas, origen y servicios solicitados.
- `Partner`.
- `Benefit` y `Coupon`.

Estados de `TravelQuote`: `NEW`, `IN_PROGRESS`, `CONFIRMED`, `CLOSED`. El motivo de cierre es un dato, no un estado
adicional.

## Reglas de datos

- Las fechas se almacenan con zona horaria definida y se muestran según el mercado objetivo.
- Los estados se representan como enums controlados, no como texto libre.
- Los precios opcionales deben indicar moneda y no mostrarse si no son confiables.
- Los medios se eliminan de forma segura y no deben romper contenido publicado sin advertencia.
- Los registros comerciales conservan origen, marca, timestamps y referencia de la conversacion cuando aplique.
- Los datos personales deben tener politica de retencion y acceso restringido.

## Relaciones clave

```text
Brand -> contenidos administrables
Talent <-> Event
Event <-> Experience
Experience -> Accommodation / Transfer / Benefit
BookingInquiry -> Talent + Brand
TravelQuote -> Experience/Event + Brand
Article <-> Talent/Event
```
