# Links and buttons verification

23 October 2026. Public tests implemented in tests/e2e/links-and-buttons.spec.ts; npm run test:e2e:links. Result: 4 passed (2.3 minutes), 360/1440 in light/dark. Reference catalog suite: 3 passed (31.2 seconds), 360/768/1440. Interrupted earlier runs are not counted.

## Inventory and assertions

- Collect internal destinations from Home, Blog, Terms, Contact, Guides, Support and Products; assert successful HTTP responses (redirects followed). This does not claim every target's buttons were clicked.
- At 360 and 1440 widths in light and dark: inspect page headings, horizontal overflow, HTTPS social hrefs, new-tab target and noopener/noreferrer.
- Explicit interactions: article open/back/contents, theme toggle, profile menu/login/register link, mobile drawer login and dismissal, cart dialog open/close, three use-case tabs and FAQ open/close.
- Fail on page exceptions, console errors and failed network requests, excluding intentional browser navigation cancellations (ERR_ABORTED).
- Existing catalog/builder/commerce suites retain more detailed interactions. New suite does NOT prove full authenticated role coverage, manager behavior, all forms, OAuth, AI or all destructive admin operations.

## Findings addressed

- Gaming CTA pointed into an empty GPU category in the reference deployment: now chooses an available processor category until GPU records exist.
- Social links did not explicitly open a safe new tab: target and rel fixed in Footer and Contact.
- Missing Terms/Blog destinations: new routes and footer links added; Guides retained.
- Login/Register were only in a profile dropdown: now present in desktop/mobile navigation too.

## Copy migration inventory

Case-insensitive source regex across src: before 146, after 146. This includes fixtures, schema validation, comments and conditionally rendered text; it is NOT a count of visible production labels. No claim of zero banned phrases. Honest existing reference/fixture disclosures remain until licensed catalog data and demo services replace them. Removing those disclosures alone would misrepresent the running deployment.

## Remaining blockers

Atlas user/password submission, provider credentials/consent, isolated demo role accounts, exact-model photos and full catalog migration. Current public subset must not be described as an exhaustive all-link/all-button pass.


## 24 October 2026 continuation

- Frontend lint/typecheck/build passed; 80 unit tests passed. Backend lint/typecheck/build passed; 167 tests passed.
- Responsive catalog/gallery flow: 3 passed (360/768/1440). Initial two cold-start assertions failed while the loading skeleton was visible; waiting for the actual page heading fixed the test synchronization.
- Public interaction inventory: 4 passed at 360/1440 in light/dark. This does not certify every authenticated/admin control.
- Five licensed photographs added across Ryzen 9 7950X (three) and Crucial P3 Plus 2TB (two). Four sourced market price observations; these do not create inventory or purchase offers. Remaining model photos and prices are incomplete.
- Atlas futera_demo: inserted 20 sourced products and 7 categories without overwriting records; created indexes. Actual API registration/account access returned 200, anonymous account 401, customer admin mutation 403, logout then account 401. Temporary verification users were removed.
- Local AUTH_SECRET was generated, account configuration repaired and checkout kept disabled. Secrets were not committed. Vercel environment activation is not yet verified.
- Both real Gemini modes returned 502. Model list works, but model availability/generation requires further diagnosis. OAuth, full commerce activation, 80-product expansion, demo credentials and exhaustive STN-7 completion remain pending.
