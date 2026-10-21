# Implementation status

## Current state — Phase 2 complete (2026-10-21)

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
