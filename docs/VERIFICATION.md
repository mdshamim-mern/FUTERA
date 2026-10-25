# Verification — STN-7 upgrade

Date: 23 October 2026 (Asia/Dhaka).

| Check | Frontend | Backend |
|---|---|---|
| npm run lint | PASS | PASS |
| npm run typecheck | PASS | PASS |
| npm run test | PASS: 79 tests / 8 files | PASS: 165 tests / 12 files |
| npm run build | PASS: Next.js production build, 24 routes | PASS: TypeScript build |

## Browser verification

- npm run test:e2e -- --workers=2: 24 passed (2.0 minutes).
- npm run test:e2e:commerce: 8 passed (2.5 minutes).
- npm run test:e2e:reference -- --workers=2: 3 passed (38.7 seconds).
- Main/commerce widths: 360, 768, 1024 and 1440 pixels. Reference widths: 360, 768 and 1440.
- Verified tested pages have no horizontal overflow, visible keyboard focus, reduced motion and theme persistence.
- Reference flow verifies ten home sections, 12/8 pagination, CPU + AMD + AM5 filtering, public source-linked details, no purchasable zero-price offer and disabled checkout.
- Commerce tests use an isolated temporary MongoDB replica set, not Atlas: guest merge, registration, COD unpaid order, ownership/session guards and admin edits reflected on storefront.
- Backend tests cover compatibility rules, stock/coupon/pricing transactions, every admin mutation, OAuth state/claims, AI schema validation and reference-product order rejection.
- Provider tests use controlled mocks; live Google and Gemini success is not claimed.

## Live Lighthouse

Lighthouse 13.5.0, mobile simulated throttling, Playwright-installed Chromium, single sequential runs on the public production URLs. Scores are lab measurements and can vary; they are not field Core Web Vitals or a full manual WCAG audit.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 72 | 100 | 100 | 100 | 2.6 s | 1120 ms | 0.001 |
| /products | 75 | 100 | 100 | 100 | 2.6 s | 920 ms | 0 |

Earlier sample-deployment baseline: Home performance 25 (CLS 0.318), Products 59. Hero streaming, reserved loading space, optional font preload removal and first-card image preload were applied. Remaining performance work includes reducing main-thread JavaScript blocking time. Local raw reports: .artifacts/lighthouse-home.json and .artifacts/lighthouse-products.json (ignored by Git).

## Production verification

Frontend production revision 77c4a34 and backend revision 8fe66d6 were deployed. Backend redeployment GeBYgSKGbHGotJq45QiEa4XRQiCv is Ready and assigned to futera-server.vercel.app. CATALOG_SOURCE=reference and CHECKOUT_ENABLED=false are saved for Production. Public API returned 20 records, 12 on page one, all returned records marked reference. Live Home shows real model names, manufacturer links, no invented prices and owner contact details.

Production /v1/config reports commerceEnabled=false, checkoutEnabled=false, googleEnabled=false and aiEnabled=false. Atlas login succeeds, but a fresh database-user check shows no dedicated futera_app user. Live database-dependent workflows, demo credentials, Google login and Gemini responses remain unverified. No licensed manufacturer photos or verified retail inventory were supplied. These limits are explicit in SUBMISSION.md and STN7_GAP_REPORT.md.

## Current production audit — 25 October 2026

This dated section supersedes the reference-only/disabled-service statements above.

| Check | Actual result |
| --- | --- |
| Frontend lint / typecheck | Exit 0 |
| Frontend npm test | 80 passed, 8 files; 115.05s |
| Frontend production build | Exit 0; 24 pages generated |
| Backend lint / typecheck / build | Exit 0 |
| Backend tests | 174 passed, 14 files; 66.94s |
| Live browser audit, 360px and 1440px | 2 passed, 2.9m |
| Live demo admin | Login and all 8 reports returned 200; all 8 mutation operations returned 403 |
| Customer admin access | 403 |
| Live catalog | 20 models, 2 pages, all positive demo prices and real photo paths |
| Actual Gemini provider | Recommendation and support answers returned in 2.918s and 2.232s |
| Live demo COD API | Confirmed/unpaid order, idempotent retry; anonymous read 404 |

The live browser audit checks both autofill buttons and successful logins, role separation, customer record filtering, all eight admin views, product filtering, read-only mutation controls, loaded images, catalog pagination, public details and enabled cart actions. The audited layouts had no horizontal overflow. An initial image assertion checked lazy images too early; scrolling each image into view and waiting for loading fixed that test. Its complete rerun passed both sizes.

An initial frontend test run failed to start multiple fork workers in this Windows environment. Single-worker thread mode passed and is now the default configuration. No failed run is counted as a pass.

Current catalog pricing: eight retailer observations inspire demo amounts; twelve are labelled illustrative. Existing 7950X retains its original sourced metadata and current stock. Three SSD capacities use explicitly captioned P3 Plus family photography. This is an educational demo, not a verified retail feed or physical fulfillment service. Public admin access is read-only and excludes private customer data; owner admin mutation tests use an isolated local fixture.

Vercel deployments verified successful through GitHub commit statuses: frontend d6d8f63, backend fe25dc9. Production endpoints and product assets returned 200. Service secrets were not committed. No new Lighthouse measurement was made during this audit; earlier scores above are historical.

Live mobile COD browser follow-up: 1 passed (32.6s). Product add → cart → reviewed quote → confirmed unpaid demo COD order → account order history passed. Anonymous browser could not see the order confirmation. Only invented demo details were used; no payment was made.

Live mobile Gemini UI follow-up: 1 passed (35.2s). Both recommendation and support forms returned actual provider answers; recommendations linked to catalog products. Form error states were absent and no horizontal overflow was found at 360px. The initial global alert assertion included Next.js's route announcer; assertions were scoped to the actual forms and the complete rerun passed.

Isolated commerce regression: 8 passed (2.8m) across 360/768/1024/1440. Every size passed guest build/cart merge, registration, private unpaid COD order, session revocation, saved build sharing/QR/print, owner-admin product edit reflected on the storefront, and protected action replay. These tests use an ephemeral local fixture, not production owner data.
