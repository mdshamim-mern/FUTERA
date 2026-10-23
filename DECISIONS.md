# Decisions

- 2026-10-21: Preserve the existing main history (two commits) and AGENTS.md verbatim.
- Use the requested Next.js App Router stack in the repository root, not Sites hosting.
- Use npm and commit its lockfile for reproducible installs; Node 24 is the baseline.
- Server Components by default; client code only for interactive primitives and errors.
- Use Tailwind CSS variables for Dark Glass and next/font for display, UI and Bangla.
- Use original SVG geometry for the identity and concept PC illustration; no product images.
- Home CTAs point to honest in-page foundation information until feature routes exist.
- Do not install Auth.js, RHF, Zustand or Motion until their features require them.
  Reduced-motion CSS covers the foundation; no decorative animation is needed.
- Database configuration is optional for the foundation; database use requires both
  URI and database name. Liveness does not test Atlas connectivity.
- Seed command will explicitly report zero SAMPLE records until schemas exist.
- Authentication provider, payments, shipping, tax, inventory source and deployment
  target remain owner decisions. Vercel + Atlas is a proposal, not a deployment.

## Dependency verification

The foundation uses Next.js 16.4.2, React 19.3.0 and Tailwind 4 from the official
scaffolder. Runtime audit is clean. See IMPLEMENTATION_STATUS.md for the known
lint-tooling advisory and all actual validation results.

## Phase 2 decisions

- Provide 10 fictional products in each of all 14 categories (140 total), not real
  brand/model claims. Sample prices and stock enable filter tests with explicit labels.
- Default to explicit sample data source; MongoDB mode never falls back silently.
- Use native GET forms and URL parameters for filters/sort/pagination. Page size 12.
- Declare MongoDB text search index and use phrase search. Fixture literal search is
  documented as a demo approximation, not a MongoDB search emulator.
- Use validated Mixed specs to share one strict Zod contract with seed and read DTOs;
  document-save hooks reject category mismatch. Query-update mutations are prohibited.
- Build budgets are labelled per-component filters. Featured sample build subtotals
  are sums of current server data; compatibility has not been evaluated.
- Implement add-to-cart/build as persistent preview references, with server-side
  stock checks and read-time price recalculation. Do not imply checkout or reservations.
- Comparison picker uses browser local storage for references only; comparison view
  is URL-addressable and server-resolved, bounded to 3 unique products.
- Brand marquee is static wrapping text to preserve motion/accessibility and avoid
  implying partnerships with real manufacturers. No new production packages added.

## Phase 3 decisions

- Implement and test the pure engine before the interactive builder. Unknown is not
  compatible; healthy requires all required categories, all checks ok and sufficient stock.
- Install Zustand only for builder state. Native CSS animates the authoritative total
  with a short entrance transition; reduced-motion disables it. No Motion dependency
  is needed for this interaction, and no interpolated number is presented as a quote.
- Add nullable/optional compatibility evidence to existing catalog schemas. Fictional
  sample evidence enables deterministic healthy/conflicting test builds; legacy records
  without evidence remain unknown.
- Persist IDs/quantities only, validate shared JSON with Zod and re-resolve all values
  server-side. Bound references to 24, quantities to 8 and saved snapshots to 10.
- Default picker hides known conflicts but labels incomplete checks unverified, allowing
  incremental assembly without claiming that unknown options are compatible.
- Budget chips are target scenarios and may exceed the target with available sample
  parts. Editing adds RAM/storage; Office uses integrated graphics; AI/ML adds RAM and
  a sample GPU with 12VHPWR. None is a real price or workload performance claim.
- Do not fabricate FPS or numeric bottleneck percentages for fictional hardware.
  Show an unavailable FPS estimate and a clearly labelled qualitative bottleneck hint.
