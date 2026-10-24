# STN-7 verification checklist

Updated 23 October 2026. Checked means observed/tested, not merely requested. This is a migration, not a production-readiness certificate.

- [x] Both repository instruction files updated for the owner-authorized demo-store policy.
- [x] Dedicated backend already deployed; correct frontend OAuth callback retained.
- [x] Public contact and social channels supplied by owner.
- [x] Ten original blog articles, list/detail routes and Terms implemented.
- [x] Licensed attributed editorial photo acquired; model-specific images remain missing (ASSETS.md).
- [ ] Run and record current lint/typecheck/test/build in both repos.
- [x] Public links-and-buttons: 4 passed (2.3m); reference catalog: 3 passed (31.2s). Coverage and exclusions in LINK_BUTTON_REPORT.md.
- [ ] Verify latest deployment and rerun mobile Lighthouse; previous scores are not this revision's measurements.
- [ ] 80+ verified model catalog with three accurate photos each. Blocked on model-specific licensed photos and remaining spec research, per owner-invoked stop-on-missing-assets requirement.
- [ ] Demo pricing/stock/review seed and six months of isolated demo orders; do not convert uncertain hardware specs into fabricated complete data.
- [ ] All target public UI copy migrated. Source regex currently finds 146 occurrences of banned phrases (includes fixtures/security/schema text; not a rendered-UI count). Keep honest unavailable-state messaging until activation.
- [ ] Atlas dedicated user, database URI, session secret, indexes and restricted network configuration verified. Password creation/submission is an owner handoff.
- [ ] User/manager/admin isolated demo accounts, demo autofill, manager policy and role-specific live tests.
- [ ] Real Google OAuth, optional Facebook and Gemini provider checks. Credentials/consent remain pending.
- [ ] Newsletter persistence, database-backed testimonials/statistics, rating filters and three AI features.
- [ ] Live demo cart/COD/pickup and dashboard mutation tests; isolated tests do not prove Atlas deployment.
- [ ] Complete all-page interaction inventory, including guarded roles and forms. No exhaustive claim from the public subset.

The reference catalog stays enabled during the blocked data migration so the live app does not silently claim working commerce. New pages and navigation fixes can ship independently.


## 24 October 2026 continuation

- Frontend lint/typecheck/build passed; 80 unit tests passed. Backend lint/typecheck/build passed; 167 tests passed.
- Responsive catalog/gallery flow: 3 passed (360/768/1440). Initial two cold-start assertions failed while the loading skeleton was visible; waiting for the actual page heading fixed the test synchronization.
- Public interaction inventory: 4 passed at 360/1440 in light/dark. This does not certify every authenticated/admin control.
- Five licensed photographs added across Ryzen 9 7950X (three) and Crucial P3 Plus 2TB (two). Four sourced market price observations; these do not create inventory or purchase offers. Remaining model photos and prices are incomplete.
- Atlas futera_demo: inserted 20 sourced products and 7 categories without overwriting records; created indexes. Actual API registration/account access returned 200, anonymous account 401, customer admin mutation 403, logout then account 401. Temporary verification users were removed.
- Local AUTH_SECRET was generated, account configuration repaired and checkout kept disabled. Secrets were not committed. Vercel environment activation is not yet verified.
- Both real Gemini modes returned 502. Model list works, but model availability/generation requires further diagnosis. OAuth, full commerce activation, 80-product expansion, demo credentials and exhaustive STN-7 completion remain pending.

## 24 October checkpoint
Verified: responsive glass Login/Register/Navbar/Footer/About/AI/Compare redesign deployed; two-repo lint/typecheck/test/build; 80 frontend + 170 backend unit/integration tests; bounded public 360/1440 dark/light audit and 4 commerce/admin browser tests. Google live login was verified previously. Actual Atlas demo order transaction was verified locally against futera_demo.
Pending: complete licensed model galleries/prices/categories, live checkout and demo autofill activation, live Gemini feature verification after Vercel step-up/model change, complete dashboard pagination audit and constrained admin demo credentials. Public checkout remains disabled until the documented runtime configuration is activated and live-tested.
