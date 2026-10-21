# Database schema plan

No models, collections or indexes are created in Phase 1. See ARCHITECTURE.md for
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
