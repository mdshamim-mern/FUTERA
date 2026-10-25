# STN-7 current checklist

Updated 25 October 2026. Scope is the current educational demo, not a real inventory/fulfillment business.

- [x] Light/dark shared design system, responsive layouts and visible focus/reduced-motion handling.
- [x] Sticky responsive navbar with 7 logged-out / 6 logged-in links and profile dropdown.
- [x] Home rebuilt around real catalog data; no empty sample featured builds or fictional-brand labels.
- [x] More than 10 meaningful Home sections, real-ID editable starter plans and working category CTAs, including GPU.
- [x] Four desktop listing cards per row; consistent card layout, source-backed prices, images and loading skeletons.
- [x] Public product details with overview, specifications, reviews, related products and credited galleries where multiple source photographs exist.
- [x] Search, category/brand/price/stock/spec filters, sorting and URL pagination.
- [x] Registration/login/logout, customer/admin demo autofill and actual Google login.
- [x] Role guards, user/admin sidebars, profile menu and editable profile.
- [x] Customer order table/activity chart, admin database aggregates, filters and pagination.
- [x] Account/cart forms provide pending, success and error feedback; saved-item deletion asks for confirmation.
- [x] About, Contact, Blog, Guides, Support, Privacy and Terms with owner-supplied contact/social links.
- [x] Two real Gemini modes: component recommendations and PC-building support.
- [x] Separate frontend/backend repositories and live deployments; public restricted demo credentials documented.
- [x] Current sourced catalog: 20 active models / 14 categories / 56 media views / zero illustrative prices. Ten unverified models archived with history preserved.

## Verification and limits

Read VERIFICATION.md for actual test counts and measured Lighthouse results. Historical audits are not the current checklist. Every model has at least two media views. These include labelled family/support images and two original specification diagrams; no duplicate or wrong-model photos are added. Public demo admin is read-only; normal owner-admin mutations are exercised in isolated tests. Prices are observations, all inventory is demonstrative, online payment success is never simulated, and no physical delivery is claimed. Facebook login is not implemented; Google satisfies the social-login option.


## Follow-up: assessment and test payments

See [assessment access and local payment tests](ASSESSMENT_AND_PAYMENTS.md). Public demo administrators can create/edit/delete isolated product copies without changing store records. Test payment outcomes are local simulators, never real charges or paid orders. Real retail stock/fulfillment still requires the owner's supplier arrangement.


Follow-up checks completed: frontend 84 tests; backend 184 tests; sourced responsive suite 13 passed/3 intentional skips; assessment pending-lock regression 4 passed; COD/admin 4 passed; public theme/navigation 4 passed; live payment flows 2 passed and live assessment flows 2 passed in separate runs. All 74 linked public destinations passed; the gallery-only migration verified 56 deployed media URLs and preserved prices/stock. See the latest VERIFICATION report for scope and limitations.
