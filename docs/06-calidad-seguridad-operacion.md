# Calidad, seguridad y operacion

## Definition of Done

Una funcionalidad se considera lista cuando:

- Cumple el criterio de aceptacion y respeta el alcance.
- Tiene validacion de cliente y servidor donde corresponde.
- Respeta permisos y aislamiento entre marcas.
- Tiene estados de carga, error, vacio y exito.
- Funciona en viewport movil y escritorio.
- Es navegable con teclado y tiene labels, foco y contraste adecuados.
- Incluye pruebas unitarias o de integracion para reglas importantes.
- Tiene prueba end-to-end para el flujo comercial critico.
- Incluye metadata SEO si es una pagina publica.
- No expone secretos, PII innecesaria ni errores internos.

## Pruebas prioritarias

- Visitante ve eventos y talentos sin autenticarse.
- Un ticket externo abre la URL correcta y registra el evento analitico.
- Una consulta de booking se guarda una sola vez y conserva su estado.
- Una cotizacion genera identificador y mensaje de WhatsApp correcto.
- Si WhatsApp falla, la consulta sigue disponible en el panel.
- Un administrador de una marca no puede modificar datos de la otra.
- Contenido no publicado no aparece en el sitio publico.

## Seguridad minima

- HTTPS en todos los entornos no locales.
- Secretos en el gestor de secretos del entorno.
- Cookies seguras, `HttpOnly` y `SameSite` apropiado.
- Proteccion CSRF donde aplique.
- Rate limiting y anti-spam para formularios publicos.
- Sanitizacion de contenido enriquecido y validacion de archivos.
- Logs sin tokens, credenciales ni datos sensibles completos.
- Backups automaticos y prueba periodica de restauracion.
- Dependencias actualizadas y escaneo en CI.

## Observabilidad

- Error tracking para web y API.
- Logs estructurados con request ID.
- Metricas de disponibilidad y errores.
- Analitica separada de logs operativos.
- Eventos comerciales: `ticket_click`, `whatsapp_click`, `booking_submitted`, `quote_submitted`.

## Entornos y despliegue

- Pull request obligatorio antes de integrar.
- CI ejecuta formato, lint, typecheck, tests y build.
- Migraciones de base de datos versionadas.
- Staging usa datos anonimizados o de prueba.
- Produccion requiere rollback documentado y migraciones compatibles.
