# Interaction coverage

This is a bounded test inventory, not a claim that every possible browser/provider/device state has been exhaustively certified. The final verification report records the actual runs and outcomes.

| Area | Covered interactions |
| --- | --- |
| Public navigation | Internal destinations, article contents, profile menu, mobile drawer, cart dialog open/close, social URL schemes/accessibility names |
| Themes and accessibility | Light/dark toggle, FAQ open/close, use-case tabs, visible keyboard focus, reduced motion, short-phone hero |
| Catalog | Search/category/brand/price/spec filtering, sort, pagination, details, gallery selection, related links, compare add/remove/clear |
| Builder | Current starter IDs, optional GPU, incompatibility/fix, stock checks, required-part progress, whole-build cart, save/share/QR/print |
| Customer account | Register/login/logout, guest merge, private order protection, profile/address feedback, saved build management, wishlist |
| Checkout | Server recalculation, stale quotes, ownership, coupons, stock, COD, test approval/decline/cancellation, idempotent retry |
| Store administration | Role checks, read-only public demo protection, owner mutation reflected in storefront, filters/pagination, action replay |
| Assessment workspace | Public-demo-admin create/edit/filter/delete/reset, cancelled delete confirmation, owner isolation, revision conflicts, unchanged storefront |

Intentionally restricted controls have explicit reasons: empty comparison needs selections, known builder conflicts/stock failures block cart, public demo accounts cannot change store records, and real payments are unconfigured. Media sources and social services may impose their own login or availability restrictions.
