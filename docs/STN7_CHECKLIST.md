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

