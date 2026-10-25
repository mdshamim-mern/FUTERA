# FUTERA

A Bangladesh-focused PC research and configuration application with separate Next.js frontend and Express/MongoDB backend.

- [Live website](https://futera-mdshamim.vercel.app)
- [Frontend repository](https://github.com/mdshamim-mern/FUTERA)
- [Backend repository](https://github.com/mdshamim-mern/FUTERA-server)
- [Submission and demo access](docs/SUBMISSION.md)
- [Actual verification results](docs/VERIFICATION.md)
- [Current product sources and media](PRODUCT_MEDIA_SOURCES.md)

## Current application

The active catalog contains 20 real models across all 14 component categories. Every active price is backed by a dated retailer observation; none is an invented placeholder amount. Product galleries contain 49 credited photographs in total. Six source listings have one image; other models have multiple distinct views. Unknown specifications remain unknown.

Home includes meaningful sections for categories, budgets, use cases, current components, editable starter configurations, manufacturers, building workflow, guides/AI help, FAQs and a next-step CTA. Starter configurations use actual catalog IDs and display the real subtotal, over-budget notices and compatibility issues.

Accounts provide saved builds, addresses, wishlist, order history, profile editing and a chart derived from displayed order records. Owner administrators have role-checked, audited mutations and paginated reports. Public demo administrators are read-only and cannot access private customer records.

Google login and two Gemini features are configured. Checkout creates unpaid educational COD orders. This is a project demonstration: no money is collected and no physical delivery, retailer inventory or manufacturer affiliation is promised. The owner's contact location is not a confirmed pickup showroom.

## Local setup

Use Node.js 24. Clone FUTERA-server beside this repository. Install dependencies in both repositories with `npm ci`, and copy each `.env.example` to its ignored `.env`. Configure the backend MongoDB connection and authentication secret privately; configure frontend API_BASE_URL and APP_URL for local development. Never commit environment secrets.

Start the backend with `npm run dev` in FUTERA-server and the frontend with `npm run dev` here. Follow the variables documented in each environment example; checkout, Google and AI require their actual backend configuration.

## Checks

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run test:e2e:current` — isolated sourced-model Home, starter, gallery, cart and account tests
- `npm run test:e2e:commerce` — isolated registration, checkout, private order, owner-admin and sharing/print workflows
- `npm run test:e2e:links` — public navigation and UI controls
- `npm run test:e2e:live` — actual deployed demo login, dashboard, checkout and AI; creates unpaid demo orders using invented details

Browser fixtures use ephemeral MongoDB databases, explicit test environment isolation and separate ports. The primary checks are also available in the backend repository. Vitest uses one thread worker to avoid Windows fork-worker startup instability.

## Catalog maintenance

The owner approved archiving models without verified prices/images. The backend `npm run demo:curate` command is limited to non-production NODE_ENV plus the isolated futera_demo database. It creates a local before-snapshot, uses a transaction, preserves existing stock and order history, and archives records rather than deleting them. Media must be deployed and verified first.

Older audit documents describe earlier stages. The current dated verification and submission documents supersede old activation-blocked statements. No claim is made that automated checks prove every possible state, external social service, or production retail operation.
