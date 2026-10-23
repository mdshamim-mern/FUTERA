# AGENTS.md — FUTERA

## Product and delivery
FUTERA is a Bangladesh-focused DEMO PC hardware store and compatibility configurator for a graded assignment. Currency is BDT, formatted like ৳ 85,500. Original identity: Future + Era; tagline: Build the future of your desk. Implement a polished, responsive, modern glass interface without copying another storefront's layout, text, branding or assets.

Two PUBLIC repositories are required: FUTERA (Next.js UI/HTTP adapters) and FUTERA-server (authoritative Express/MongoDB API). Keep the Next.js app at this repository root and preserve Git history. The user authorizes small English conventional commits, push and deployment for this upgrade. Final explanations and blockers are in simple Bangla. Do not claim completion from code inspection alone.

## Demo-store policy — replaces older reference-only data policy
- Real hardware model names and manufacturer-verifiable specifications; realistic BDT DEMO prices and stock are authorized. Record price inspiration URL/date and distinguish these values from actual retail offers internally.
- Disclose once on each relevant surface: footer, About, checkout and README: "Demo store — prices, stock and orders are illustrative". Never claim a real retailer, supplier, shipment, payment collection or manufacturer partnership.
- Demo reviews, customers and six months of demo orders may be seeded ONLY in an explicitly named isolated demo database. Mark records as demo; use invented non-public identities and reserved example.test emails. Review/testimonial sections must identify their demo origin; never present fabricated endorsements as real customers. Charts aggregate actual database rows at runtime, not hardcoded totals.
- Target demo storefront copy must not contain: "Price not supplied", "Information only", "not for sale", "Retail availability not supplied", "SAMPLE", "fictional", "reference catalog", "coming soon", or "lorem". This is a UI migration acceptance gate, NOT permission to conceal the current unactivated state. Keep honest existing disclosures until replacement records and services are verified. Test fixtures, schemas, historical docs and security errors are excluded from this copy rule.
- Cards show image, title, description, demo price, rating/review count, stock and View Details. Do not invent ratings for products without demo review records; use an honest unrated state.
- Target 80+ real products including GPU and every supported category. At least three genuinely distinct, correctly identified images per model. Track source URL, author, license/permission, attribution and local path in docs/ASSETS.md. No copied retailer photos/descriptions, unauthorized hotlinks, grey boxes, repeated crops claimed as different product photos, or generated pictures claimed as actual model photography.
- Unsplash is owner-approved as a source, subject to its license and image-specific rights. General PC/editorial photographs cannot be labelled as a specific product model. If model-specific licensed assets are unavailable, pause that catalog expansion and report exact missing assets; continue independent work.
- Verify complete compatibility-critical specifications for the seven required categories. Do not invent connectors, dimensions, cooler TDP ratings or BIOS guarantees to force a healthy result. Choose well-documented hardware; genuinely missing specs remain unknown.
- Enable COD and pickup only as clearly disclosed DEMO order workflows with configured demo fulfillment rules. Hide unavailable card/mobile banking choices; never simulate provider payment success. Never enable a broken checkout merely to remove a warning.

## Architecture and security
- Actual stack: Next.js App Router, strict TypeScript, Tailwind, shadcn/Radix, Lucide; Zustand for builder state only. Backend Node/Express, MongoDB Atlas/Mongoose, Zod. Vitest, React Testing Library and Playwright.
- Opaque, hashed, revocable backend sessions replace the previous in-process Auth.js architecture. Preserve secure HttpOnly/SameSite cookies, CSRF/origin checks, auth rate limits and fresh server-side role/ownership checks.
- src/app holds routes/layout/loading/error; src/components shared UI; src/features feature code; src/lib server-only API/env helpers; src/types shared contracts. Server Components by default. Client components only for interaction.
- Server Actions are UI form adapters. Route handlers expose explicit HTTP contracts. Backend owns database access, final prices, stock, discounts, shipping, transactions and authorization. Never trust client totals or roles.
- Compatibility engine stays pure TypeScript with zero UI/DB dependencies and exhaustive unit tests. Result: status ok/warning/error/unknown, ruleId, plain English message plus translation key, involved part IDs. Unknown is never compatible.
- Cover socket/chipset/BIOS, RAM type/slots/capacity/speed (including multiple sticks), motherboard/case, GPU length, cooler height/radiators/socket/TDP, PSU (CPU TDP + GPU TDP + 100W) × 1.3 and 8-pin/12VHPWR connectors, M.2 interfaces/slots and SATA ports.
- Validate env with Zod; maintain .env.example. Secrets stay in backend environment, never Git/client bundles/chat. No real customer data in public repositories.
- Database password creation/submission requires owner handoff under browser policy. Obtain action-time approval where required for legal agreements or security-sensitive grants. Do not broaden Atlas network access automatically. Prefer least-privilege readWrite on the dedicated demo database; never reuse atlasAdmin for the app.
- Google OAuth redirect is https://futera-mdshamim.vercel.app/auth/google/callback. Backend is already deployed at https://futera-server.vercel.app. Do not invent another callback, migrate hosting unnecessarily or enable billing without approval.
- Demo login credentials must be restricted to an isolated demo deployment; never publish unrestricted production admin access. Add manager only with explicit least-privilege policy and tests.
- AI assistant, suggestions and admin insights must call a configured provider, validate outputs against actual catalog/compatibility data, apply quotas and authorization, and fail honestly. Never fake live AI or OAuth success.

