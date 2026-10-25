# Product, AI assistant and PC Builder workspace refresh

25 October 2026.

## Changes

- Product details now uses a framed gallery with an image counter and selectable thumbnails, a separate glass price/action panel, labelled specification highlights, section navigation and related cards with photos and prices. Source attribution, review data and demo disclosures are retained. Cart and shortlist actions use their existing server actions.
- AI Help now has a shared workspace header, distinct recommendation/support panels, editable example prompts, full-width submission controls, pending feedback and framed error/answer states. Prompts fill the question without sending it automatically. Existing provider requests and authorization are unchanged.
- PC Builder now has category icons, clearer required/optional labels, consistent selected-part cards, a two-step budget/workload panel, progress percentage, a glass summary and styled power/health panels. Existing compatibility rules, persistence, quotes, sharing and cart actions are unchanged. Reduced-motion preferences are respected.

## Verification

Lint, typecheck, production build and all 84 unit tests passed. The first unit run encountered a worker startup timeout; the repeat completed all nine files successfully.

Browser checks cover 360/768/1024/1440px in light and dark themes: gallery mouse/keyboard switching, product section navigation, AI prompt filling and native question validation, builder picker selection/removal, mobile summary opening/closing, desktop progress and horizontal overflow. The production frontend build is tested locally against the deployed public catalog/quote API with anonymous browser contexts; no accounts, carts or orders are created. AI provider calls are not exercised by this design check. The temporary test server uses the deployed frontend origin for backend origin validation; production security rules were not changed.

The tracked interaction test is `tests/current/workspace-design.spec.ts`. Screenshots remain in ignored test-result directories. This check does not certify every business flow or every possible network state.
