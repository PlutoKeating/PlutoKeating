---
name: PlutoKeating — Quetzalcoatl
description: A permanently dark personal archive with Workshop Orange and Amber accents.
colors:
  ground: "#202020"
  sunken: "#161616"
  plate: "#2D2D2B"
  text: "#F6EFDD"
  ink: "#0E0E0E"
  amber: "#FFB000"
  orange: "#FF4A1C"
typography:
  display:
    fontFamily: "Archivo, Noto Sans SC, Noto Sans CJK SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(44px, 5vw, 72px)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, Noto Sans SC, Noto Sans CJK SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  plate: "2px 28px 2px 2px"
  large-plate: "2px 48px 2px 2px"
  key: "999px"
spacing:
  gutter: "24px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.key}"
    padding: "12px 24px"
  button-contact:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.key}"
    padding: "12px 24px"
---

# Design System: PlutoKeating — Quetzalcoatl

## Overview

**Creative North Star: "Ten O’Clock Sun"**

Quetzalcoatl supplies the underlying shape, type and physical-control language. The user explicitly superseded the initial light/dark composition: every page surface now stays dark, Workshop Orange and Amber form the primary accent pair, and project cards carry more purposeful decoration. The site prioritizes works, preserves all README-driven data, and uses the existing sunlit personal photograph. Source reference: `Quetzalcoatl design system/readme.md`, tokens, component specifications and showcase. Shipping tokens are copied under `site/design-system/quetzalcoatl/` so builds do not depend on an untracked reference folder.

## Colors
Charcoal ground frames darker catalog, search, contact and activity surfaces. Every project uses a raised charcoal plate with warm ivory text. Workshop Orange marks the wordmark, selected folder, contact key, portrait rule and alternating card accents; Amber marks primary keys, headline emphasis, counts and focus rings. Warm accent controls use ink text. Small card action labels use the lighter orange-300 or amber-300 shade for contrast; icon accents retain the full orange-500 or amber-500. The dark color scheme persists even when the operating system prefers light mode. The original paper, blue and sky composition is superseded; the copied brand token files remain reference primitives, while site/input.css supplies the user-directed dark override.

## Typography
Self-hosted Archivo at normal width, IBM Plex Mono for languages and counts, Instrument Serif italic for one phrase in the introduction. Chinese uses Noto Sans SC / Noto Sans CJK SC / native CJK sans fallbacks. Do not stretch type. Fonts and OFL license files ship from `site/fonts/`.

## Layout
1440px maximum container; margins clamp from 20px to 72px. Intro uses a 7/4 asymmetric split. Live works use three columns, two at 1080px, one at 768px. Other works use two columns of decorated plates with 20px gaps, one column on mobile. All navigation remains available on mobile. Category items are anchor links styled as folder tabs, not ARIA tabs.

## Elevation & Depth
Keys use the system's 2px physical underside and 80ms travel. Plates carry sharp top and bottom edge light. Live-project icon tiles add a compact lower-right shadow. The search well uses an inset shadow. Reduced motion reduces transition and animation duration to 1ms and disables smooth scrolling.

## Shapes
Only top-right corners are broadly rounded on plates. Pressable primary actions are capsules. Folder navigation uses two top corners. Preserve the original unmodified portrait within a dark keylined frame and orange caption rule.

## Components
Every category uses dark project plates, purpose-related inline SVG symbols, language badges, category labels and evidence-backed status or star counts. Live projects add a 132px dark icon header with a 76px orange/amber tile; other cards use 48px outlined symbol tiles. Cards lift 2px and show their warm accent on hover. Language badges use compact dark wells; status uses warm text and live-project status has a capsule outline. Orange selected folder links and amber focus rings maintain navigation contrast. Project title links extend across each project surface; source and upstream links remain independently clickable and keyboard reachable. Search updates a live result count and offers a clear action in the empty state. External statistics fall back to named GitHub links on image errors. The contribution chart scrolls to its latest months on small screens.

## Do's and Don'ts
Keep all page surfaces dark and use Workshop Orange and Amber as the primary accents. Use legible normal-width type, purposeful card decoration, real project facts and real links. Do not restore the superseded paper/blue/sky composition or invent statistics. README.md remains the only project data source. Preserve all six categories and search behavior when extending the archive.

### Catalog navigation refinement
The project archive heading, search and category links form one sticky toolbar below the site header, scoped to the catalog. ResizeObserver measures both bars so anchor offsets follow actual desktop/mobile heights. Active sections follow the visible reading boundary. Orange-filled selected categories and contact actions use white lettering with a black text shadow, explicitly requested by the user. Amber actions retain dark ink.

Orange-filled text controls share white 700-weight lettering, 16px on desktop and 14px on mobile, with a restrained `0 1px 1px rgb(0 0 0 / 65%)` shadow.
