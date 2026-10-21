# FUTERA architecture

## Audit — 2026-10-21

The root contains only AGENTS.md and .git. Working tree is clean on main.
History has two commits (9af8cb4 and efd567e), not the expected one.
Preserve AGENTS.md verbatim and all Git history. Node 24.15.0, npm 11.12.1,
and Git 2.54.0.windows.1 are available. No tool blocker identified.

## Structure and boundaries

- `src/app`: App Router pages, layouts, loading/error boundaries and HTTP routes.
- `src/components`: shared shell, identity, state components and shadcn primitives.
- `src/features/<feature>`: future products, builder, cart, checkout, account and admin.
- `src/features/builder/compatibility`: future pure TypeScript rules; no UI/DB imports.
- `src/server`: future server-only business operations and repositories.
- `src/lib`: environment validation, database connection and shared utilities.
- `src/types`: future shared domain contracts.

Server Components are the default. Only interactive drawers, dialogs, form state
and future builder state cross the client boundary. Secrets and database imports
stay in server-only modules. Zustand will be restricted to builder state.
Server Actions handle future form mutations with Zod validation and authorization
on every invocation. Route Handlers serve explicit HTTP contracts: health now,
verified payment webhooks later. Neither middleware nor hidden UI is authorization.

## Planned MongoDB collections and indexes

Category and Product are implemented in Phase 2; remaining collections are planned. Indexes are declared but have not been verified on a live database.

| Collection | Shape and indexes |
| --- | --- |
| products | Unique slug and SKU; category discriminator with validated CPU, motherboard, RAM, GPU, case, cooler, PSU or storage specs; category + active + price compound index. Store integer BDT minor units. |
| categories | Unique slug; parentId + sortOrder index. |
| compatibilityRules | Unique ruleId + version; enabled index; curated spec constraints, never executable database code. |
| builds | OwnerId + updatedAt; optional unique partial shareToken; component references, quantity and rule-version snapshot. |
| users | Unique normalized email; role defaults to customer; provider identity uniqueness through the eventual Auth.js adapter. |
| carts | Unique owner key (user or signed guest); expiresAt TTL for guest carts; references and quantities only. |
| orders | Unique orderNumber and idempotencyKey; userId + createdAt; status + createdAt; immutable priced line/address snapshots. |
| coupons | Unique normalized code; validity and usage limits; atomic usage accounting. |
| inventory | Unique productId; available/reserved counts with version for conditional writes; no stock inferred from catalog. |

Index names, partial filters and adapter-specific auth collections will be finalized
with schemas. Production index creation is an explicit migration, not autoIndex.

## Authentication and commerce (future phases)

Use Auth.js with a provider chosen by the owner. Resolve role from trusted server
data and check it inside every admin read/mutation. Admin creation is out-of-band;
never accept roles from registration input. Protect build/order ownership as well.

Re-read prices, inventory, coupon eligibility and shipping on the server at checkout.
Use integer amounts, atomic conditional stock reservations and MongoDB transactions
for order/reservation consistency. Payment verification must be server-to-server,
signature checked and idempotent; browser redirects never prove payment. Reservation
expiry and reconciliation need an explicit background job before launch.

## Deployment and operations

Deploy a Node-compatible Next.js service (provisional: Vercel) near the Atlas region.
Use separate development, preview and production databases and secret stores.
CI gates lint, typecheck, unit tests, production build and browser smoke tests.
The health endpoint is liveness only and does not claim database readiness.
Foundation builds without Atlas; database access fails clearly until configured.
Before launch add backup/restore verification, structured redacted logs, rate limits,
monitoring, migrations and rollback procedures. Do not deploy during Phase 1.

## Risks and open decisions

Choose auth provider, payment gateway, shipping rules, tax/rounding policy, inventory
source, warranty/returns policy and hosting/Atlas region before commerce work.
Confirm guest checkout and Bangla translation scope. Missing compatibility specs
must produce unknown, never compatible. Fonts require network during the build.
Sample content must never look like live prices/stock. Public Git must contain no
credentials, real customer data or copied third-party assets.

## Phase 2 implementation (supersedes Phase 1 planned catalog entries)

`src/features/products` owns the shared Zod contracts, deterministic fixtures, pure
URL/query helpers, presentation components and preview-selection Server Action.
`src/server/models/catalog.ts` defines Category/Product Mongoose models. It is Node-only
but deliberately has no Next server-only marker so the Node seed command can import
it. All storefront access goes through `src/server/catalog.ts` (server-only).

Home and catalog/detail/compare pages fetch on the server. Client islands are the
filter sheet, gallery thumbnails, use-case tabs, comparison picker and submit pending
state. Search/filter forms are native GET requests; no data-fetching client store.
Catalog query building only accepts enumerated fields, bounded strings/numbers and
predefined sort directions. Every sort has a slug tiebreaker; page size is 12, page
input capped at 1000, then clamped to the result count. Text queries use Mongo's text
index; sample mode uses deterministic literal substring search.

`CATALOG_SOURCE` explicitly chooses fixtures or MongoDB. MongoDB failures render the
error boundary. Models declare indexes but do not create them during page requests.
The guarded development seed creates indexes and validates document saves. Persisted
records are parsed into validated DTOs before reaching UI; ObjectIds stay server-side.

Cart/build controls in this phase save preview references only. Server Actions
validate mode/slug, re-read products and catalog stock for cart additions, and write
bounded HTTP-only SameSite=Lax host cookies. HTTPS APP_URL enables Secure. Read-time
pricing comes from server records; client prices/totals are never accepted. There is
no reservation, inventory transaction, checkout or compatibility engine. Future real
commerce must replace catalog stock snapshots with authoritative inventory operations.

Production deployment/auth/payment decisions from Phase 0 remain open. This phase
adds no admin APIs, catalog mutation UI, new production dependencies or hosted service.
