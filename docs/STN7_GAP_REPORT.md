# STN-7 gap report

Audit baseline: Phase 5 commit 5d73549, 21 October 2026. Deadline: 22 October 2026, 20:00 Asia/Dhaka. User confirms two GitHub repositories and authorizes English commits, pushes and deployment. No paid plan authorized.

| Requirement | Status | Evidence / gap |
|---|---|---|
| Three primary colors plus neutrals | Partial | globals.css has cyan/violet plus amber/green/red semantic accents; normalize palette |
| Light and dark mode | Missing | globals.css forces dark; no theme switch |
| Consistent responsive components | Partial | shared tokens and tested breakpoints; card radius varies by component purpose |
| Forms with validation/error/pending/success | Partial | Zod/actions cover commerce/admin; profile/contact not implemented |
| No dummy content | Missing | sample-data.ts contains 140 labeled fixtures; real catalog/assets not supplied |
| Sticky full-width navbar, four public routes | Done | components/navbar.tsx has five links and responsive drawer |
| Six authenticated routes and profile menu | Missing | navbar ignores role/session; no profile dropdown |
| Hero 60-70vh and interaction | Partial | app/page.tsx has CTAs, padding-based height, no viewport constraint |
| Ten home sections | Missing | hero plus seven StorefrontSections sections = eight |
| Functional contact/social footer | Missing | footer only links to products |
| Cards image/title/description/meta/details | Partial | specs substitute description; link reads Details; images neutral placeholders |
| Four listing cards per desktop row | Partial | home uses four; verify product listing grid during UI revision |
| Skeletons | Done | route loading and catalog-skeleton components |
| Public product details/specs/gallery | Partial | public specs/gallery exist; gallery is placeholder artwork |
| Reviews and related products | Missing | no review model or workflow |
| Search, three filters, sorting, pagination | Done | products/query.ts handles category/brand/price/stock/socket/DDR and URL paging |
| Login/register/validation | Done | existing Auth.js implementation; must port to backend |
| Demo autofill / social login | Missing | no OAuth credentials, provider or public demo-account flow |
| Role-based protection | Done | customer/admin guards and audited mutations; manager optional |
| Sidebar counts and dashboard profile menu | Missing | account is one page; admin uses wrapping horizontal nav |
| Dynamic charts | Missing | admin counts use DB; no chart implementation |
| All tables filtered and paginated | Partial | admin pagination exists; only products/orders have filters |
| Editable profile | Missing | addresses editable; profile name not editable |
| Additional pages | Missing | no About/Contact/Help/Privacy/Terms routes |
| Two real AI features | Missing | no provider configuration or AI endpoints |
| Two separate repositories | In progress | supplied backend repo cloned empty; code extraction started |
| Live URLs / submission credentials | Missing | Vercel account exists; deployment and Atlas configuration pending |

## Priority risks and dependencies
1. Backend extraction must preserve authorization, pricing, transaction and session tests.
2. New cookie/session boundary must work through a single browser origin.
3. Atlas connection/user/network authorization is not configured locally.
4. Google OAuth needs owner-controlled consent/client configuration.
5. AI requires provider credentials and available usage; no fake AI fallback.
6. Licensed product assets and verified price/stock data are absent.
7. Invented reviews/orders must never be represented as real activity.
8. Public admin demos need restrictions and isolated data.
9. Deadline favors two useful AI features, not optional extra roles/providers.
10. Push and deploy are authorized, but paid subscriptions and new security-sensitive grants need explicit approval.

Existing green Phase 5 results are historical, not proof the migration works. Each migration milestone must rerun its checks. Some home FAQ copy still says compatibility is a future phase; correct it during content revision.
