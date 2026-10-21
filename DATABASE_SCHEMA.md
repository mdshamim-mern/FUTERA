# Database schema

Phase 2 implements Category and Product models with declared indexes (details below). See ARCHITECTURE.md for
the collection/index matrix. MongoDB Atlas must support transactions before checkout.

Products have category-discriminated specs validated by Zod before persistence:
CPU socket/TDP/chipset support; motherboard socket/chipset/BIOS/DDR/slots/capacity/
speed/form factor/storage interfaces; RAM DDR/capacity/module count/speed;
GPU length/TDP/connectors; case form factors/GPU clearance/cooler height/radiators;
cooler sockets/TDP/height/radiator size; PSU watts/connectors; storage interface/size.
Unknown specs are null or absent, never zero defaults that imply compatibility.

Amounts use integer BDT minor units (100 poisha = 1 taka); formatting is presentation
only. Stock lives in inventory, not duplicated authoritative product counts.
Orders retain immutable line, price, tax, shipping and address snapshots. Store UTC
timestamps and display Asia/Dhaka. ObjectIds stay server-side or serialize as strings.

Inventory updates use conditional writes and transactions. Unique idempotency keys
prevent duplicate orders. Coupon usage requires atomic limits. Guest-cart TTL is
cleanup only, not an authorization or reservation-expiry guarantee. Index migrations,
retention rules and final auth adapter collections are deferred to their feature phases.

## Phase 2 implemented collections

Category fields: slug (one of the 14 category keys), name, description, sortOrder,
active, isSample, timestamps. Indexes: unique slug; active + sortOrder.
Product fields: unique slug and SKU, name, brand, category slug, description,
priceMinor (integer poisha), stock (nonnegative catalog snapshot), active, isSample,
featured, safe local image records, specs and timestamps. Category keys include CPU,
motherboard, RAM, SSD, HDD, GPU, PSU, case, CPU cooler, case fan, monitor, keyboard,
mouse and UPS. Category links are application-enforced slugs; the seed saves categories
before products. No other domain collections are created.

Product indexes: unique slug; unique SKU; active/category/priceMinor/slug;
active/brand/priceMinor; active/priceMinor/slug; active/stock; weighted text index
(name 10, brand 5, description 1). Production index migrations remain explicit.

Specs are stored as a Mongoose Mixed document, strictly validated by the matching
category-specific Zod schema in the document validation hook. Both shared and specs
fields are checked on saves, not just on UI input. Do not use updateOne/bulkWrite or
query updates that bypass document validation for catalog writes. Future mutation
repositories must parse the complete product and use validated document saves.
Nullable spec values mean unknown; undeclared fields or mismatched categories fail.

SSD includes capacity/interface/form factor/read speed; HDD capacity/interface/form
factor/RPM; fans size/RPM/airflow/connector; monitor size/resolution/refresh/panel/ports;
keyboard layout/switch/connectivity/backlight; mouse DPI/weight/connectivity/buttons;
UPS VA/watts/topology/outlets. Core PC fields follow the compatibility plan above.
SAMPLE products require SAMPLE name and SKU prefixes. Seed brands and all offer
values are fictional; image paths are restricted to local neutral SVG placeholders.
