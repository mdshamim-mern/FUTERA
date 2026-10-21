# Database schema

Phase 2 implements Category and Product models with declared indexes (details below). See ARCHITECTURE.md for
the collection/index matrix. MongoDB Atlas must support transactions before checkout.

Products have category-discriminated specs validated by Zod before persistence:
CPU socket/TDP/chipset support; motherboard socket/chipset/BIOS/DDR/slots/capacity/
speed/form factor/storage interfaces; RAM DDR/capacity/module count/speed;
GPU length/TDP/connectors; case form factors/GPU clearance/cooler height/radiators;
cooler sockets/TDP/height/radiator size; PSU watts/connectors; storage interface/size.
Unknown specs are null or absent, never zero defaults that imply compatibility.

Amounts use integer BDT minor units (100 poisha = 1 taka); formatting is presentation
only. Stock lives in inventory, not duplicated authoritative product counts.
Orders retain immutable line, price, tax, shipping and address snapshots. Store UTC
timestamps and display Asia/Dhaka. ObjectIds stay server-side or serialize as strings.

Inventory updates use conditional writes and transactions. Unique idempotency keys
prevent duplicate orders. Coupon usage requires atomic limits. Guest-cart TTL is
cleanup only, not an authorization or reservation-expiry guarantee. Index migrations,
retention rules and final auth adapter collections are deferred to their feature phases.

## Phase 2 implemented collections

Category fields: slug (one of the 14 category keys), name, description, sortOrder,
active, isSample, timestamps. Indexes: unique slug; active + sortOrder.
Product fields: unique slug and SKU, name, brand, category slug, description,
priceMinor (integer poisha), stock (nonnegative catalog snapshot), active, isSample,
featured, safe local image records, specs and timestamps. Category keys include CPU,
motherboard, RAM, SSD, HDD, GPU, PSU, case, CPU cooler, case fan, monitor, keyboard,
mouse and UPS. Category links are application-enforced slugs; the seed saves categories
before products. No other domain collections are created.

Product indexes: unique slug; unique SKU; active/category/priceMinor/slug;
active/brand/priceMinor; active/priceMinor/slug; active/stock; weighted text index
(name 10, brand 5, description 1). Production index migrations remain explicit.

Specs are stored as a Mongoose Mixed document, strictly validated by the matching
category-specific Zod schema in the document validation hook. Both shared and specs
fields are checked on saves, not just on UI input. Do not use updateOne/bulkWrite or
query updates that bypass document validation for catalog writes. Future mutation
repositories must parse the complete product and use validated document saves.
Nullable spec values mean unknown; undeclared fields or mismatched categories fail.

SSD includes capacity/interface/form factor/read speed; HDD capacity/interface/form
factor/RPM; fans size/RPM/airflow/connector; monitor size/resolution/refresh/panel/ports;
keyboard layout/switch/connectivity/backlight; mouse DPI/weight/connectivity/buttons;
UPS VA/watts/topology/outlets. Core PC fields follow the compatibility plan above.
SAMPLE products require SAMPLE name and SKU prefixes. Seed brands and all offer
values are fictional; image paths are restricted to local neutral SVG placeholders.

## Phase 3 compatibility evidence and local builds

CPU adds optional nullable supportedChipsets (string list). Motherboard adds optional
nullable biosStatus (supported/update-required/unsupported), supportedCpuIds (slug list)
and powerConnectors (counted string list). Missing evidence stays unknown. Sample
fixtures declare fictional evidence, not manufacturer certification. BIOS status applies
to the listed CPU IDs; production mixed-version support needs a per-CPU evidence matrix.
RAM capacityGb means total capacity per kit; modules means physical modules per kit.

No builds or compatibilityRules collection is created in this phase. Local storage key
futera-builder-v1 retains validated ID/quantity references and up to ten named snapshots.
Public share URLs contain only those references, never prices, account data or secrets.
Catalog stock remains a server-read snapshot, not an inventory reservation. Current
server quotes do not persist mutations or claim a payable checkout amount.

## Phase 4 collections and indexes

User: UUID _id, unique normalized email, name, nonselected passwordHash, role (customer
by default), sessionVersion, disabled, up to ten addresses and wishlist references.
SavedBuild: UUID _id, ownerId, name, ID/quantity references, nullable shareToken;
ownerId/updatedAt index and unique partial string shareToken index.
Cart: ownerKey _id (user UUID or hashed guest token), references, guest expiresAt TTL.
Order: UUID _id, ownerKey, requestId, immutable line/address/pricing snapshots, method,
COD/unpaid, isSample, current status and timestamped timeline. ownerKey/createdAt index
and unique ownerKey/requestId index. Private order IDs do not grant read authorization.
Coupon: normalized code _id, percent, minimumMinor, maximumDiscountMinor, startsAt/endsAt
(epoch milliseconds), maxUses/used, active and sampleOnly. Usage increments transactionally.
AuthRate: hashed scope/window _id, hits, expiresAt TTL. No raw email/IP/password stored here.

Run npm run db:indexes explicitly before traffic. No index dropping or production seed
occurs automatically. Products.stock is the authoritative transactional quantity in this
phase; a separate inventory ledger/reservation lifecycle is future work. Confirmed COD
orders allocate stock immediately. Cancellation/restock/refund flows are not implemented.
Sample orders retain isSample=true and must never be fulfilled as real commerce.


## Phase 5 administration collections

AdminAudit (`adminaudits`): actorId, action, target, reason, before/after snapshots,
createdAt/updatedAt. Indexes createdAt descending and target+createdAt. App mutations
only insert; changes and audit insert share one transaction. Inventory adjustments record
old/new stock. Order transitions record old/new status and preserve the order timeline.
Role audits contain roles only, never password hashes or session tokens.

AdminSetting (`adminsettings`): string _id, revision, validated Mixed value, timestamps.
`shipping` contains homeMinor, pickupMinor, pickupAddress. `compatibility` contains sockets,
formFactors, and at most 100 additive overrides (2-4 part IDs, warning/error, message).
`mutation-lock` is a singleton transaction serialization record with no secrets.
Product.stock remains the source of stock truth; this adds adjustment audit history, not
warehouse reservations or a financial ledger. Admin order listing filters status; the
existing order indexes are retained. Add workload-specific status indexes when scaling.

## STN-7 two-repository architecture (2026-10-21)
The explicitly requested repository split supersedes the original single-application backend layout. FUTERA remains the Next.js UI root. FUTERA-server is an independent Express/TypeScript API owning MongoDB, authentication sessions, authorization, stock, pricing, coupons, shipping and orders. Frontend Server Actions relay validated HTTP contracts; they do not access MongoDB or calculate authoritative totals.

Authentication uses random opaque, revocable, HTTP-only cookies backed by hashed session tokens in MongoDB. Each request rechecks the user role/session version. Mutations require the exact frontend Origin. Frontend and backend share no secret through public environment variables. The frontend requires APP_URL, API_BASE_URL and COMMERCE_ENABLED; backend configuration is documented in its own .env.example.

Local development: clone FUTERA-server beside FUTERA, install dependencies in both, run the API on port 4000 and Next.js on port 3000. Database seed/index scripts delegate to the backend. Build the backend before running the frontend Playwright suites. Tests use an isolated ephemeral replica set, never Atlas.

Deployment: separate Vercel projects, Node 24, frontend URL as backend APP_URL and backend URL as frontend API_BASE_URL. Commerce stays disabled until Atlas and explicit shipping configuration are available. No live database, OAuth or AI credentials have been supplied. Sample data remains labelled and cannot satisfy a real-inventory requirement.
