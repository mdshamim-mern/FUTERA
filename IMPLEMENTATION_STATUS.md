# Implementation status

## Phase 0 — audit and plan

Audit complete: clean main, two existing commits, only AGENTS.md tracked.
Preserve AGENTS.md and Git history. Toolchain: Node 24.15.0, npm 11.12.1,
Git 2.54.0.windows.1. No blocker identified before scaffolding.

## Phase 1 — planned foundation

1. Scaffold Next.js in root with strict TypeScript, Tailwind, ESLint and @/* alias.
2. Add only the ten requested shadcn primitives, shared shell, original SVG identity,
   Dark Glass tokens, three font families and an honest home placeholder.
3. Add validated environment, lazy server-only MongoDB helper and liveness route.
4. Add Vitest/RTL and Playwright smoke tests, scripts, environment example and docs.
5. Run lint, typecheck, test, build and browser checks at 360px and 1440px.
6. Record actual outcomes and make small conventional commits; never push.

## Explicitly deferred

Catalog, compatibility implementation, builder, auth, cart, checkout and admin.
No live database, payment integration, inventory or deployment is claimed.
User decisions are recorded in ARCHITECTURE.md and do not block foundation.

## Verification

Not yet run. Results will be updated after implementation.
