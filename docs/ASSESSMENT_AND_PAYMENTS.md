# Assessment access and local payment tests

The public administrator stays read-only for storefront products, customers, orders, roles and settings. After using the Admin demo login button, open **Administration → Editable assessment** (`/admin/assessment`). Create a workspace copy from an actual sourced product, edit its name/description/price/stock, filter the list, then delete or reset it. Changes persist in the separate MongoDB `assessmentworkspaces` collection; they never update the storefront. The workspace belongs to the authenticated administrator. People sharing the public account also share that account's workspace. Never enter private information.

The workspace has a 20-product limit, five-result pagination, server validation, revision conflict protection, bounded change history, workspace-wide mutation locking, pending/error/success feedback and destructive-action confirmation. Every read and mutation checks the current enabled admin role. The owner still uses the ordinary protected product management workflow.

## Local payment tests

The owner requested test payments only. In checkout, choose the clearly labelled bKash-style, Nagad-style or Card-style test flow, then select approval, decline or cancellation. These are **local simulators**, not provider sandboxes, merchant integrations or real payment network responses. They ask for no PIN, OTP, card number or bank credentials.

- Approval creates one idempotent practice order with `isTestPayment=true`, the selected `TEST_*` method and `paymentStatus=unpaid`. It cannot mark any order paid.
- Decline/cancellation creates no order and changes no stock, cart or coupon usage.
- Server guards allow these methods only in `futera_demo` and only with sample/demo inventory. They cannot be used with real retail inventory. Prices and stock are still recalculated on the server, and signed quotes are bound to their owner.
- COD continues to create unpaid orders. Real payment credentials and provider-verified callbacks are not configured or implied.

## Real retail launch prerequisites

Public retailer pages establish product facts and dated reference prices. They do not establish FUTERA-owned inventory, supplier authorization, delivery capacity, pickup location or warranty coverage. These facts cannot be truthfully collected on behalf of FUTERA from another shop's stock badges. The current site discloses its demonstrative stock and unpaid practice orders. A real retail launch requires the owner's approved inventory/supplier arrangement, sale prices, delivery/returns/warranty rules and merchant onboarding. Existing historical practice orders must not be represented as actual sales.
