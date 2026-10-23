# FUTERA architecture

## Audit — 2026-10-21

The root contains only AGENTS.md and .git. Working tree is clean on main.
History has two commits (9af8cb4 and efd567e), not the expected one.
Preserve AGENTS.md verbatim and all Git history. Node 24.15.0, npm 11.12.1,
and Git 2.54.0.windows.1 are available. No tool blocker identified.

## Structure and boundaries

- `src/app`: App Router pages, layouts, loading/error boundaries and HTTP routes.
- `src/components`: shared shell, identity, state components and shadcn primitives.
- `src/features/<feature>`: products, builder, cart, checkout, account and admin.
- `src/features/builder/compatibility`: implemented pure TypeScript rules; no UI/DB imports.
- `src/server`: server-only business operations and repositories.
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

## Phase 3 builder (supersedes earlier planned builder statements)

The server page loads a bounded catalog (maximum 1,000 active products) and resolves
shared reference IDs through src/server/builder.ts. That module applies single-slot
constraints, ignores unknown IDs, calculates integer subtotals from fresh records,
checks stock and executes the pure compatibility engine. The quoteBuild Server Action
accepts unknown input and validates it through Zod; no client product values are trusted.
No new HTTP endpoints, database writes, checkout or reservation logic are introduced.

The builder client island uses Zustand persist for IDs, quantities and ten local saved
snapshots only. Hydration is explicit to avoid SSR mismatches. Each change requests a
server quote; stale responses are ignored, pending totals say Verifying, failures hide
the amount and provide retry. Shared links take precedence over local hydration; edits
remove the shared query parameter so reload preserves the edited local build.
Picker candidate checks are pure local previews against the server-provided catalog;
authoritative selected prices/stock/checks come from the subsequent server action.

The bounded full catalog is appropriate for this sample phase; production inventory
size needs server-paginated picker queries. Local saves are device-specific, not account
storage. Messenger depends on device sharing support and has a copy-link fallback.

## Phase 4 accounts and commerce (supersedes previous planned entries)

Auth.js credentials use encrypted JWT sessions with a one-day lifetime. Passwords use
Node scrypt (N=32768, r=8, p=1), random 16-byte salts and timing-safe comparison. Every
session read verifies the live user, disabled flag and sessionVersion; logout increments
the version before clearing cookies, revoking earlier tokens. Admin checks read the
current MongoDB role, never a form field or client token role. Registration always creates
customer. Rate counters are atomic MongoDB fixed windows, shared across app instances:
per-email login/register limits plus global auth/registration caps; TTL removes old rows.
This intentionally avoids trusting arbitrary X-Forwarded-For headers. Add trusted-edge
IP throttling and recovery/MFA/email verification before a public launch.

Server Actions use Next's origin validation; Auth.js HTTP routes additionally require
canonical host and same-origin POST, while preserving Auth.js CSRF handling. HTTPS is
required for non-local commerce, enabling Secure cookies; guest cookies are HTTP-only,
SameSite=Lax, random 256-bit values. Only their SHA-256 owner keys enter MongoDB.
Guest merge, cart clearing and guest-order ownership transfer happen transactionally.

Commerce requires MongoDB and explicit fees, and never silently uses fixture persistence.
The server signs an owner-bound ten-minute review snapshot with HMAC SHA-256. Confirmation
validates the signature/owner, then re-reads all data inside a transaction. Conditional
stock decrements, coupon usage, immutable order snapshot and cart clearing commit as one
unit. Unique ownerKey/requestId enforces idempotency, including concurrent confirmations.
The sole controlled exception to product document-save writes is the guarded stock-only
$inc in this transaction; no arbitrary catalog update payload is accepted.

Saved builds, wishlist and addresses are user-owned. Every build mutation queries ownerId;
orders query ownerKey. Public share tokens are random/revocable and expose product references
only. QR quotes re-resolve current catalog values; they are not price locks or invoices.
Order status changes are admin-guarded sequential updates; customer-facing statuses are
not driven by client claims. COD remains unpaid. Online providers have no enabled adapter.


## Phase 5 admin boundaries

