# Implementation status

## Current state — Phase 3 complete (2026-10-21)

Phase 3 adds the PC Builder while preserving the storefront and AGENTS.md. No push,
deployment, auth, checkout, payment processing or new MongoDB collection was added.

### Implemented in Phase 3

- Pure compatibility engine delivered and unit-tested first: all AGENTS.md comparisons,
  conservative unknown results, multiple RAM kits/modules, M.2/SATA quantities, BIOS
  evidence, dedicated EPS/PCIe/12VHPWR counts, optional GPU/display-output checks.
- Server-recalculated subtotal/stock/checks and a semicircle power estimate with 30%
  headroom and upward-rounded PSU recommendation. Stale async responses are ignored.
- /pc-builder with required/optional rows, quantity/change/remove controls, spec chips,
  stock and tooltip statuses, progress, issue-to-row navigation and animated subtotal.
- Desktop two-column layout/sticky glass summary; mobile fixed bar and summary sheet.
  Modal/fullscreen picker with search, sort, brand, price and spec filters, conflict
  visibility toggle and quick-view drawer. Unknown candidates are explicitly unverified.
- Zustand local references, bounded saved/duplicate snapshots, reset, restore, safe
  Zod-validated share URLs, fresh server resolution, WhatsApp link, native Messenger
  sharing/copy fallback and print styling. No external message was sent during testing.
- Sample budget/use-case starters; Editing expands RAM/storage, Office omits GPU,
  AI/ML uses additional RAM and a sample 12VHPWR GPU. Targets are not price promises.
- Performance card reports no available FPS benchmark for fictional hardware and gives
  a qualitative, clearly labelled estimated bottleneck hint. No invented FPS numbers.
- All seven required docs updated; no additional env variables or secrets introduced.

### Phase 3 actual verification

| Command/check | Actual final result |
| --- | --- |
| npm run lint | PASS, exit 0, no diagnostics |
| npm run typecheck | PASS, route types generated, tsc exit 0 |
| npm run test -- --reporter=dot | PASS, 7 files / 83 tests, 16.46s; 64 engine tests |
| npm run build | PASS, compiled 18.5s, TypeScript 12.4s, /pc-builder dynamic route |
| npm run test:e2e | PASS, 20 tests, 1.5m, 360/768/1024/1440px |
| npm run seed -- --dry-run | PASS, 14 categories / 140 products; no database writes |
| git diff --check | PASS |

The builder browser flow selects parts, deliberately exposes a socket mismatch, fixes
it, reaches healthy, saves/reloads and round-trips a shared build. Additional flows
cover picker search/brand/price/spec filters, quick view, RAM quantity conflicts, sample
starters, local duplicate/reset/restore. Existing storefront tests continue to pass.
Horizontal overflow assertions pass at all four widths, including picker and summary.
Reduced motion is enabled in the core flow; existing keyboard focus smoke tests pass.
Mobile/laptop screenshots were visually reviewed in ignored test-results directories.

Browser testing found and fixed a fullscreen picker translation bug (production CSS
optimization retained Tailwind translation variables) and a quick-view focus-restoration
bug that could dismiss the parent picker. No force-click or hidden-overflow workaround
was used. Sticky summaries scroll independently when taller than the viewport.

### Phase 3 limitations / unverified

- No MongoDB credentials: real Atlas reads, persisted sample evidence/indexes and live
  inventory integration were not tested. Sample mode and server-resolution unit mocks
  were tested. A quote is not a reservation or a payable checkout amount.
- No real-device, non-Chromium or screen-reader certification. Actual WhatsApp/Messenger
  delivery and a physical printout were not tested. Messenger availability depends on
  the device's share chooser; the copy-link fallback remains available.
- No new Lighthouse measurement in Phase 3. Phase 2 figures below are historical and
  must not be interpreted as current builder measurements.
- npm audit reports 5 high findings in the development ESLint/braces dependency chain.
  Its proposed force fix downgrades eslint-config-next to 14.2.35; that incompatible
  downgrade was not applied. No claim is made that this audit passes.
- Picker loads at most 1,000 active products; production scale needs pagination. Exact
  manufacturer BIOS, shared-lane, physical-clearance and thermal evidence needs curation.
  See PC_COMPATIBILITY_RULES.md for the explicit boundaries of the implemented checks.

Phase 3 is complete. Stop and await the next phase prompt.

## Historical Phase 2 completion (2026-10-21)

Phase 0/1 foundation is preserved. AGENTS.md and existing Git history are unchanged.
Phase 2 adds the storefront and component catalog without deploying or pushing.

### Implemented

- Category/Product Mongoose models with strict shared Zod validation and category-
  specific specs for CPU, motherboard, RAM, SSD, HDD, GPU, PSU, case, CPU cooler,
  case fan, monitor, keyboard, mouse and UPS. Null means an unknown specification.
- Unique slug/SKU and category, brand, price, stock and weighted text indexes.
- 140 deterministic fictional SAMPLE products (10 per category), 14 categories,
  original neutral SVG placeholders and no real product/price/stock claims.
