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
