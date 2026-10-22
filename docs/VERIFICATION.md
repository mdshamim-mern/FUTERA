# Verification — STN-7 upgrade

Date: 22 October 2026 (Asia/Dhaka).

| Check | Frontend | Backend |
|---|---|---|
| npm run lint | PASS | PASS |
| npm run typecheck | PASS | PASS |
| npm run test | PASS: 78 tests / 7 files | PASS: 159 tests / 11 files |
| npm run build | PASS: Next.js production build | PASS: TypeScript build |

## Browser verification
- `npm run test:e2e -- --workers=2`: 24 passed, 2.0 minutes.
- `npm run test:e2e:commerce`: 8 passed, 3.2 minutes.
- Widths: 360, 768, 1024 and 1440 pixels.
- Verified no horizontal overflow on tested flows, keyboard focus, reduced motion, persistent light mode, ten home sections, public information pages and disabled unconfigured AI controls.
- Commerce tests use an isolated temporary MongoDB replica set: guest cart merge, registration, profile update, COD order creation, public build quote/PDF, private order access, revoked sessions and admin product edits reflected on storefront.
- Backend tests cover every compatibility rule, stock/coupon/pricing transactions, ownership, all admin mutations, OAuth state replay/claims, AI output validation and public review privacy.
- Provider tests use controlled mocks; no Google or Gemini live success is claimed.

## Issues found and resolved
- Missing saved builds returned 500: corrected to 404.
- Invalid URL input escaped Zod refinement: guarded URL parsing.
- Vercel TypeScript resolved Helmet default import differently: explicit named middleware preserves security headers.
- New mobile navbar controls overflowed: compact wordmark and control spacing.
- Nested builder quick-view intercepted clicks after Escape: explicit top-layer dismissal; all responsive flows now pass.
- Restricted network prevented Google Fonts download: production build rerun with authorized network access, passed.

## Limits
Lighthouse performance/accessibility was not measured. Automated accessibility checks do not replace a full WCAG audit. Atlas, real OAuth consent/login and live Gemini generation are not verified because owner credentials/access are unavailable. Public demo accounts are not provisioned. Real product data, licensed product photos and verified retail contact/social details were not supplied; the SAMPLE catalog is not a production sales inventory.

## Deployment
Backend: https://futera-server.vercel.app — health and catalog verified; commerce, Google and AI remain disabled. Frontend: https://futera-mdshamim.vercel.app — Home, catalog, product details, assistant, health and PC Builder returned HTTP 200. Backend build-quote POST with the exact frontend Origin returned HTTP 200. Both repositories are published on main.

