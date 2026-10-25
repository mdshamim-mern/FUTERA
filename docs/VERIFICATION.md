# FUTERA release verification

25 October 2026, Bangladesh time. Actual observed results for the current sourced-catalog release; earlier reports are historical.

## Acceptance checks

| Check | Result |
| --- | --- |
| Frontend lint/typecheck/build | Exit 0; 24 pages generated |
| Frontend unit tests | 84 passed, 9 files |
| Backend lint/typecheck/build | Exit 0 |
| Backend unit/integration tests | 176 passed, 15 files |
| Sourced-catalog browser matrix | 4 passed at 360/768/1024/1440, 2.7m |
| Short-phone regression | 1 passed at 360x640, 30.8s; three duplicate viewport cases intentionally skipped |
| Commerce/owner-admin regression | 8 passed at 360/768/1024/1440, 3.7m |
| Final live mobile smoke | 3 passed, 2.1m |
| Live linked routes | 74 destinations checked; zero failures |
| Deployed product media | 49 image URLs checked; zero failures |

The sourced-catalog matrix exercises Home sections and hero dimensions, real-ID starter configurations, GPU selection, whole-build cart, three-field filters, sorting, product galleries, registration, account chart/table and address success feedback. Short-phone checks include hero content inside the 60–70% viewport band, visible keyboard focus, reduced motion and no horizontal overflow. Commerce tests include registration/cart merge, unpaid COD, private-order isolation, session revocation, saved-build sharing/QR/print, owner-admin product edit reflected in the storefront and protected action replay.

Live smoke exercises customer/admin autofill, role separation, all eight admin views, filters, read-only controls, loaded images, pagination, details, actual cart-to-COD order success/account history and both real Gemini forms. Orders stay unpaid; invented demo addresses only. No payment success or delivery is simulated.

## Current catalog and data migration

20 active sourced-price models cover all 14 component categories with 49 credited photographs. All active marketPrice.kind fields are observed; zero illustrative price records remain active. Ten unverified older models were archived in a transaction after every media URL was verified. Existing stock counts and order history were preserved and a local before-snapshot retained. Six model sources have one photograph; galleries are not padded with duplicate or wrong-model images. See [provenance](../PRODUCT_MEDIA_SOURCES.md).

Home now uses current catalog records rather than fixed sample IDs. Featured plans are populated and open actual configurations; GPU links have a populated category. Starters show the actual subtotal and over-budget notices. Known conflicts and insufficient stock block whole-build cart; warnings/unknowns remain visible and are never relabelled healthy. Exact unverified GPU power remains unknown rather than copied from an inconsistent retailer field.

## Accounts and authorization

Owner explicitly approved making their existing Google account an owner administrator. The transaction was audited, session version incremented and previous sessions revoked. Verification found one enabled private owner administrator and one public read-only demo administrator. The owner must sign in with Google again to use the new role; no private password or session was published or impersonated. Normal write workflows were verified with isolated owner-admin fixtures. All eight public demo admin mutations returned 403; customer admin access returned 403 and anonymous private-order access 404.

## Lighthouse

Lighthouse 13.5.0, headless Playwright Chromium, default simulated mobile settings, public production URLs. Each score is a lab observation and may vary; it is not field Core Web Vitals or a full manual WCAG certification. Performance was measured after the font/offscreen-layout optimizations with no competing builds/tests.

| Page / dark mode | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 87 | 100 | 100 | 100 | 2.5 s | 370 ms | 0 |
| /products | 90 | 100 | 100 | 100 | 2.3 s | 340 ms | 0 |

Separate light-mode accessibility: Home 100, Products 100. An inactive-tab contrast issue measured 4.21:1; replacing the opacity-based color with the shared muted-text token fixed it and the light Home audit was rerun. Checked text/button token pairs exceed 4.5:1 in both themes.

Earlier measured performance was Home 71 / Products 83, then 82 / 84 after offscreen layout and prefetch changes. Final font loading avoids blocking text paint. Raw reports and browser traces remain in ignored .artifacts, playwright-report and test-results directories.

## Practical limits

This is an educational demo with reference prices and demonstrative stock, not a real retail inventory/fulfillment business. Public demo administrator access is intentionally read-only; Google is the configured social-login provider. Every possible form state or external social-provider login wall was not exhaustively certified. The listed flows and routes are the actual tested scope. No secrets were committed; only .env.example is tracked in each repository.
