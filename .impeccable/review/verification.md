# Verification — Quetzalcoatl redesign

- `npm run build`: passed; 22 projects generated from the unchanged README.
- `node --check site/app.js` and `node --check scripts/build-site.mjs`: passed.
- `git diff --check`: passed.
- Headless Chromium at 1440, 390, and 320 pixels: document width equals viewport, no horizontal page overflow.
- Search `gogogo`: one matching project; unmatched query: zero sections and visible empty state; clear action: all 22 restored and search focused.
- Reduced motion: smooth scrolling disabled.
- Browser runtime errors: none.
- Local Archivo variable font loads; font file verified as WOFF2 with weight axis 100–900.
- Full-page captures load lazy images explicitly before capture. External streak SVG animations disabled via provider parameter to prevent its text remaining transparent.
- Mechanical detector's only warning was unresolved `/style.css` relative to source template, falsely treating headings as 16px. Computed implementation and rendered screenshots show distinct sizes.
- Visual reviewer verdict: ship; documentation independently checked.

Preview command: `npm run dev` (port 4173).

## User-directed dark revision

The user rejected the light/ruled version. Current captures supersede it: permanently dark charcoal surfaces, Workshop Orange and Amber accents, icon headers and technical badges on all 22 project cards. Tested with OS light preference: computed `color-scheme` remains `dark` and all primary surfaces remain charcoal. Small orange text uses orange-300 (5.94:1 on card ground); solid icons/edges retain orange-500. Build, 1440/390/320 overflow checks, search/reset, reduced motion and zero runtime errors reconfirmed. Independent revision review: ship with contrast fix applied.

## Sticky catalog and orange typography
Catalog heading/search/categories now stay together below the site header within the catalog. Category navigation uses measured bar heights; selected category and orange contact button use white text plus black shadow. Browser checks click Learning and Embedded at 1440/390/320, verify sticky alignment, visible section heading, active state, typography and no overflow, and verify release at Contact.
