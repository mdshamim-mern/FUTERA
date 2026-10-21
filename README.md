# FUTERA

Premium PC hardware storefront for Bangladesh. Phase 4 adds accounts and transactional
COD checkout; Phase 3 added a compatibility-first
PC builder to the **SAMPLE catalog**: 140 fictional components, URL-driven browsing,
comparison, preview selections and locally saved builds.
No online payment or real fulfillment is simulated. Compatibility checks cover declared
specifications, not a manufacturer guarantee.

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

## Phase 4 commerce setup

Commerce defaults OFF; the sample storefront/builder remain usable without a database.
Configure a MongoDB replica set (transactions required), CATALOG_SOURCE=mongodb,
COMMERCE_ENABLED=true, private random AUTH_SECRET (32+ characters), APP_URL,
SHIPPING_HOME_MINOR, SHIPPING_PICKUP_MINOR and PICKUP_ADDRESS. Fees are integer poisha;
there are no invented live fee defaults. Public APP_URL requires HTTPS. Run
`npm run db:indexes` before enabling traffic: unique email, idempotency and TTL indexes
are required. This creates indexes without dropping existing ones. Use the guarded
SAMPLE seed only against a development `_sample` database for fictional products.

Routes: /register, /login, /account (orders, addresses, saved builds, wishlist), /cart,
/checkout, /orders/[id] and /builds/[public-token]. Guest carts use an opaque HTTP-only
cookie; registration/login merges once transactionally into the account. Build controls
save/rename/duplicate/delete/restore and rotate/revoke public shares. Public quotes
contain component details only, with a QR to the share URL. Print / Save as PDF creates
a branded browser PDF. No owner name, email or delivery address appears on the quote.

Checkout signs a ten-minute review snapshot, then re-reads cart, prices, stock, coupon
and shipping in a transaction. Pricing/cart mismatches require another review. Stock
decrement, coupon usage, unpaid COD order and cart clearing commit together. Duplicate
confirmations reuse the order. bKash/Nagad/Card remain coming soon; credentials alone
cannot enable a provider that has not been implemented and sandbox-tested.
Coupon records are curated out of band; no public coupon/admin-write endpoint exists.
An admin-guarded server function enforces sequential order status transitions.

`npm run test` includes real isolated MongoDB transaction and ownership tests.
`npm run test:e2e` runs existing storefront/builder regressions on port 3000.
`npm run test:e2e:commerce` uses a separate MongoDB 8.2.6 replica set and production app
on port 3100. It generates an ephemeral secret, uses SAMPLE data/example.test accounts
and sends no real payments or deliveries. A local MongoDB binary cache may be downloaded.
Build first and leave the test ports free. Test shipping fees are explicitly fictional.

Address data provenance/license is in src/features/checkout/data: 8 divisions,
64 districts and 491 upazilas from a community snapshot. Verify current delivery
coverage before launch. Account recovery, email verification, MFA, live tax policy,
inventory cancellation/reconciliation and online payment integration remain launch work.
No additional tax is calculated in this phase; confirm the real pricing policy.
