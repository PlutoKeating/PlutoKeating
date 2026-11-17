# Quetzalcoatl design system

> The Future Was Once Real. And It Can Be Real Again.

A from-scratch design system built from a written manifesto (no codebase, Figma file or brand assets were supplied). It asks: if the era that believed in the future, roughly 1980 to 2003, had simply continued, what would its design language look like today? The answer is a sunlit, optimistic system: Stone Charcoal ground, Warm Ivory paper, saturated sun and sky colours, expanded grotesque type and hardware-like controls.

**Source:** the user's manifesto "MILLENNIUM DREAMCORE — A DESIGN SYSTEM MANIFESTO" (pasted text, nine parts). No logo was provided; the name is set in plain type wherever a mark would go.

## Art direction — "Ten O'Clock Sun"

Everything is lit by a sun sitting at ten o'clock. Five signatures make the system recognisable without borrowing from any single brand:

1. **The nose corner.** Plates are square (2px) with exactly one large rounded corner, top-right. Never four equal radii on a container.
2. **Keys and keylines.** Things you press are capsules or circles with a 1.5px ink keyline and 2px of physical travel.
3. **Two grounds.** Stone Charcoal (#202020) is the structure; Warm Ivory paper and full colour blocks are laid on it at large scale so charcoal never dominates.
4. **Floating layers are sunlit.** Menus, popovers, toasts and tooltips are ivory resin sheets, lighter than whatever is beneath them. Dialogs and drawers are paper.
5. **Clear type with one italic voice.** Archivo at normal width for display and body, IBM Plex Mono for technical labels, Instrument Serif italic for a single romantic phrase per view. Legibility always comes first.

## Design principles

1. **Light comes from somewhere.** One light source. Shadows fall lower-right, highlights sit on top edges. If an effect has no light logic, remove it.
2. **Colour at full strength.** Use accents at token value, in large flat fields. Never tint them toward grey to look "retro".
3. **Controls are objects.** A control should look like the thing it does: keys travel, switches slide, trays eject. Feedback is physical and under 100ms.
4. **One loud thing per view.** Each view gets a single oversized element (a headline, a numeral, a colour field). Everything else is quiet and ruled.
5. **Rules before boxes.** Separate with hairlines, 2px rules and whitespace first. Reach for a card only when content must move as a unit.
6. **Every mark has a job.** No decorative labels, ticks, grids or icons. If removing it loses no information, remove it.
7. **Legibility is the first priority.** When character and readability conflict, readability wins: no stretched, condensed or tightly packed letterforms.
8. **Readable by anyone.** 4.5:1 text contrast, visible focus on every control, colour never the only signal.

## CONTENT FUNDAMENTALS

- **Voice:** an engineer who is excited about the thing. Plain, confident, present tense. "Route saved." "Plan a route." Not "Oops!" and not "Leverage".
- **Person:** address the user as "you"; the product does not say "I" or "we" in UI.
- **Casing:** sentence case for headings, buttons and labels. ALL CAPS only for mono technical labels (set by CSS, not typed).
- **Numbers:** always numerals, tabular; units in mono ("3h 28m", "220ms"). Figures are labelled "FIG. 01".
- **Bilingual:** Chinese and English may sit together; Chinese carries the body, English the display line or label. No mixed-language sentences.
- **Punctuation:** em dashes rarely; no exclamation marks in UI; no emoji anywhere.
- **Examples:** Button "Plan a route" · Empty state "No routes yet. Your saved routes will appear here." · Error "Gate not found." · Toast "Route saved — LHR → JFK, 3h 28m."

## VISUAL FOUNDATIONS

- **Colour:** ground #202020; paper #F6EFDD; Amber #FFB000 is the primary action and highlight; Technical Blue #1E46D6 is the accent action; Workshop Orange #FF4A1C is emphasis and warning; Machine Green #00B26B success; Horizon Sky #9DD9F7 focus and info; Signal Red #D92632 danger; Metallic Silver for anodized parts. Ink (#0E0E0E) text sits on amber, orange, green, sky; ivory text on blue and red.
- **Scopes:** `:root` is the charcoal scope; add `.md-paper` to any container to flip all semantic tokens to the ivory scope. Add `.md-charcoal` to a dark container nested inside paper to restore the dark tokens. A page should alternate scopes and colour fields; aim for no more than about half charcoal.
- **Type:** Archivo at normal (100%) width throughout; never use the expanded or condensed cuts. Display 700 / -0.02em / line-height 1.0. Headings 700 to 750. Body 15px / 1.55. Labels IBM Plex Mono 11px caps +0.12em. Serif italic is used for one phrase, never for UI.
- **Spacing:** 4px base scale (2 to 128). Sections breathe at 96 to 128; components pack at 8 to 16.
- **Backgrounds:** flat colour fields. Allowed textures: halftone dots and pinstripes (tokens), used on at most one field per view. No photographic backgrounds behind text, no multi-hue gradients.
- **Imagery:** sunlit, high-key photography of objects, sky, architecture; warm colour, visible grain acceptable. Duotone treatment = greyscale multiplied over amber. Always framed with a keyline and nose corner. None is bundled; placeholders are striped.
- **Shape:** 2px corners everywhere, one 14/28/48px nose corner per plate, pills and circles for pressables, folder tabs (10px top corners).
- **Borders:** hairline 1px (alpha) for rows; 1.5px ink keyline around pressables and paper; 2px strong rule opens sections; 4px bar marks the current nav item.
- **Edge light:** every solid surface carries a 1px sharp highlight on its top edge and a 1px sharp shade on its bottom edge (`--md-edge-light`, `--md-edge-shade`, `--md-edge-plate`, `--md-edge-drop`). Hairline only, never blurred, never coloured. Soft shadows also get a 1px hard contact line.
- **Shadow & elevation:** five levels. Keys have a hard 2px ink underside. Raised/float/overlay use one soft directional shadow offset to the lower right. Wells use an inset top shadow. No glow, no coloured shadow.
- **Materials:** paint (flat accent), paper (ivory), anodized (silver gradient; only on thumbs and chrome icon buttons), resin (92% ivory + blur; only on floating sheets). Pinstripe and halftone are print textures for large fields.
- **Transparency & blur:** only resin sheets and the scrim. Never glass cards.
- **Motion:** 80ms key travel, 140ms colour, 220ms toggles, 360ms sheets, 640ms once-per-page scenes. Eject curve (slight overshoot) for anything that arrives; click curve for presses. Loading is stepped (LED chase, segmented bar), skeletons get a sunbeam sweep. Reduced motion collapses all durations.
- **Hover:** lighter fill for keys, strong border for wells, bar draw-in for nav, 2px lift for tabs and interactive cards. **Press:** 2px downward travel, shadow collapses. **Focus:** 2px Horizon Sky ring (Technical Blue on paper), 3px offset.
- **Layout:** 12 columns, 24px gutter, page margin clamp(20px, 5vw, 72px), containers 680 / 1200 / 1440. Breakpoints 480, 768, 1080, 1440. Compositions are asymmetric: 7/5 or 8/4 splits, oversized type hanging off the left margin.
- **Cards:** plate with nose corner, hairline alpha border, no shadow at rest. Colour-block cards get an ink keyline.

## ICONOGRAPHY

- **Set:** Phosphor Icons, regular weight, loaded from CDN as an icon font (`<i class="ph ph-airplane-tilt">`). This is a substitution chosen for its 1.5px rounded stroke on a 24 grid, which matches the keyline; no custom icon set exists.
- **Sizes:** 16 (inline, sm controls), 20 (default), 24 (lg controls), 32 (feature). Icons inherit text colour and align to the text baseline box.
- **Rules:** icons accompany labels; icon-only is for universal actions and needs an aria-label. No emoji, no unicode glyphs as icons (the breadcrumb slash and pagination ellipsis are typographic exceptions). No filled or duotone weights.

## Index

- `styles.css` — single entry point; imports everything below.
- `tokens/` — `fonts.css`, `colors.css` (primitive + semantic + paper scope), `typography.css`, `scale.css` (spacing, sizing, layout, radius, border, shadow, elevation, opacity, material, motion, z-index), `base.css`.
- `components/components.css` — all component styles (`.md-*` classes).
- `components/<group>/` — React wrappers with `.d.ts` and `.prompt.md`:
  - actions: Button, IconButton
  - forms: Input, Textarea, Select, Checkbox, Radio, Switch, Slider
  - navigation: NavBar, Tabs, Breadcrumb, Menu, Pagination
  - feedback: Badge, Tag, Tooltip, Alert, Toast, Progress, Skeleton
  - display: Icon, Card, Avatar, Image, Table, List, Divider, EmptyState
  - overlays: Dialog (modal and non-modal), Drawer, Dropdown, Popover
- `guidelines/components.md` — anatomy, variants, states, interaction, accessibility and usage for every component.
- `guidelines/*.html` — foundation specimen cards.
- `Showcase.dc.html` — the design manual: ten chapters from art direction to application examples.
- `SKILL.md` — agent skill manifest.

## Caveats

- Fonts are Google Fonts loaded by URL (Archivo, Instrument Serif, IBM Plex Mono, Noto Sans/Serif SC); no font binaries are bundled.
- No logo, photography or illustration was supplied, so none is included.
- "Modal" in the brief is delivered as `Dialog` with `modal` (default true); "Navigation" as `NavBar`. `Icon` is an intentional addition wrapping the Phosphor glyph set.
