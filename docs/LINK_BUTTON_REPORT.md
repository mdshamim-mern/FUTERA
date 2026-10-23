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

