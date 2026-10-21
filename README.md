# FUTERA

A premium PC hardware and custom-build experience for Bangladesh.
**Phase 1 foundation preview** — no catalog, builder, auth, cart or checkout yet.

## Local setup (PowerShell)

Use Node 24.x and npm (tested with Node 24.15.0 / npm 11.12.1).

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. MongoDB is optional in this phase; leave both database
variables empty. Configure APP_URL for the environment. Do not commit .env.local.
Google font files are fetched by next/font during builds and served locally afterward.

## Commands

| Command | Purpose |
| --- | --- |
| npm run dev | Development server |
| npm run lint | ESLint |
| npm run typecheck | Generate Next route types, then strict TypeScript checks |
| npm run test | Vitest + React Testing Library |
| npm run build | Production build |
| npm run start | Serve the existing production build |
| npm run test:e2e | Playwright against a production server; build first |
| npm run seed | Explicit SAMPLE no-op; zero records until schemas exist |

Before first browser test run `npx playwright install chromium`. The Playwright
config starts/stops its own production server on port 3000, which must be free.
Screenshots and reports are ignored by Git. Unit tests cover environment failures
and shared empty-state rendering; browser tests cover 360px, 768px, 1024px and 1440px.

## Structure and contracts

Read [ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md),
[PC_COMPATIBILITY_RULES.md](PC_COMPATIBILITY_RULES.md),
[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [DECISIONS.md](DECISIONS.md) and
[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

`GET /api/health` returns `{ "status": "ok", "service": "futera", "check": "liveness" }`
with no-store caching. It does not test Atlas or imply commerce readiness.
The server-only MongoDB helper reuses connections and concurrent connection attempts.
No database connection is made just to render the home page.

All original brand/PC concept SVG assets are project-created. The ten UI primitives
are generated from shadcn/ui (Radix), with local accessibility/theme adjustments.
No copied commercial branding, product data, pricing or stock is included.

## Deployment

No deployment is performed in this phase. Proposed target: Node-compatible Next.js
hosting plus MongoDB Atlas, with separate preview/production secrets and databases.
Run all quality gates before deploying. See the architecture risks and open decisions.
