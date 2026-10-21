# PC compatibility rules — Phase 3

Implemented in `src/features/builder/compatibility/index.ts`: pure TypeScript, no UI,
framework, catalog or database imports. The server quote and client picker use the
same rules. Results are `{ status, ruleId, message, messageKey, involved }`.
`messageKey` is `compatibility.<ruleId>.<status>`; messages are English and ready for
later Bangla localization. Unknown is never counted as compatible or healthy.

| Rule ID | Pass / failure behavior | Missing evidence |
| --- | --- | --- |
| socket | Equal CPU/board socket; mismatch error | unknown |
| chipset | CPU declares board chipset; otherwise warning requiring support-list review | unknown |
| bios | Exact CPU ID in board evidence plus supported status; update-required warning, unsupported error | unknown |
| ram-type | All kits match board DDR type; mismatch error | unknown |
| ram-slots | Sum(quantity × modules per kit) <= slots; excess error | unknown |
| ram-capacity | Sum(quantity × total kit GB) <= board maximum; excess error | unknown |
| ram-speed | Every kit speed <= board maximum; excess warning (downclocking may work) | unknown |
| ram-mixing | Different kit IDs produce a training/reliability warning | not emitted for one kit ID |
| board-case | Board form factor in supported case list; otherwise error | unknown |
| gpu-clearance | Each GPU length <= case clearance; excess error | unknown; omitted without a GPU |
| cooler-height | Cooler height <= case clearance; excess error | unknown |
| radiator | Zero means no radiator; positive size must be in case support list | unknown |
| cooler-socket | CPU socket in cooler mounting list; otherwise error | unknown |
| cooler-tdp | Cooler declared thermal rating >= CPU TDP; otherwise error | unknown |
| psu-wattage | Capacity >= ceil((CPU TDP + all GPU TDP × qty + 100W) × 1.3) | unknown |
| psu-connectors | Count each board and GPU connector against dedicated PSU connectors | unknown |
| storage-interface | M.2 interface in board list; other internal drives require SATA | unknown |
| m2-slots | Sum of all M.2 drive quantities <= board slots | unknown |
| sata-ports | Sum of non-M.2 SATA quantities <= board SATA ports | unknown |
| display-output | Without discrete GPU, CPU must declare integrated graphics | unknown |

PowerGauge shows estimated component load, the minimum including 30% headroom and
recommended PSU capacity rounded upward to 50W. No GPU means zero GPU TDP, not unknown.
A selected GPU with missing TDP makes the estimate unknown. This is not wall power,
a transient-load model, PSU efficiency certification or a manufacturer recommendation.

Quantities are integers 1–8, references max 24. Server resolution enforces one CPU,
board, GPU, PSU, case and CPU cooler. RAM capacity is **total kit capacity**, not per
module; `modules` is physical modules per kit. Repeated PSU connector strings mean
separate available connectors. CPU EPS 8-pin and GPU PCIe 8-pin are not interchangeable;
12VHPWR requires an exact connector, never an assumed adapter. M.2 SATA consumes an
M.2 slot and must appear in m2Interfaces; it does not consume an external SATA port.

## Healthy and incremental selection

Healthy requires all seven required categories, every emitted check `ok`, and no
server stock issue. The picker hides known errors by default. During an incomplete
build it also displays explicitly **unverified** options so users can supply missing
counterparts; these are never labelled compatible. Turning off the filter exposes
conflicting options with reasons, allowing an intentional selection and subsequent fix.
Warnings and unknowns stay in the health list; activating an issue focuses its row.

## Evidence and limits

Sample CPU supportedChipsets and board supportedCpuIds/biosStatus/powerConnectors are
fictional test evidence only. Missing legacy fields remain unknown. Real catalogs must
curate exact CPU revisions and BIOS versions. Current biosStatus applies to all IDs in
the board's declared evidence list; boards with mixed support statuses need a future
per-CPU BIOS matrix. No database compatibilityRules collection is populated yet.

These checks do not model shared PCIe/SATA lanes, case drive bays, fan/header counts,
PSU physical length/form factor, radiator thickness/GPU interference, cooler RAM
clearance, monitor ports, UPS runtime, firmware tuning or real thermal behavior.
Review exact manufacturer documents before purchase. Optional peripherals have no
compatibility rules in this version. SAMPLE parts have no benchmark data; the UI
shows a qualitative bottleneck hint labelled estimate, not fabricated FPS numbers.

## Tests

`tests/unit/compatibility.test.ts` covers each rule's successful boundary, conflict
and missing-data status; BIOS warning/error/unknown, mixed RAM, multiple module/kit
quantities, M.2 SATA routing, slot/port exhaustion, duplicate 8-pin requirements,
12VHPWR, EPS/PCIe separation, power headroom, missing TDP and optional GPU behavior.
Reference and server tests cover malformed/oversized/tampered input, unknown IDs,
single-slot normalization, price recalculation and insufficient stock. Playwright
selects parts, exposes a socket conflict, fixes it, reaches healthy, persists and
round-trips the shared build at 360/768/1024/1440px.

## Phase 4 handoff to commerce

The engine is unchanged. Add whole build to cart uses selected IDs/quantities only,
then re-resolves stock/prices server-side. Checkout revalidates inventory and pricing;
it does not convert an engine pass into a manufacturer guarantee. Saved account builds
store references, and restore/public quote views resolve fresh catalog values. Public
quotes may contain incomplete builds and are explicitly indicative, not purchase promises.
