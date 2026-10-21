# Dark Glass

Background #07090D; foreground #F4F7FA; muted text #A6B0BF; cyan #22D3EE.
Surface white at 5%, strong surface 9%, border white at 10%. Violet is only a
subtle gradient stop. Success, warning and danger have text labels as well as color.

Space Grotesk is display, Inter is UI, Noto Sans Bengali is Bangla via next/font.
Prices use tabular numbers and BDT formatting such as ৳ 85,500. No sample prices
or stock claims are needed in the foundation.

Glass appears only on the navbar, modal/drawer surfaces and featured cards (future
builder summary allowed). Use 16px blur, a border, soft shadow and inner highlight;
opaque backgrounds are the fallback. Ordinary sections and footer stay solid.

All interactive targets are at least 44px. Cyan focus outlines are visible and
offset from controls. A skip link moves keyboard users to the main content.
Reduced motion disables animations and smooth scrolling. Responsive layouts must
fit 360/768/1024/1440 widths without hiding overflow to conceal layout defects.

Buttons: primary cyan, secondary solid, outline, ghost, destructive and link.
Shared Badge is local, not an extra shadcn registry install. EmptyState, ErrorState
and Skeleton support future views; actual catalog/data flows remain deferred.
The geometric F mark, wordmark and PC concept diagram are original project assets.

## Phase 2 catalog additions

Catalog cards and filters use solid surfaces; glass remains restricted to the navbar,
drawers/dialogs and featured build cards. Neutral geometry SVG placeholders are original
and are explicitly not product photographs. Product headings, price captions and
availability captions identify SAMPLE data independently of the page notice.

Catalog uses one column on mobile, two at tablet widths, and three within the desktop
sidebar layout. Filters move to a labelled sheet below 1024px. Comparison rows stack
by product on mobile instead of forcing a wide horizontally scrolling table. The
brand strip wraps; there is no decorative marquee animation. FAQ uses native details
and use-case tabs use the existing accessible shadcn primitive. Prices use tabular
numbers and specification tables wrap long values. Skeletons and local error/empty
states cover new routes; unknown specifications are visibly distinct from compatibility.

## Phase 3 builder

Desktop uses a 1.85:1 component/summary grid with a sticky glass summary. Below 1024px,
the summary becomes a sticky bottom glass bar and a labelled bottom sheet. Picker is
a focus-trapped modal above 640px and a full-viewport dialog below it; quick view is a
separate sheet. Rows remain solid, with neutral original placeholders and spec chips.
Status icons have accessible text and focusable explanation tooltips. Known conflicts
use danger borders and dimmed illustrations while keeping explanatory text readable.

The SVG semicircle gauge sits inside the glass summary; numbers and recommendations
are textual as well as visual. Price updates use a brief opacity/translation entrance,
not decorative continuous motion. Global reduced-motion rules disable these transitions.
Print hides navigation/actions, shows component rows and includes a dedicated summary.
Filters and quantity controls have visible labels and minimum 44px target heights.

## Phase 4 commerce and quote presentation

Account/cart/checkout use solid cards, visible native labels, keyboard focus and the
same 44px control minimums. Payment methods are explicit: COD selectable, other methods
visibly coming soon and disabled. SAMPLE notices appear on review and confirmed orders;
confirmation never says paid. Public build quotes show original FUTERA branding,
server-derived line prices, date, subtotal, share QR and a browser Print / Save as PDF
control. Print removes navigation/actions and turns the wordmark black for white paper.
All commerce routes have loading/error boundaries; empty cart/account sections are explicit.
