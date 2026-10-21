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
