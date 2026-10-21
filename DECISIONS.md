# Decisions

- 2026-10-21: Preserve the existing main history (two commits) and AGENTS.md verbatim.
- Use the requested Next.js App Router stack in the repository root, not Sites hosting.
- Use npm and commit its lockfile for reproducible installs; Node 24 is the baseline.
- Server Components by default; client code only for interactive primitives and errors.
- Use Tailwind CSS variables for Dark Glass and next/font for display, UI and Bangla.
- Use original SVG geometry for the identity and concept PC illustration; no product images.
- Home CTAs point to honest in-page foundation information until feature routes exist.
- Do not install Auth.js, RHF, Zustand or Motion until their features require them.
  Reduced-motion CSS covers the foundation; no decorative animation is needed.
- Database configuration is optional for the foundation; database use requires both
  URI and database name. Liveness does not test Atlas connectivity.
- Seed command will explicitly report zero SAMPLE records until schemas exist.
- Authentication provider, payments, shipping, tax, inventory source and deployment
  target remain owner decisions. Vercel + Atlas is a proposal, not a deployment.

## Dependency verification

The foundation uses Next.js 16.4.2, React 19.3.0 and Tailwind 4 from the official
scaffolder. Runtime audit is clean. See IMPLEMENTATION_STATUS.md for the known
lint-tooling advisory and all actual validation results.

## Phase 2 decisions

- Provide 10 fictional products in each of all 14 categories (140 total), not real
  brand/model claims. Sample prices and stock enable filter tests with explicit labels.
- Default to explicit sample data source; MongoDB mode never falls back silently.
- Use native GET forms and URL parameters for filters/sort/pagination. Page size 12.
- Declare MongoDB text search index and use phrase search. Fixture literal search is
  documented as a demo approximation, not a MongoDB search emulator.
- Use validated Mixed specs to share one strict Zod contract with seed and read DTOs;
  document-save hooks reject category mismatch. Query-update mutations are prohibited.
- Build budgets are labelled per-component filters. Featured sample build subtotals
  are sums of current server data; compatibility has not been evaluated.
- Implement add-to-cart/build as persistent preview references, with server-side
  stock checks and read-time price recalculation. Do not imply checkout or reservations.
- Comparison picker uses browser local storage for references only; comparison view
  is URL-addressable and server-resolved, bounded to 3 unique products.
- Brand marquee is static wrapping text to preserve motion/accessibility and avoid
  implying partnerships with real manufacturers. No new production packages added.
