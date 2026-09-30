# Lineamientos de desarrollo

## Reglas generales

- Mantener TypeScript en modo estricto y evitar `any`.
- Nombrar el dominio con el lenguaje del negocio: `Talent`, `Event`, `BookingInquiry`, `Experience`, `TravelQuote`.
- Preferir funciones pequeñas y casos de uso explicitos sobre controladores con logica de negocio.
- Validar toda entrada en el borde de la aplicacion: body, query, params, archivos y webhooks.
- No confiar en permisos, marca o precios enviados por el cliente.
- Mantener cambios pequeños, revisables y con una prueba relevante.
- No agregar funcionalidades fuera del MVP como "preparacion" si no existe un caso concreto.

## API

- Usar respuestas y errores consistentes.
- Separar DTOs de entrada de modelos de persistencia.
- Aplicar autorizacion en cada caso de uso administrativo.
- Usar paginacion, filtros y ordenamiento controlados para listados.
- Registrar eventos comerciales sin incluir datos personales innecesarios en logs.
- Hacer idempotentes los endpoints de envio cuando una repeticion pueda duplicar un lead.

## Formularios comerciales

1. Validar en cliente para una buena experiencia.
2. Validar nuevamente en API como autoridad.
3. Guardar la consulta con estado inicial.
4. Generar el identificador y mensaje estructurado.
5. Registrar el intento de WhatsApp.
6. Mostrar confirmacion y alternativa de contacto si el enlace falla.

No almacenar contraseñas propias si el login social resuelve el requisito. Si se agrega email/password, usar un
proveedor probado y politicas de recuperacion seguras.

## Contenido y SEO

- Slugs unicos, estables y legibles.
- Borrador/publicado para contenido administrable.
- No borrar contenido publicado sin una estrategia de redireccion o archivado.
- Metadata editable con limites razonables.
- `alt` obligatorio para imagenes de contenido.
- JSON-LD solo cuando los datos sean veraces y mantenibles.

## Git y revisiones

- Ramas cortas por tarea y commits con intencion clara.
- No mezclar refactors masivos con una funcionalidad.
- Todo cambio de esquema incluye migracion y actualizacion de datos de prueba.
- Toda nueva ruta publica incluye estados loading, error, vacio y mobile.
- La revision debe comprobar alcance, permisos, validacion, accesibilidad, SEO y pruebas.

## Contratos con otra IA

Antes de pedir implementacion, indicar: objetivo, archivos afectados, comportamiento esperado, restricciones del MVP
y criterio de aceptacion. La IA debe inspeccionar el codigo actual, proponer el cambio minimo y no inventar
integraciones ni decisiones visuales no aprobadas.
