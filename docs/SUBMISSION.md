# FUTERA submission

- Live frontend: https://futera-mdshamim.vercel.app
- Live backend health: https://futera-server.vercel.app/api/health
- Frontend repository: https://github.com/mdshamim-mern/FUTERA
- Backend repository: https://github.com/mdshamim-mern/FUTERA-server
- Both repositories use main for production deployment. Existing history is preserved.
- Verification: [VERIFICATION.md](VERIFICATION.md).

## Implemented
Separate Next.js frontend and Express/MongoDB API; catalog and deterministic PC Builder; secure session/account/cart/checkout/admin foundations; dark/light theme; responsive navigation and profile menu; ten home sections; four-column desktop products; About, Contact, Privacy and Support; account/admin sidebars; editable profile; order charts from database records; filtered admin tables; owner-scoped reviews and related products; Google OIDC integration; Gemini recommendations and PC-building support.

## Submission limits — do not conceal these
The live deployment is a labelled sample demonstration, not a retail business ready to accept real orders. MongoDB Atlas access is unavailable. Consequently live registration, login, saved accounts and checkout remain disabled. Database-backed flows passed isolated replica-set tests but have not been verified against Atlas.
Google OAuth client credentials and Gemini API/model configuration were not supplied. Provider integration/security tests pass with controlled fixtures, but real Google login and real AI generation are not verified or enabled.
No verified product inventory, real prices, licensed product photography, retail contact information or social accounts were supplied. Do not remove SAMPLE labels to claim compliance with the no-dummy-content rubric.
No public user/admin demo credentials are provisioned. Never share a production administrator password; provision a restricted isolated demonstration database first. Demo autofill remains unconfigured.
Lighthouse was not measured.

## Owner activation checklist
1. Sign into Atlas personally and configure a dedicated database user and network policy; place the resulting URI only in backend Vercel secrets.
2. Configure all backend variables in .env.example, including a cryptographically random AUTH_SECRET and explicit shipping rules. Run npm run db:indexes from FUTERA-server. Seed only a deliberately named _sample database for a demonstration.
3. For Google, configure an OAuth web client with redirect https://futera-mdshamim.vercel.app/auth/google/callback and store its credentials only in backend Vercel.
4. Configure GEMINI_API_KEY and GEMINI_MODEL together with an owner-approved provider account and quota.
5. Enable COMMERCE_ENABLED in both projects only after database/configuration validation, redeploy and rerun end-to-end tests. Never simulate a successful payment.
6. Replace fixtures only with owner-verified catalog data and assets whose usage rights are documented.
