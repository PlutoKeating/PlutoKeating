---
name: PlutoKeating — Quetzalcoatl
description: A pitch-black personal archive lit by a fixed ice/amber optical horizon.
colors:
  void: "#000000"
  well: "#0A0A0A"
  ink: "#FFFFFF"
  ink-soft: "#D4D4D4"
  ink-secondary: "#8A8A8A"
  ice: "#BAE6FD"
  amber: "#E5A03D"
typography:
  display:
    fontFamily: "Sora, PingFang SC, Hiragino Sans GB, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(2.8rem, 5.2vw, 4.35rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Sora, PingFang SC, Hiragino Sans GB, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "1rem (17.5px root)"
    fontWeight: 400
    lineHeight: 1.78
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
rounded:
  control: "4px–6px"
  dot: "999px"
spacing:
  gutter: "2.25rem"
  section: "7.5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.void}"
    rounded: "5px"
    padding: "0.56rem 1.1rem"
---

# Design System: PlutoKeating — Quetzalcoatl

## Overview

The site is an instance of the brand system in `Quetzalcoatl design system/` ("五彩斑斓的黑"). It does not vendor or restate the system: `site/input.css` imports the tokens and component CSS straight from that folder, and `scripts/build-site.mjs` copies the system's fonts and `scripts/optics.js` into `dist/`. Read the system's `README.md` and `AGENTS.md` before changing anything visual; this file only records what is specific to the site.

The site prioritises works, keeps `README.md` as the only project data source, and preserves the personal photograph unmodified.

## Colors

Pure `#000000` ground with the system's fixed ice/amber optical horizon and film grain. Text is white and neutral greys. Ice and amber appear only as signals: the LED beside the live-projects heading and the hero caption, the active milestone tick, the amber `>` caret in front of the motto and the activity header, the amber state on a project that still needs attention, and the ice cells for the busiest days of the contribution chart. The portrait is the only saturated image on the page.

One sanctioned exception: the `PlutoKeating` wordmark, in the header and in the hero headline only (`.wordmark` in `site/input.css`). Its letters carry six horizontal bands in the order of the 1977 Apple rainbow (green, yellow, orange, red, purple, blue), each hue lifted in lightness so it glows on black (`#7BD95C`, `#FFCB45`, `#FF9A3D`, `#FF5A5E`, `#C263C4`, `#2DB8F5`) and mixed 91% into white: near full saturation. In the headline the bands are separated by thin transparent slits, after the IBM 8-bar mark; the header is too small for slits and keeps the bands only. Do not apply the bands to any other text.

## Typography

Sora 400 / 500 / 600 and JetBrains Mono 400 / 500, Latin subset, served from `/fonts/` (declared in `site/fonts.css`). Chinese falls back to the system CJK fonts in the brand's stacks. Headings are weight 500; nothing is bold.

## Layout

1180px container. The hero is centred: headline, lead, one white primary action, then a smoked-glass stage with the motto, three figures and the portrait. The project archive is a section whose category row and search form a second sticky navigation bar under the header; its height is measured so anchor offsets stay correct at every width. Each category is a multi-row hairline rail (`.qz-rail.is-grid`): three columns for live projects, two for the rest, one on small screens. Activity is a rail header, the contribution chart on the open canvas, and a two-cell rail. Contact is the system's quiet closing block.

## Elevation & Depth

No shadows. Backdrop blur only on the header, the sticky catalog bar (a navigation bar) and the hero stage. The stage fade starts at 88% instead of the default 76% so the portrait is never dissolved.

## Shapes

4–6px radii on controls, the portrait frame and the search field. Round shapes are reserved for 6px signal dots.

## Components

Project cells have no box: a mono line with languages on the left and stars or status on the right, the title with a direction arrow, the description, and a footer with the source link. The title link covers the whole cell; source and inline links stay independently clickable and keyboard reachable. Hovering a cell adds a 3.5% white fill. Search updates a live result count and offers a clear action in the empty state. Category links are native anchors styled as a segmented control, with the current section marked by `aria-current`; on narrow screens the row scrolls sideways and keeps the current category in view. Remote GitHub statistics use neutral dark badge colours and fall back to a named GitHub link if an image fails. The contribution chart scrolls to its latest months on small screens.

## Do's and Don'ts

Follow the brand's hard rules: black ground, two signal colours used only for meaning, hairlines instead of cards, weight 500 headings, one white primary action per view. Do not add project icons, coloured tags, card backgrounds or decorative accents. Do not invent statistics. Keep all six categories and the search behaviour when extending the archive. If the site needs something the system lacks, add it to the system first (as was done for the search input and the multi-row rail).
