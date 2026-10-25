> Historical setup/audit record. The current state is documented in STN7_CHECKLIST.md, SUBMISSION.md and the latest dated section of VERIFICATION.md. Earlier claims that Atlas, demo login, checkout or AI are disabled are superseded.

# Service activation handoff

Only the project owner can complete account sign-in and declarations. Do not send passwords, OTPs, database URIs, OAuth client secrets, or API keys in chat or commit them.

## Atlas

Atlas login is confirmed. The dedicated futera_app user has not been created; the owner must enter and submit its new credential. Limit readWrite to futera_demo and configure an appropriate network policy. Set MONGODB_URI and MONGODB_DB together in backend Vercel secrets. The public deployment uses the reference catalog with checkout disabled.

## Google OAuth

Dedicated Google Cloud project FUTERA (futera-512418) has been created. User Data Policy agreement approval remains pending; do not reuse another application's credentials. Configure a Web application client and its consent audience.

- Authorized JavaScript origin: https://futera-mdshamim.vercel.app
- Authorized redirect URI: https://futera-mdshamim.vercel.app/auth/google/callback
- Backend secret variables: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

The callback is on the frontend, which relays the state/code to the backend. Do not register an invented backend callback. The implementation uses PKCE, nonce verification and a short-lived single-use state record. Add intended test users if the consent audience remains in testing.

## Gemini

The owner must accept applicable AI Studio terms and confirm the account. Configure GEMINI_API_KEY and an available GEMINI_MODEL together in backend Vercel. Do not enable billing or a paid plan without the owner's approval. Two actual provider requests (recommendations and support) are required before claiming live AI verification.

## Commerce and deployment

APP_URL on the backend must equal the exact frontend origin above. API_BASE_URL on the frontend is https://futera-server.vercel.app. AUTH_SECRET must be a cryptographically generated secret of at least 32 characters. Sessions are opaque, hashed and revocable; there is no JWT_SECRET setting to invent.

Set explicit SHIPPING_HOME_MINOR, SHIPPING_PICKUP_MINOR and PICKUP_ADDRESS only from approved fulfillment rules. A project contact location is not automatically a pickup location. Account-only operation may use CATALOG_SOURCE=reference, COMMERCE_ENABLED=true and CHECKOUT_ENABLED=false after database and indexes are verified. Retail checkout requires CATALOG_SOURCE=mongodb, CHECKOUT_ENABLED=true and approved inventory/shipping configuration. Redeploy the backend first, verify configuration, then enable/redeploy the frontend. Do not claim COD payment collection.

## Honest public data

The owner supplied public contact details on 23 October 2026; these are centralized in src/lib/contact.ts. IDB, Agargaon, Dhaka is a normalized owner-supplied location, not a verified showroom address.

The owner approved 20 factual reference models with original diagrams. Real stock, commercial prices and image licenses are still required for a retail catalog. Never invent testimonials, reviews, purchases or sales statistics. Public demo admin access requires an isolated demonstration database and restricted permissions; never publish unrestricted production admin credentials.

Location spelling reference: [IsDB-BISEW IDB Bhaban](https://www.isdb-bisew.org/idb-bhaban) confirms Agargaon, Sher-e-Bangla Nagar, Dhaka. This verifies the landmark location, not the owner's office occupancy.
