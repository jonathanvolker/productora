# Soulsbeat + Pura Vida

Plataforma web para dos marcas relacionadas, con experiencias publicas independientes,
backend compartido y un panel administrativo centralizado.

## Documentacion de trabajo

- [Indice de documentacion](docs/README.md)
- [Especificacion funcional y alcance](docs/01-alcance-funcional.md)
- [Arquitectura propuesta](docs/02-arquitectura.md)
- [Stack tecnologico](docs/03-stack-tecnologico.md)
- [Lineamientos de desarrollo](docs/04-lineamientos-desarrollo.md)
- [Modelo de dominio](docs/05-modelo-dominio.md)
- [Calidad, seguridad y operacion](docs/06-calidad-seguridad-operacion.md)
- [Decisiones y preguntas pendientes](docs/07-decisiones-pendientes.md)
- [Guia de incorporacion y avance](docs/08-guia-de-incorporacion.md)

La documentacion es la referencia previa al diseño visual, la estimacion tecnica y la
implementacion del MVP. Las decisiones nuevas deben registrarse antes de modificar el
alcance.

## Base tecnica

```bash
corepack enable pnpm
pnpm install
pnpm dev
```

Aplicaciones locales:

- Soulsbeat: `http://localhost:3000`
- Pura Vida: `http://localhost:3001`
- Admin: `http://localhost:3002`
- API: `http://localhost:4000/health`

Comandos de validacion: `pnpm typecheck`, `pnpm build`, `pnpm format:check` y `pnpm test`.
