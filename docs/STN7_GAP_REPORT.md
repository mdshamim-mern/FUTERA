> Historical setup/audit record. The current state is documented in STN7_CHECKLIST.md, SUBMISSION.md and the latest dated section of VERIFICATION.md. Earlier claims that Atlas, demo login, checkout or AI are disabled are superseded.

# STN-7 requirement audit — 23 October 2026

Production frontend: https://futera-mdshamim.vercel.app
Production backend: https://futera-server.vercel.app

The implementation and live service activation are different milestones. This report does not certify the application as production-ready.

| Requirement | Current evidence / remaining gap |
|---|---|
| Separate repositories | Next.js frontend and authoritative Express/MongoDB backend; both deploy from main |
| Light/dark, restrained palette | Persistent theme cookie, shared tokens, cyan accent with violet decoration and semantic status colors |
| Navbar | Sticky full-width shell, seven public navigation entries, additional saved-build entry when authenticated, profile dropdown and responsive drawer |
| Hero | CTA interaction; viewport-based height at target test sizes; extreme short viewports may require scrolling |
| Ten home sections | Hero plus nine sections; automated count assertion |
| Contact/footer | Owner-supplied email, phone, location and four social channels, plus working internal/GitHub links |
| Cards | Image, title, description, specs, explicit unavailable retail price/availability and View Details; four desktop columns; shared radius and stretch layout |
| Loading | Route skeletons; homepage hero streams independently of catalog data, with reserved loading space |
| Public details | Overview, specifications, gallery, actual-submission reviews and related records; images still neutral illustrations |
| Explore | Search, category/brand/price/availability/specification filters, URL-driven sort and pagination |
| Accounts | Login/register/profile/session implementation and isolated tests exist; live Atlas-backed operation not activated |
| Google login | PKCE/nonce/state/OIDC implementation exists; FUTERA OAuth client credentials and real-login verification pending |
| Demo access | No public credentials provisioned. Requires isolated database and restricted demo permissions; never expose production admin credentials |
| Account navigation | Six anchors: overview, orders, saved builds, wishlist, addresses and editable profile |
| Admin | Protected sidebar, record-derived overview/chart, filter and pagination controls on product/order/user/coupon/audit tables; live records unavailable |
| Form states | Auth, profile, review and admin interactive forms have validation/pending/error handling; plain account mutation forms still need a complete UX review |
| Additional content | About, Contact, Support, Privacy and three original application guides; no fabricated testimonials or reviews |
| AI | Two Gemini integration modes with authenticated quotas and catalog allowlisting; real provider activation/output unverified |
| No dummy content | Owner approved an informational catalog: 20 manufacturer-sourced real models, original category diagrams and no retail price/stock claims. Licensed photography remains unavailable |
| Responsive/accessibility | Four viewport Playwright suite; measured Lighthouse results are recorded separately, not a full manual accessibility certification |
| Live checkout/dashboard | NOT verified: production commerce remains disabled without Atlas and approved fulfillment configuration |

## External blockers observed this session

- Atlas login now succeeds. A futera_app user with readWrite only on futera_live is required; a fresh check confirmed it has not been created. The owner must create/submit its password.
- After owner authorization, dedicated Google project FUTERA (futera-512418) was created without billing enrollment. User Data Policy approval and OAuth client creation are pending.
- AI Studio onboarding was completed by the owner; the signed-in account differs from the requested Gemini account. Login to shamimsagor5.00@gmail.com was handed back to the owner.
- Verified retail inventory, licensed photographs, and fulfillment rules have not been supplied. The public contact address does not authorize pickup fulfillment.

See SERVICE_ACTIVATION.md for exact origins, callback and environment variable names. See VERIFICATION.md for measured checks and Lighthouse results. Preserve sample disclosures until the data actually changes.
