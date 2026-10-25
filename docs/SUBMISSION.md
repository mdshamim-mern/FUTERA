# FUTERA submission

- [Live website](https://futera-mdshamim.vercel.app)
- [Live API](https://futera-server.vercel.app)
- [Frontend repository](https://github.com/mdshamim-mern/FUTERA)
- [Backend repository](https://github.com/mdshamim-mern/FUTERA-server)

## Demo access

Use the Login page buttons to fill credentials, then press Log in.

| Role | Email | Public demo password | Scope |
| --- | --- | --- | --- |
| Customer | customer@futera.example.test | Futera-Demo-Customer-2026! | Shared educational cart, builds and demo orders |
| Admin | admin@futera.example.test | Futera-Demo-ReadOnly-2026! | Read-only catalog/config and demo-account records; no store mutations or private-customer data |

Only use invented details in these shared demonstration accounts. Owner administrator accounts remain private and retain the normal protected mutation workflow.

## Verified activation — 25 October 2026

MongoDB Atlas is connected to the isolated futera_demo database. Live demo customer login, signed quote, COD confirmation and idempotent retry passed. The order remains unpaid; no money is collected and no goods are delivered. Live anonymous order access returned 404.

Both deployed Gemini modes returned actual provider answers. Google login was verified after owner consent on 24 October. Never include private data in AI prompts.

The 20 active catalog models cover all 14 categories, with 56 credited media views, source-backed prices and educational demo inventory. No active price is illustrative. Ten unverified older records are archived with order history preserved. Each model has at least two media views; these include labelled supplementary support media and diagrams. This is not a verified retail stock or price feed. See [media and pricing notes](../PRODUCT_MEDIA_SOURCES.md).

Dashboard lists now have server-side filters and bounded pagination. The public demo administrator cannot perform any of the eight mutation operations; this is enforced server-side and tested live.

## Scope and evidence

The catalog currently covers 20 models in 14 populated categories. It is not an exhaustive hardware catalog. No invented reviews, testimonials, paid sales or successful online payments are claimed. See [VERIFICATION.md](VERIFICATION.md) for actual checks and remaining limits. Historical reports describe earlier stages and are superseded by this dated activation report.


## Follow-up: assessment and test payments

See [assessment access and local payment tests](ASSESSMENT_AND_PAYMENTS.md). Public demo administrators can create/edit/delete isolated product copies without changing store records. Test payment outcomes are local simulators, never real charges or paid orders. Real retail stock/fulfillment still requires the owner's supplier arrangement.


Follow-up checks completed: frontend 84 tests; backend 184 tests; sourced responsive suite 13 passed/3 intentional skips; assessment pending-lock regression 4 passed; COD/admin 4 passed; public theme/navigation 4 passed; live payment flows 2 passed and live assessment flows 2 passed in separate runs. All 74 linked public destinations passed; the gallery-only migration verified 56 deployed media URLs and preserved prices/stock. See the latest VERIFICATION report for scope and limitations.
