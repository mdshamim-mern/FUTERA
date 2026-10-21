# FUTERA

Premium PC hardware storefront for Bangladesh. Phase 3 adds a compatibility-first
PC builder to the **SAMPLE catalog**: 140 fictional components, URL-driven browsing,
comparison, preview selections and locally saved builds.
No checkout, payment, stock reservation or compatibility guarantee is implemented.

## Run locally (PowerShell, Node 24.x)

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. `CATALOG_SOURCE=sample` (default) reads deterministic
fixtures without Atlas. `CATALOG_SOURCE=mongodb` requires both MONGODB_URI and
MONGODB_DB; database failures surface as errors, never a silent sample fallback.
APP_URL configures metadata and secure-cookie behavior; use HTTPS in production.
Fonts are fetched by next/font at build time, then served locally.

## Seed and indexes

```powershell
npm run seed -- --dry-run
# For a real development seed, configure MONGODB_URI and MONGODB_DB=futera_sample.
npm run seed
```

The seed validates all 14 categories and 140 products with Zod and Mongoose. Actual
writes require non-production NODE_ENV and a database ending in `_sample`. It
preflights collisions, refuses non-sample/mismatched records, creates declared indexes
without dropping existing indexes, and saves records by slug. It is repeatable and
never deletes unrelated records. An interrupted seed can be rerun. No live offers or
third-party product assets are included. A dry run makes **zero database writes**.

## Commands

| Command | Purpose |
| --- | --- |
| npm run dev | Development server |
| npm run lint | ESLint |
| npm run typecheck | Next route types + strict TypeScript |
| npm run test | Vitest + React Testing Library |
| npm run build | Production build |
| npm run start | Serve production build |
| npm run test:e2e | Chromium smoke flows; build first, port 3000 must be free |
| npm run seed -- --dry-run | Validate all SAMPLE fixtures without a database |
| npm run seed | Upsert SAMPLE data into an explicitly configured sample database |

Install test browser once: `npx playwright install chromium`. E2E tests explicitly
use sample mode and start/stop their own production server. Screenshots and reports
are ignored by Git. Test scopes/results are in IMPLEMENTATION_STATUS.md.

## Routes and behavior

- `/`: hero, per-component budget presets, use-case tabs, featured components and
  sample builds, trust principles, static text brand strip, FAQ.
- `/products`: category, search, brand, BDT price, availability, socket, RAM type,
  sort and page in URL parameters. Native GET forms reset page when filtering.
- `/products/[slug]`: neutral gallery, specification table, preview cart/build actions.
- `/compare?items=slug,slug,slug`: maximum three unique products; shareable server view.
  The catalog comparison picker keeps only references in local storage across paging.
- `/selection?mode=cart|build`: HTTP-only cookie references, maximum 12 unique parts,
  seven-day expiry. All product values and subtotals are reloaded on the server.
  No quantities, order placement or compatibility evaluation yet.
- `/api/health`: uncached liveness only, not database readiness.
- `/pc-builder`: seven required categories, optional extras, quantity-aware compatibility,
  power estimate, responsive picker and summary. Local saves contain IDs/quantities;
  shared URLs use a bounded JSON `build` parameter, validated and re-resolved server-side.
  Save/Duplicate retain up to ten local snapshots. Reset keeps saved snapshots.
  WhatsApp opens a composed link; Messenger uses native share or copy fallback; Print
  produces a component list and summary. Nothing is automatically sent to anyone.

The builder's default filter hides known conflicts; incomplete-spec options remain
explicitly unverified. Healthy requires seven categories, all checks passing and stock
available. Quick starts are fictional target-budget scenarios, not budget guarantees.
FPS is unavailable without benchmarks; performance hints are qualitative estimates.
See PC_COMPATIBILITY_RULES.md for assumptions and unmodelled physical constraints.

MongoDB search uses the text index with a quoted phrase. Fixture search uses literal,
case-insensitive substring matching for a database-free demo; MongoDB linguistic and
punctuation behavior can differ. Prices are integer BDT minor units internally.
Missing specs display Unknown; cross-category comparisons display Not applicable.

## Documentation

See ARCHITECTURE.md, DATABASE_SCHEMA.md, PC_COMPATIBILITY_RULES.md, DESIGN_SYSTEM.md,
DECISIONS.md and IMPLEMENTATION_STATUS.md. AGENTS.md is preserved unchanged.
No deployment or push is performed without a separate request.
