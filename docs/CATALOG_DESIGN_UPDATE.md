# Catalog and shared product card refresh

25 October 2026.

- Added a glass catalog introduction, category navigation, visible search toolbar and removable URL-driven filter chips.
- Added a sticky, independently scrollable desktop filter panel and an explicitly named mobile filter drawer. Existing category, brand, price, availability, socket, memory and sorting controls remain server driven.
- Shared cards now have a larger photo stage, consistent title/description regions, two labelled specification chips, source-linked price/date, stock label and separated comparison/details controls. Four cards fit each desktop row; layouts adapt at mobile/tablet sizes. Skeletons follow the same grid.
- Empty comparison is an inline hint. The sticky dock appears only after a selection, preserving the three-product cap and clear/remove behavior. Keyboard focus stays visible inside the rounded image/title link.
- Product models, price records, stock, checkout and authorization rules were not changed.

Verification: lint/typecheck/build passed; 84 unit tests passed. The four responsive catalog cases passed in both themes at 360/768/1024/1440 widths. They exercised category navigation, search, removable chips, category+brand+price filtering, sort, details, comparison cap/clear and pagination, plus desktop card alignment and horizontal overflow. Because the local MongoDB/headless-shell test runtime encountered startup failures, the successful browser run used full Chromium and the deployed public API as a read-only data source; it created no accounts, carts or orders. The same interaction test remains under `tests/current/catalog-design.spec.ts` for isolated-fixture runs on a healthy test environment.

Screenshots and raw observations remain in ignored test/artifact folders. This is verification of the listed flows, not an exhaustive audit of every possible browser/network state.
