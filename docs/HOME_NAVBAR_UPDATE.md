# Home and navigation refresh

25 October 2026.

The former hero combined a fixed desktop height with forced headline breaks and a tall illustration. Its content could extend into the next section on short desktop screens. The replacement uses an intrinsic grid, viewport-aware typography and an illustration panel whose header, artwork, detail card and caption remain in normal document flow. The standard hero stays in the 60–70% viewport band, with no clipped controls. Home category, budget and starter surfaces share a subtle glass treatment; source-backed product data and functional links are preserved.

The sticky navigation now has five public primary routes, an Explore dropdown and one prominent logged-out **Log in** button. Registration is reached through **Create an account** on Login; Register links back to Login. Signed-in visitors retain Saved builds and their protected profile/account/admin menu. Mobile uses a compact control row and a labelled drawer. Theme/cart controls remain keyboard accessible.

Actual checks:

- `npm run lint`, `npm run typecheck`, `npm test` (84 tests) and a fresh `npm run build` passed. A stale local CSS build cache was detected by geometry tests and cleared before the successful clean build.
- Home design tests: 4 cases passed, checking both themes across the default 360/768/1024/1440 projects plus 360×640, 1280×720 and the reported 1366×768 viewport. Headline/CTA containment, hero height, next-section separation, focus, horizontal overflow and Login→Register→Login were checked.
- Public navigation regression: 4 passed in light/dark mode on mobile/desktop, covering theme persistence, menu, cart dialog, routes and auth entry.

Generated screenshots and raw measurements are retained in ignored test/artifact folders. This change does not alter inventory, payment or authorization rules.
