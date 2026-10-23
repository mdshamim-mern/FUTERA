# Reference catalog provenance

Reviewed 23 October 2026. The owner selected an informational catalog without unverified sales. The authoritative dataset is FUTERA-server/src/features/products/reference-data.ts: 20 real model references across CPU, motherboard, RAM, SSD, PSU, case and air cooler categories. Descriptions are original summaries; no third-party product descriptions or images are copied.

- AMD Ryzen 5 7600X, Ryzen 7 7700X, Ryzen 9 7900X, Ryzen 9 7950X: [AMD processor table](https://www.amd.com/en/partner/articles/amd-ryzen-7000-series-desktop-processors.html).
- Crucial P3 Plus 500GB/1TB/2TB/4TB: [Crucial product flyer](https://www.crucial.com/content/dam/crucial/ssd-products/p3-plus/flyers/b2c/crucial-p3plus-productflyer-consumer.pdf).
- Corsair RM650/RM750/RM850 (2021): [Corsair RM series manual](https://assets.corsair.com/image/upload/corsairmedia/sys_master/productcontent/WW_RM_Series_2021_QSG_Web_AA.pdf).
- Kingston KF552C40BBK2-32, KF556C40BBK2-32, KVR48U40BD8-32: manufacturer datasheets linked per record at kingston.com/datasheets/.
- MSI B650 GAMING PLUS WIFI and B650M GAMING PLUS WIFI: manufacturer datasheets linked per record at storage-asset.msi.com. Revision-sensitive memory capacity, maximum speed and BIOS status remain unknown.
- Noctua NH-U12S and NH-D15S: manufacturer datasheets linked per record. No invented TDP cooling rating or guaranteed mounting kit compatibility.
- Fractal Design Pop Air and Pop Silent: [Fractal manual](https://www.fractal-design.com/app/uploads/2023/02/Pop-Manual-V2.pdf). Radiator installation can reduce baseline clearance; radiator support is not simplified into a misleading unconditional compatibility claim.

## Assets

public/illustrations contains seven original SVG category diagrams authored for FUTERA. They identify the component category, not the exact appearance of a model. They contain no manufacturer logos or copied illustrations. Product photography has not been licensed and is not claimed.

## Retail safeguards

Reference entries use isReference=true with zero internal price/stock sentinels. Zero never means free or sold out: the UI says price/availability not supplied, including comparison, builder and printable build summaries. Price and stock filters exclude unknown reference values. The authoritative pricing function and final inventory update exclude reference records; CHECKOUT_ENABLED=false separately refuses checkout review and confirmation. Real stock/prices require owner verification and conversion to a retail record.

Fixtures remain in source for deterministic tests only and must retain SAMPLE labels if deliberately displayed. No testimonials, reviews, sales statistics or benchmarks were fabricated.
