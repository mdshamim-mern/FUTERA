# PC compatibility rules — planned contract

No compatibility engine is implemented in Phase 1. Future functions belong in
`src/features/builder/compatibility`, with no UI/DB imports and full unit coverage.

Each check returns `{ status, ruleId, message, messageKey, involved: [partIds] }`.
Status is `ok | warning | error | unknown`. message is plain English; messageKey
is stable and Bangla-ready. Missing specs return unknown, never ok.

| Rule | Required comparison |
| --- | --- |
| cpu-motherboard | Socket equality; chipset/BIOS support warning when update required. |
| motherboard-ram | DDR type, module slots, total capacity and supported speed. |
| motherboard-case | Board form factor supported by case. |
| gpu-case | GPU length versus actual available case clearance. |
| cooler-case | Air cooler height and radiator mounting/size support. |
| cooler-cpu | Socket support and thermal rating. |
| psu-power | Required watts = (CPU TDP + GPU TDP + 100W) × 1.3. |
| psu-connectors | Required 8-pin and 12VHPWR connectors available. |
| storage-board | M.2 slot count/interfaces and SATA port count. |

Test exact boundaries, missing data, multiple parts and shared resource conflicts.
Warnings are not errors; unknown results must remain visible in a build summary.
BIOS evidence and thermal-rating sources need curation before production use.

## Phase 2 specification source

Category-specific catalog schemas now store the inputs for these future checks.
All specification keys are validated and nullable values remain unknown. Featured
builds and build shortlists do not run this engine and explicitly say so. Catalog
comparison is a visual inspection tool, not a compatibility result. Sample power,
clearance and socket values are fictional fixtures, not certified manufacturer data.
