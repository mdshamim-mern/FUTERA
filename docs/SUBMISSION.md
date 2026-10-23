# FUTERA submission

Updated: 23 October 2026.

- Live frontend: https://futera-mdshamim.vercel.app
- Live backend: https://futera-server.vercel.app
- Frontend repository: https://github.com/mdshamim-mern/FUTERA
- Backend repository: https://github.com/mdshamim-mern/FUTERA-server
- Verification: [VERIFICATION.md](VERIFICATION.md).
- Catalog sources: [CATALOG_PROVENANCE.md](CATALOG_PROVENANCE.md).

## Delivered

Separate deployed Next.js frontend and authoritative Express API; 20 manufacturer-sourced hardware reference records; searchable/filterable/paginated catalog; comparison and compatibility builder; original diagrams and building guides; owner-provided contact/social information; responsive light/dark interface. Accounts, role guards, cart, COD order transactions, admin, Google OIDC and two Gemini modes are implemented and tested in isolation.

The owner explicitly chose an informational catalog without unverified selling claims. Reference products have no advertised retail price or stock and cannot be ordered. Diagrams are original category illustrations, not manufacturer photography. No invented testimonials, reviews or sales statistics are published.

## Remaining activation work

Atlas login is confirmed, but the dedicated application database user/password is not created. Backend database/session secrets are not configured. Live accounts, public demo credentials, private dashboards and checkout are not verified or enabled.

Google project FUTERA (futera-512418) exists; consent policy approval and OAuth web-client creation remain pending. Gemini login/key/model setup for the owner-designated account remains pending. Live Google login and both live AI responses have not been verified. See [SERVICE_ACTIVATION.md](SERVICE_ACTIVATION.md).

Do not publish unrestricted production administrator credentials. Demo access needs an isolated database and explicit restrictions. Retail checkout additionally requires verified inventory, prices and fulfillment rules; the supplied contact location does not establish a pickup service.
