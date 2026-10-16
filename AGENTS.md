# AGENTS.md — VORTEX PC

## Project
VORTEX PC: premium PC hardware e-commerce + custom PC configurator for Bangladesh (currency ৳ BDT, e.g. ৳ 85,500).
Original branding. References are for UX inspiration only (ryans.com/pc-builder, startech.com.bd/tool/pc_builder, elitehubs.com, modxcomputers.com, nzxt.com, ibuypower.com). Never copy their code, text, logos, or exact layouts.

## Stack
Next.js (App Router) + TypeScript (strict) + Tailwind CSS + shadcn/ui + Lucide + Motion
MongoDB Atlas + Mongoose, Zod validation, React Hook Form, Zustand (builder state only)
Auth.js (admin role protection), Vitest + React Testing Library + Playwright
Dev environment: Windows, PowerShell, VS Code.

## Commands (verify these exist in package.json; add if missing)
- npm run dev | npm run lint | npm run typecheck | npm run test | npm run build | npm run test:e2e
- npm run seed (loads clearly-labelled DEVELOPMENT sample data)

## Architecture rules
- src/app: routes/layouts/loading/error. src/components: shared UI. src/features/<name>: feature code (products, builder, cart, checkout, account, admin).
- src/server: business logic + data access (server-only). src/lib: db, auth, validation, utils. src/types: shared types.
- Server Components by default; "use client" only when needed (interactivity, builder state).
- Server Actions for form mutations; Route Handlers only for explicit HTTP contracts.
- Compatibility engine = pure TypeScript functions in src/features/builder/compatibility, zero UI/DB imports, fully unit-tested.
- Prices, stock, coupons, shipping are ALWAYS recalculated on the server. Never trust client totals.
- Validate all env vars with Zod at startup. Server-only secrets never reach client bundles.
- Do not add a package if native Next.js/React can do it.

## Design system: "Dark Glass"
- Tokens as CSS variables + Tailwind config: --bg #07090D, --surface rgba(255,255,255,0.05), --surface-strong rgba(255,255,255,0.09), --border rgba(255,255,255,0.10), --accent #22D3EE (restrained cyan), --accent-2 subtle violet for gradients only, --danger/--warning/--success.
- Glass = translucent surface + backdrop-blur (12–20px) + 1px border + soft shadow + inner highlight. Use ONLY on nav, builder summary, modals/drawers, featured cards — not on every element. Solid fallback when backdrop-filter is unsupported.
- Fonts via next/font: Space Grotesk (display), Inter (UI), Hind Siliguri or Noto Sans Bengali (Bangla). Tabular numbers for prices.
- WCAG AA contrast, visible focus rings, prefers-reduced-motion respected, touch targets ≥ 44px.
- Every data view needs loading (skeleton), empty, error, and success states.
- Mobile-first: 360 / 768 / 1024 / 1440. No horizontal scroll.
- Avoid: generic SaaS-dashboard look, excess neon, heavy blur, decorative animation that hurts usability.

## Compatibility engine contract
Result per check: { status: "ok" | "warning" | "error" | "unknown", ruleId, message (plain English + Bangla-ready key), involved: [partIds] }.
"unknown" = missing spec data; never treat unknown as compatible.
Rules: CPU↔Motherboard socket (+chipset/BIOS warning); Motherboard↔RAM (DDR type, slots, max capacity/speed); Motherboard↔Case form factor; GPU length vs case clearance; Cooler height vs case; radiator support; Cooler socket + TDP rating; PSU wattage = (CPU TDP + GPU TDP + 100W) × 1.3 with connector checks (8-pin, 12VHPWR); storage M.2 slots/interface + SATA ports.

## Working rules
- Small, reviewable changes. No unrelated edits. Do not delete or overwrite existing files without saying so.
- Never invent prices, stock, API endpoints, payment success, or test results. Dev data must be labelled "sample".
- No secrets in git. Maintain .env.example.
- Before finishing ANY task: run lint, typecheck, test, build; report the real results. If something fails or can't be run, say so.
- Keep docs current: README.md, ARCHITECTURE.md, DECISIONS.md, IMPLEMENTATION_STATUS.md, DATABASE_SCHEMA.md, PC_COMPATIBILITY_RULES.md, DESIGN_SYSTEM.md.
- Explain decisions and blockers in simple Bangla in the final summary; code, comments, and docs in English.