- WhatsApp uses its documented click-to-chat link format (https://faq.whatsapp.com/5913398998672934).
  Messenger uses the device share chooser or copy fallback, avoiding an invented app ID
  or unsupported automatic send. Real recipient delivery is not part of browser tests.
- npm audit reports five high findings in the existing ESLint/braces transitive chain.
  The suggested force fix downgrades eslint-config-next to 14.2.35; do not apply that
  incompatible downgrade to Next 16 automatically. Track upstream tooling remediation.

## Phase 4 decisions

- Use requested Auth.js credentials with native crypto scrypt instead of another hashing
  package. Recheck users/roles on the server; sessionVersion provides logout revocation.
- Keep commerce off until replica-set MongoDB, strong secret and explicit fees/pickup
  address are configured. HTTP is permitted only on localhost/127.0.0.1 for testing.
- Use MongoDB-backed per-account and global auth throttles, without trusting forwarded
  client IP headers. Additional trusted-edge abuse protection remains launch work.
- Native Next/React forms and Server Actions are sufficient here; no RHF/state library
  added for checkout. Zustand remains limited to the builder.
- Use owner-bound signed quote snapshots plus transaction-time recalculation; no client
  total is authoritative. COD means an unpaid persisted order, never payment success.
- Keep bKash/Nagad/Card disabled until a real adapter, credentials and sandbox verification
  are supplied together. There are no fake provider endpoints or simulated successes.
- Use native Print / Save as PDF for branded quotes; qrcode supplies the actual encoded
  share URL. Public build sharing is explicit and revocable, with no owner personal data.
- Retain the MIT license and pinned source attribution for the community Bangladesh
  administrative dataset. It needs delivery-coverage review before a live launch.
- Test against isolated real MongoDB 8.2.6 replica sets, including authorization and atomic
  order writes. Generated test secrets are never committed; all orders remain SAMPLE.

Phase 4 dependency note: Auth.js is next-auth 5.0.0-beta.32, pinned by package-lock.json;
review upstream stability/security updates before launch. The final production-only
npm audit reported zero advisories. The previously reported five development ESLint
chain findings remain separate; no force downgrade was applied.


## Phase 5 decisions

- Next.js 16 names middleware `proxy.ts`; use its Node runtime and keep authorization
  at every server entry point. JWT roles never authorize administration.
- Product delete means archive (`active=false`), preserving historical order snapshots.
  Slugs cannot be renamed; stock changes have a separate audited adjustment form.
- Inventory remains authoritative on Product.stock. Audit records capture administrator,
  reason and before/after values; automatic COD allocation remains in order transactions.
- Audit data has no application edit/delete interface. Database operators retain technical
  privileges; use least-privilege credentials/backups or external WORM retention if needed.
- No self role change. Role edits serialize with all admin operations and revoke target
  sessions. First admin provisioning is a private database-operator procedure.
- Coupon deletion means deactivation. Redeemed use counts cannot be reset in the UI.
- Shipping database configuration overrides env initialization, with fees revalidated at
  final order creation. One global lock is appropriate for this initial store scale.
- Compatibility overrides may add warning/error only. They cannot declare a conflicting
  or unknown combination safe. Reference vocabularies do not rewrite existing specs.
- Sales cards display booked COD order value, separating SAMPLE and live orders; they do
  not claim collected revenue. All currently supported orders remain unpaid.
- Image storage proposal is S3-compatible presigned upload + validated raster derivatives
  + CDN. Until provider/region/CDN are selected, only original neutral placeholders are used.

## STN-7 two-repository architecture (2026-10-21)
The explicitly requested repository split supersedes the original single-application backend layout. FUTERA remains the Next.js UI root. FUTERA-server is an independent Express/TypeScript API owning MongoDB, authentication sessions, authorization, stock, pricing, coupons, shipping and orders. Frontend Server Actions relay validated HTTP contracts; they do not access MongoDB or calculate authoritative totals.

Authentication uses random opaque, revocable, HTTP-only cookies backed by hashed session tokens in MongoDB. Each request rechecks the user role/session version. Mutations require the exact frontend Origin. Frontend and backend share no secret through public environment variables. The frontend requires APP_URL, API_BASE_URL and COMMERCE_ENABLED; backend configuration is documented in its own .env.example.

Local development: clone FUTERA-server beside FUTERA, install dependencies in both, run the API on port 4000 and Next.js on port 3000. Database seed/index scripts delegate to the backend. Build the backend before running the frontend Playwright suites. Tests use an isolated ephemeral replica set, never Atlas.

Deployment: separate Vercel projects, Node 24, frontend URL as backend APP_URL and backend URL as frontend API_BASE_URL. Commerce stays disabled until Atlas and explicit shipping configuration are available. No live database, OAuth or AI credentials have been supplied. Sample data remains labelled and cannot satisfy a real-inventory requirement.

## Provider and content decisions
Use Google OIDC with jose signature verification and server-side opaque sessions. Use Gemini REST without an additional SDK; provider errors never become simulated answers. Require sign-in and database quotas for AI requests. Keep sample disclosures until the owner supplies verified retail data. Contact links use the user-supplied GitHub project; do not fabricate phone numbers, offices or social identities.


## Reference catalog update — 23 October 2026

The owner chose an informational real-model catalog with no unverified sales. Reference entries cannot carry retail inventory or an offer; zero internal sentinels are never displayed as free prices. Manufacturer facts are linked per record; unknown compatibility data stays null. Original category diagrams replace fictitious product imagery without pretending to be licensed photographs. No customer opinions or activity are fabricated.

## 23 October 2026: explicit demo-store authorization
Illustrative demo prices/stock/reviews/orders are permitted in an isolated demo database with surface disclosures and per-record demo flags. Hardware specs and test outcomes are never fabricated. Generic licensed editorial photographs must not impersonate model-specific photography. Keep the existing live mode honest while asset/credential gates remain unmet. Safe independent UI/content improvements ship separately.