`src/proxy.ts` uses Next.js 16's Node proxy/middleware convention and matches `/admin`
and `/api/admin` descendants. Anonymous requests redirect to login; disabled/customer
requests receive 403. The admin layout and Server Component page also check the current
DB role. `features/admin/actions.ts` checks it again and redirects unauthorized replay,
even when posted to a public route outside the proxy matcher. There are no admin Route
Handlers or upload endpoints. `server/admin.ts` rechecks authorization before parsing
and inside the Mongo transaction, including disabled state and session version.

A discriminated strict Zod union defines eight mutation types. Product writes also pass
category-specific Zod and Mongoose validators. A shared Mongo singleton write serializes
admin mutations with final checkout validation, preventing simultaneous configuration
changes from escaping review checks. This intentionally favors correctness over high
write throughput; partition locks/optimistic configuration revisions before scaling.
All admin writes and audit inserts commit together. Product editing requires its last
updatedAt value; inventory adjustment requires its current stock. Role changes forbid
self-change and revoke the target's sessions. Serial reauthorization prevents two admins
from concurrently demoting each other and leaving no administrator.

Admin reads stay in Server Components. Interactive field editors and confirmation dialogs
are Client Components; they never import database/auth secrets. No optimistic writes:
only successful server responses report success. Revalidation updates storefront,
builder, account, order, quote and admin views. Tables scroll within their containers.

Compatibility overrides are additive exact-product combination warnings/errors. The
pure `checkOverrides` helper is shared by server quotes and client picker previews.
Unknown and base safety results are preserved. Sockets/form factors are maintained as
reference vocabulary shown in category-specific product forms, not an exhaustive whitelist.

## STN-7 two-repository architecture (2026-10-21)
The explicitly requested repository split supersedes the original single-application backend layout. FUTERA remains the Next.js UI root. FUTERA-server is an independent Express/TypeScript API owning MongoDB, authentication sessions, authorization, stock, pricing, coupons, shipping and orders. Frontend Server Actions relay validated HTTP contracts; they do not access MongoDB or calculate authoritative totals.

Authentication uses random opaque, revocable, HTTP-only cookies backed by hashed session tokens in MongoDB. Each request rechecks the user role/session version. Mutations require the exact frontend Origin. Frontend and backend share no secret through public environment variables. The frontend requires APP_URL, API_BASE_URL and COMMERCE_ENABLED; backend configuration is documented in its own .env.example.

Local development: clone FUTERA-server beside FUTERA, install dependencies in both, run the API on port 4000 and Next.js on port 3000. Database seed/index scripts delegate to the backend. Build the backend before running the frontend Playwright suites. Tests use an isolated ephemeral replica set, never Atlas.

Deployment: separate Vercel projects, Node 24, frontend URL as backend APP_URL and backend URL as frontend API_BASE_URL. Commerce stays disabled until Atlas and explicit shipping configuration are available. No live database, OAuth or AI credentials have been supplied. Sample data remains labelled and cannot satisfy a real-inventory requirement.

## External integrations
Google callback reaches the frontend Route Handler, which relays the code/state with the HTTP-only OAuth cookie to the backend. JWT signature/claims and one-time DB state are verified before issuing the normal revocable session. Gemini calls execute only on the backend with a fixed official endpoint and server-only credentials. No private account records enter prompts. Product review writes derive owner IDs from authenticated sessions.


## Reference catalog update — 23 October 2026

The backend now supports CATALOG_SOURCE=reference for 20 source-linked, non-purchasable models. CHECKOUT_ENABLED=false separates account/AI activation from retail fulfillment. Frontend checkout reads the backend capability; all order mutation entry points independently enforce it. Home streams its hero above a reserved catalog loading region.

## Demo migration policy and editorial routes — 23 October 2026
The owner-authorized demo-store policy supersedes the earlier reference-only content decision. Migration is gated on accurate model specs, licensed exact-model assets and isolated database activation. Do not mislabel reference records as purchasable demo inventory before the data workflow is complete. /blog and /blog/[slug] are server-rendered original editorial content from src/features/editorial/articles.ts; /terms documents demo scope. Existing /guides links are retained.
