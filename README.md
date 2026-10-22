# FUTERA

Premium PC hardware storefront for Bangladesh. Phase 5 adds audited administration.
Phase 4 added accounts and transactional
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


## Phase 5 administration

With commerce configured, `/admin` requires a current, enabled admin account. Next.js
16 `src/proxy.ts` is the middleware boundary; the layout, page, Server Action and
transaction repository independently enforce authorization. Public registration never
assigns admin. Provision the first administrator through an authenticated database
operator after verifying the intended registered user; no public bootstrap endpoint or
default production password exists. Subsequent role changes use the audited admin UI.
Run `npm run db:indexes` before traffic to include the admin audit indexes.

Administration provides product creation/editing/archive, category-specific specs,
stock adjustments, bulk archive, order history and sequential fulfillment, role changes,
coupons, shipping, compatibility data, and paginated audit records. Every mutation needs
a reason and confirmation. Monetary inputs are integer poisha (100 = BDT 1); coupon
timestamps are Unix milliseconds. Shipping settings in MongoDB override the explicit
initial environment fees. Checkout always re-reads them; changed fees invalidate quotes.
Product slugs are stable, stock edits use adjustments, and archive retains order history.

Image strategy: use an S3-compatible private upload bucket with server-issued, short-lived
presigned uploads and a separate public CDN for approved derivatives. Generate object
keys on the server; store key, MIME type, dimensions and alt text, not credentials or
expiring signed URLs. Validate size, file signatures and dimensions, strip metadata,
reject SVG/active content, and publish only processed images. Provider, region, retention
and CDN domain remain owner decisions. This phase uses the two existing original neutral
placeholders; no upload endpoint or speculative storage secrets have been added.

`npm run test:e2e:commerce` includes real Auth.js/MongoDB admin editing and storefront
reflection, denial of customer admin requests, and unauthorized Server Action replay
against a public route. Its seeded `example.test` administrator exists only inside the
isolated temporary sample database. Never use test credentials in deployment.

## STN-7 two-repository architecture (2026-10-21)
The explicitly requested repository split supersedes the original single-application backend layout. FUTERA remains the Next.js UI root. FUTERA-server is an independent Express/TypeScript API owning MongoDB, authentication sessions, authorization, stock, pricing, coupons, shipping and orders. Frontend Server Actions relay validated HTTP contracts; they do not access MongoDB or calculate authoritative totals.

Authentication uses random opaque, revocable, HTTP-only cookies backed by hashed session tokens in MongoDB. Each request rechecks the user role/session version. Mutations require the exact frontend Origin. Frontend and backend share no secret through public environment variables. The frontend requires APP_URL, API_BASE_URL and COMMERCE_ENABLED; backend configuration is documented in its own .env.example.

Local development: clone FUTERA-server beside FUTERA, install dependencies in both, run the API on port 4000 and Next.js on port 3000. Database seed/index scripts delegate to the backend. Build the backend before running the frontend Playwright suites. Tests use an isolated ephemeral replica set, never Atlas.

Deployment: separate Vercel projects, Node 24, frontend URL as backend APP_URL and backend URL as frontend API_BASE_URL. Commerce stays disabled until Atlas and explicit shipping configuration are available. No live database, OAuth or AI credentials have been supplied. Sample data remains labelled and cannot satisfy a real-inventory requirement.

## STN-7 implementation update — 22 October 2026
- Independent Express API and frontend adapters are implemented and pushed. Backend production health/catalog verified at https://futera-server.vercel.app (sample mode).
- Light/dark tokens, persistent theme control, profile menu, responsive navigation, four-column listing cards, ten home sections, and About/Support/Contact/Privacy pages are implemented.
- Account and admin sidebars, editable display name, database-backed monthly order chart, and all admin table filters are implemented.
- Reviews store real user submissions only, expose no account identity, and support pagination/aggregate rating. No reviews or activity are invented. Related components use current catalog records.
- Google integration uses PKCE, nonce, expiring single-use state, signed JWT issuer/audience/algorithm checks and customer-only registration. Existing password accounts are never silently linked by email.
- Gemini-backed component recommendations and PC-building help are implemented with authenticated quotas, bounded prompts, schema validation and catalog-ID allowlisting. There is no synthetic AI fallback.
- External activation remains blocked by missing Atlas access, Google OAuth client credentials and Gemini credentials/model configuration. No live account, order, Google login or AI generation is claimed.
- Verified retail data, image licenses, contact details and social accounts remain unavailable. Existing SAMPLE labels and neutral illustrations remain; therefore the rubric's no-dummy-content requirement is not satisfied.
- Public demo credentials are not provisioned without an isolated database. Do not expose a write-capable admin account as a public demo.
- The latest verification record belongs in docs/VERIFICATION.md after checks finish. Lighthouse has not been measured.

## Deployment and submission
Frontend: https://futera-mdshamim.vercel.app — Backend: https://futera-server.vercel.app/api/health. See [submission details](docs/SUBMISSION.md) and [actual verification](docs/VERIFICATION.md). The deployment is a labelled demonstration; missing owner credentials and real retail content remain explicit blockers.