## Design and content
- Dark Glass: --bg #07090D, translucent surfaces 0.05/0.09, border 0.10, restrained cyan #22D3EE; violet only subtle gradients. At most three brand colors plus neutrals and semantic statuses. Support light/dark with WCAG AA contrast.
- Glass on navbar, featured panels, summary and overlays; 12–20px blur, thin border, soft shadow and solid fallback. Do not blur every card or build a generic dashboard look.
- next/font: Space Grotesk display, Inter UI, Noto Sans Bengali; tabular prices. Consistent radius, spacing and card height. Four product columns on desktop. Skeleton, empty, error and success states.
- Mobile first at 360/768/1024/1440, no horizontal overflow; visible keyboard focus, >=44px targets, reduced-motion support. Hero about 60–70vh with accessible interaction; allow content to grow when needed for text zoom/short screens.
- At least ten meaningful Home sections. Database-backed statistics/testimonials only after demo data exists. Newsletter must actually persist opt-in and report pending/success/error; no fake submission.
- Public product details: correct gallery, overview, specs, reviews/form and related products. Explore: URL-driven search, category/brand/price/rating/stock filters, sort/pagination.
- Blog list/detail with 10+ original useful articles, Terms, About, Contact, Support and Privacy. Preserve old /guides links. Do not duplicate filler articles to meet a number.
- Logged out: >=4 navigation routes and clear Login/Register. Logged in: >=6 and profile dropdown. User sidebar >=4, admin >=6. Tables need filters/pagination; profiles editable.
- User-supplied contact details are authorized public project contacts. IDB, Agargaon, Dhaka is not a verified shop or pickup location. External social links open safely with target=_blank and rel=noopener noreferrer.

## Verification and working rules
- Small reviewable changes; announce before overwriting existing files. No unrelated changes. Do not add dependencies when platform features suffice.
- Commands: npm run dev, lint, typecheck, test, build, test:e2e; seed only the intended isolated demo database. Run lint/typecheck/test/build in BOTH repositories before final reporting. Report actual outputs, failures and limitations.
- Maintain README, ARCHITECTURE, DECISIONS, IMPLEMENTATION_STATUS, DATABASE_SCHEMA, PC_COMPATIBILITY_RULES, DESIGN_SYSTEM and docs/STN7_CHECKLIST.md, docs/ASSETS.md, docs/LINK_BUTTON_REPORT.md.
- Verify public routes and role-specific flows at 360/1440, light/dark. Use explicit interaction assertions for buttons, forms, navigation and dialogs; do not blindly click destructive admin controls. Report audited coverage, never claim EVERY button works without an inventory and assertions. Investigate 404/500, console errors and failed requests; explain expected denied requests.
- Test private-data isolation, role grants, demo cart/order transactions, and storefront after admin edits. Test real OAuth/AI separately from mocks. Credentials being present is not proof the feature works.
- Measure public mobile Lighthouse Home/Products, aiming >=85 performance; report actual performance/accessibility/best-practices/SEO, configuration and date. Do not fabricate scores or hide lower runs.
- Verify deployment readiness and live behavior after pushes. Keep incomplete external steps explicit and give the owner concrete next actions without requesting secrets in chat.