- Idempotent seed CLI with validation-only dry run; real writes require an explicitly
  configured non-production `_sample` database. Non-sample collisions are protected.
- Explicit sample/MongoDB catalog source, validated server DTOs and no silent fallback.
- Home hero, per-component budget presets, use-case tabs, featured components, sample
  builds with server-summed illustrative subtotals, trust strip, text brand strip, FAQ.
- URL-driven category/search/brand/price/stock/socket/RAM-type filters, sorting and
  pagination. Desktop sidebar, mobile sheet, product cards, skeleton/error/empty states.
- Product detail gallery, specs table and functional cart-preview/build-shortlist
  actions. HTTP-only cookies contain references only; server revalidates products and
  stock and recalculates displayed values. No checkout, reservation or compatibility claim.
- Up to three compared products in a shareable URL; catalog picker persists references
  across pagination and updates when a product is removed from comparison.

### Final verification

| Command/check | Actual result |
| --- | --- |
| npm run lint | PASS, exit 0 |
| npm run typecheck | PASS, generated route types and tsc exit 0 |
| npm run test | PASS, 4 files / 15 tests, final run 50.73s |
| npm run build | PASS, compiled in 42s, TypeScript 11.1s |
| npm run test:e2e | PASS, 12 tests at 360/768/1024/1440px, final run 1.1m |
| npm run seed -- --dry-run | PASS, 14 categories + 140 products validated; zero writes |
| Production catalog HTTP | 200 on local production server |
| Git diff whitespace | PASS; AGENTS.md unchanged |

Browser coverage: Home accessibility smoke checks; browse -> URL filters -> product;
correct price sorting/availability count; gallery selection; cart save/reload/remove;
out-of-stock cart disabling; build shortlist; comparison cap, pagination persistence,
remove, empty results and missing-product UI/noindex. Home, listing, detail and compare
were checked for horizontal overflow at each test width. Home/catalog screenshots are
in ignored test-results directories; mobile/desktop visual layouts were reviewed.

Validation fixes included matching native selects by accessible role, handling Next's
streamed not-found UI (HTTP 200 can precede notFound; duplicate noindex tags may appear),
and removing product-card aria-label overrides that excluded visible label text.

### Measured Lighthouse results

Final measurements on the local production server in sample mode, Lighthouse 13.5.0,
Chrome for Testing 156.0.8078.4. Default mobile emulation: 412x823, DPR 1.75,
simulated throttling, 4x CPU slowdown, 150ms RTT, 1638.4 Kbps throughput. One final
navigation audit per route after the accessible-name correction; not field data.

| Route | Performance /100 | Accessibility /100 | LCP | Total blocking time | CLS |
| --- | --- | --- | --- | --- | --- |
| Home `/` | 51 | 100 | 3.9s | 2200ms | 0 |
| `/products` | 62 | 100 | 3.9s | 1330ms | 0 |

Raw final reports: `test-results/lighthouse-home.json` and
`test-results/lighthouse-products.json` (ignored by Git). The earlier diagnostic
runs scored 58/100 and 62/100 performance respectively; use the final scores above,
not the best score. Main-thread blocking remains the main performance limitation;
these results do not establish a high-performance production launch baseline.
The accessible-name mismatch found in the first audit was fixed. A Lighthouse
accessibility score of 100 does not replace manual assistive-technology testing.

Reproduce after `npm run build` and `npm run start`: run Lighthouse against each
URL with `--only-categories=performance,accessibility --output=json`, default mobile
settings and a Chromium executable configured through CHROME_PATH. Keep other
workloads idle; scores vary with the local machine and run conditions.

### Not verified / deferred

- No MongoDB credentials or local env files are configured. Atlas connectivity,
  actual writes/idempotent reruns, deployed indexes, MongoDB text-search behavior and
  query plans were not integration-tested. Mongoose validators/index definitions and
  sample-mode behavior were tested. Fixture substring search differs from Mongo text
  phrase search in linguistic/punctuation handling, as documented in README.md.
- No live checkout/payments, inventory reservation, auth/admin or compatibility engine.
  Preview selections are not a finished commerce cart or a compatibility-checked build.
- No cross-browser, real-device or screen-reader certification. No deployment/push.
- Existing Phase 1 development-tooling advisories were not re-audited in Phase 2;
  no production dependency was added. Playwright still logs the harmless runner
  NO_COLOR/FORCE_COLOR warning. Google fonts still require network at build time.

Owner decisions for later phases remain auth/payment providers, shipping/tax rules,
inventory source, guest checkout, translation scope and hosting/Atlas region.
Stop here and await the next phase prompt.

## Preserved Phase 0/1 history

Initial audit found only AGENTS.md on clean main with two commits (9af8cb4, efd567e),
not one. Node 24.15.0, npm 11.12.1 and Git 2.54.0.windows.1 were available. Phase 1
created the root Next.js application, ten requested shadcn primitives, original brand,
Dark Glass system, validated env, lazy DB helper, liveness route and baseline tests.
Its five conventional commits ended at 7b7de3d. See Git history for its exact records.
