# Guides, support and contact design refresh

25 October 2026.

- Building Guides now has a glass workspace header, three topic cards, section navigation, a sticky desktop contents panel and readable guide articles with practical next-step checklists.
- Help & Support now has topic shortcuts, searchable FAQ answers, native keyboard-accessible disclosure controls, clear/no-result states and direct help/issue-tracker links. Search runs locally and sends no question or personal data.
- Contact now has separate email/call cards, four labelled social channels and a location panel linking to a Google Maps area search. It preserves the owner's supplied contact details and the distinction between a contact location and a retail showroom. No response-time or opening-hours claims were added.
- All three pages use the existing light/dark design tokens, shared radii, responsive glass surfaces and visible focus styles. No backend, account, catalog, order or payment behavior changed.

Verification includes lint, typecheck, 84 unit tests, production build and browser interaction/layout checks at 360/768/1024/1440px in both themes. The tracked browser test is `tests/current/resources-design.spec.ts`; it checks guide anchors, FAQ search/clear/empty states, keyboard expansion, contact link destinations, cross-page navigation and horizontal overflow. External email, telephone, social and map destinations are checked as links; no calls, messages or issue submissions are sent. Screenshots stay in ignored test-results folders.
