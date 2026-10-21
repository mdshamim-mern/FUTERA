# Backend extraction map

## Move to FUTERA-server
- src/server/models/{catalog,commerce,admin}.ts: MongoDB schemas/indexes.
- src/server/{catalog,builder,checkout,cart,account,admin,settings,auth-rate,guards}.ts: authoritative repositories and services.
- src/lib/{db,password,env-schema,env}.ts: backend database, password hashing and validated secrets.
- src/lib/auth.ts and api/auth handler: replace Auth.js coupling with backend-owned sessions/OAuth endpoints; preserve revocation/rate limits.
- features/account/{actions,address-actions}, cart/actions, checkout/actions, admin/actions: business mutations become REST handlers calling services.
- seed/index CLI and Mongo transaction tests: backend owns writes and indexes.

## Shared pure contracts
- features/products/{schema,query}; builder/{schema,compatibility}; checkout/{schema,pricing,data}; admin/schema.
- Backend is final authority. Frontend retains only validation/types and instant compatibility preview; synchronize source with a checked script and golden tests.
- Sample fixtures remain development-only and labeled; do not rename them into real stock.

## Stay in FUTERA frontend
- App Router pages/layouts/loading/error, components, styles, fonts, original brand.
- Product/builder/account/admin interactive UI, Zustand builder references, gallery/compare/print presentation.
- Thin Server Actions may relay API calls and redirects, but must not import Mongoose, secrets or authoritative business services.
- Same-origin /api/backend proxy forwards only approved API paths/cookies; backend independently validates origin/session/role.

## Migration order
1. Clone independent backend, port pure modules/models/services, test API.
2. Implement backend sessions, owner-scoped routes, transactional cart/checkout/admin.
3. Add typed frontend API adapter; move pages off direct DB/auth access.
4. Remove frontend backend-only dependencies after regression tests pass.
5. Complete STN-7 UI/dashboard/content/AI requirements; verify real integrations.
6. Push English conventional commits to each supplied repo, deploy to owner Vercel account, configure Atlas/OAuth/AI privately, run live smoke checks.

Rollback: frontend main retains Phase 5; migration branch is codex/stn7-upgrade. Do not rewrite existing Git history.
