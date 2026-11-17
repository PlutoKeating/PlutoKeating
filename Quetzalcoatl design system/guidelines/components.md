# Component specifications

Every component reads its values from the tokens in `tokens/`. Styles live in `components/components.css`; the JSX files are thin wrappers.

## Actions

### Button
Capsule key for the main actions of a view; presses down 2px like a hardware key.

- **Anatomy** — Capsule container, keyline, optional leading/trailing icon, label.
- **Variants & sizes** — primary, accent, secondary, ghost, danger · sm 28, md 36, lg 44, xl 56.
- **States** — rest, hover (lighter fill), active (2px travel, shadow collapses), focus-visible (sky ring), disabled (40%), loading (LED chase).
- **Interaction** — Travel takes 80ms; colour 140ms. No scale, no glow.
- **Accessibility** — Native button. Loading sets aria-busy. Use lg or larger on touch for a 44px target.
- **Usage** — One primary per view. Accent for a second strong action, secondary for the rest, ghost inside dense toolbars.

### IconButton
Round key holding a single icon; use for compact, well-known actions.

- **Anatomy** — Circle, keyline, centred icon.
- **Variants & sizes** — neutral (ivory), primary (amber), chrome (anodized), ghost · sm 28, md 36, lg 44.
- **States** — rest, hover, active (2px travel), focus-visible, disabled.
- **Interaction** — Same key travel as Button.
- **Accessibility** — aria-label is required; pair with Tooltip when the icon is not universal.
- **Usage** — Chrome is reserved for hardware-like controls (transport, close on media).

## Forms

### Input
Single-line text field set in a sunken well.

- **Anatomy** — Label (mono caps), well with small nose corner, hint or error line.
- **Variants & sizes** — sm 28, md 36, lg 44.
- **States** — rest, hover (strong border), focus (sky ring + border), filled, disabled, error (2px red border + message).
- **Interaction** — Border colour eases over 140ms; no floating labels.
- **Accessibility** — Label is bound with htmlFor; error sets aria-invalid and aria-describedby.
- **Usage** — Always show a label. Placeholder is an example, never the label.

### Textarea
Multi-line text field; resizes vertically.

- **Anatomy** — Label, well, hint or error line.
- **Variants & sizes** — One size; height set by rows (min 96px).
- **States** — rest, hover, focus, disabled, error.
- **Interaction** — Vertical resize handle only.
- **Accessibility** — Same labelling as Input.
- **Usage** — Use when more than one sentence is expected.

### Select
Native select in the same well as Input, with a caret.

- **Anatomy** — Label, well, caret icon, native option list.
- **Variants & sizes** — One size (36).
- **States** — rest, hover, focus, disabled, error.
- **Interaction** — Uses the platform picker, so it works with touch and keyboard for free.
- **Accessibility** — Native select semantics.
- **Usage** — For 5+ mutually exclusive options. For actions use Dropdown; for 2 to 4 options use Radio.

### Checkbox
Square tick box for independent on/off choices in a list.

- **Anatomy** — 18px square well, tick, label.
- **Variants & sizes** — One size.
- **States** — unchecked, hover, checked (amber + ink tick), indeterminate, focus-visible, disabled.
- **Interaction** — Tick scales in with the eject curve (140ms).
- **Accessibility** — Native checkbox; whole label is the hit area (28px min height).
- **Usage** — Use for multi-select. A single immediate setting is a Switch.

### Radio
Round selector for one choice out of a small set.

- **Anatomy** — 18px circle well, dot, label.
- **Variants & sizes** — One size.
- **States** — unchecked, hover, checked, focus-visible, disabled.
- **Interaction** — Dot scales in with the eject curve.
- **Accessibility** — Native radio; group with fieldset + legend; arrow keys move selection.
- **Usage** — 2 to 4 options, all visible. More than that: Select.

### Switch
Sliding toggle with an anodized thumb for settings that apply immediately.

- **Anatomy** — 42×24 pill track (well), anodized thumb, label.
- **Variants & sizes** — One size.
- **States** — off, on (amber track), focus-visible, disabled.
- **Interaction** — Thumb travels 18px in 220ms with a slight overshoot.
- **Accessibility** — Native checkbox with role="switch".
- **Usage** — Only for instant effects. If a Save button follows, use Checkbox.

### Slider
Range control with an anodized thumb and amber fill.

- **Anatomy** — 6px track, amber fill, 20px anodized thumb.
- **Variants & sizes** — One size.
- **States** — rest, active (thumb grows 12%), focus-visible, disabled.
- **Interaction** — Fill follows the thumb with no easing; value is live.
- **Accessibility** — Native range input; arrow keys step. Provide label.
- **Usage** — For approximate values. Pair with a numeric readout when precision matters.

## Navigation

### NavBar
Top navigation bar: wordmark, primary links, trailing actions.

- **Anatomy** — Wordmark (display, expanded), link row, actions; sits on a 2px rule.
- **Variants & sizes** — One variant; wraps below 768px.
- **States** — link rest, hover (bar draws in from left), current (4px amber bar), focus-visible.
- **Interaction** — The bar draws in over 220ms from the left edge.
- **Accessibility** — nav landmark with aria-label; current link gets aria-current="page".
- **Usage** — Up to 6 destinations. Deeper structure goes to Tabs or Breadcrumb.

### Tabs
Folder tabs that switch between sibling views.

- **Anatomy** — Row of folder tabs standing on a 2px rule; selected tab is filled with the rule colour.
- **Variants & sizes** — One size (36).
- **States** — rest, hover (lifts 2px), selected, focus-visible, disabled.
- **Interaction** — Left/Right arrows move selection; panel swaps instantly.
- **Accessibility** — role="tablist"/"tab" with aria-selected and roving tabindex.
- **Usage** — 2 to 6 peer views. Never nest tabs.

### Breadcrumb
Mono path trail showing where the page sits.

- **Anatomy** — Ordered list of links separated by slashes; last item is plain text.
- **Variants & sizes** — One size (12px mono).
- **States** — link rest, hover (underline + highlight), current.
- **Interaction** — None beyond link hover.
- **Accessibility** — nav aria-label="Breadcrumb"; current item has aria-current="page".
- **Usage** — Only when hierarchy is 3+ levels deep.

### Menu
Floating resin sheet listing actions.

- **Anatomy** — Resin sheet, 32px rows: icon, label, shortcut; separators.
- **Variants & sizes** — One size.
- **States** — row rest, hover/focus (amber fill), disabled, danger (red on hover).
- **Interaction** — Appears with the eject curve in 220ms.
- **Accessibility** — role="menu"/"menuitem"; arrow keys move focus, Esc closes (handled by Dropdown).
- **Usage** — Actions only. For choosing a value use Select.

### Pagination
Numeric page stepper set in expanded numerals.

- **Anatomy** — Previous, page numerals with gaps, next.
- **Variants & sizes** — One size (32).
- **States** — rest, hover, current (amber disc with keyline), disabled ends.
- **Interaction** — Instant.
- **Accessibility** — nav aria-label="Pagination"; current has aria-current="page"; arrows are labelled.
- **Usage** — Use when total is known. For feeds prefer a "Load more" Button.

## Feedback

### Badge
Small pill that reports status or a count.

- **Anatomy** — Pill, LED dot, mono caps label.
- **Variants & sizes** — neutral, success, warning, danger, info, count · one size (22).
- **States** — Static.
- **Interaction** — None; it is not pressable.
- **Accessibility** — Tone is always paired with text; never colour alone.
- **Usage** — Status and counts. For user-applied labels use Tag.

### Tag
Square-cornered label for categories and filters; can be selected or removed.

- **Anatomy** — Rectangle (2px corners), label, optional remove button.
- **Variants & sizes** — outline, solid · one size (26).
- **States** — rest, selected, remove hover.
- **Interaction** — Remove fades the tag out in 140ms (consumer-driven).
- **Accessibility** — Remove button is labelled "Remove <tag>".
- **Usage** — Categories, filters, metadata. Square corners separate it from Badge and Button.

### Tooltip
Short mono caption that names a control on hover or focus.

- **Anatomy** — Trigger wrapper, resin caption above it.
- **Variants & sizes** — One size.
- **States** — hidden, visible (hover or focus-within).
- **Interaction** — Rises 4px and fades in over 140ms; no delay on focus.
- **Accessibility** — role="tooltip", linked with aria-describedby; never the only source of essential info.
- **Usage** — Names for icon-only controls. No interactive content inside; use Popover for that.

### Alert
Inline message that stays in the page flow, marked by a solid icon tile.

- **Anatomy** — Icon tile (solid state colour), title, message, optional dismiss.
- **Variants & sizes** — info, success, warning, danger.
- **States** — Static; dismissible.
- **Interaction** — None on entry; it belongs to the page.
- **Accessibility** — role="alert" for danger/warning, role="status" otherwise. Icon + title carry the meaning, not colour.
- **Usage** — Conditions tied to the content below it. Transient confirmations are Toasts.

### Toast
Transient resin sheet confirming something that just happened.

- **Anatomy** — Resin sheet, LED, title, text, dismiss, drain bar.
- **Variants & sizes** — success, info, warning, danger.
- **States** — entering, resting, draining, dismissed.
- **Interaction** — Ejects up from the corner in 360ms; the bar drains over 5s; hover should pause (consumer).
- **Accessibility** — Region is aria-live="polite"; danger toasts use role="alert". Never put the only copy of important info in a toast.
- **Usage** — Confirmations and background results. Stack at most three in .md-toast-region.

### Progress
Segmented bar that fills in steps, like an early download meter.

- **Anatomy** — Sunken track, stepped fill, 8px segment mask.
- **Variants & sizes** — determinate, indeterminate · sm 6, md 12.
- **States** — in progress, complete (success tone).
- **Interaction** — Fill advances in discrete steps; indeterminate block chases across in 14 steps.
- **Accessibility** — role="progressbar" with aria-valuenow; give it a label.
- **Usage** — Use for waits over 1s with known or unknown length. Under 1s, show nothing.

### Skeleton
Placeholder block shown while content loads; a sunbeam sweeps across it.

- **Anatomy** — Tinted block with a moving light band.
- **Variants & sizes** — line (14px), block (nose corner), circle.
- **States** — loading.
- **Interaction** — Light band crosses in 1.8s; disabled under reduced motion.
- **Accessibility** — aria-hidden; the container should carry aria-busy.
- **Usage** — Mirror the final layout. Do not use for waits under 300ms.

## Display

### Icon
Phosphor regular icon by name.

- **Anatomy** — Glyph from the Phosphor regular set (1.5px stroke on a 24 grid, round joins).
- **Variants & sizes** — 16, 20, 24, 32.
- **States** — Inherits text colour.
- **Interaction** — None.
- **Accessibility** — Decorative by default (aria-hidden); pass label to expose it.
- **Usage** — Icons accompany labels. Icon-only is allowed for universal actions.

### Card
A plate with one rounded "nose" corner that groups related content.

- **Anatomy** — Plate with 2px corners and a 28px top-right nose; free content.
- **Variants & sizes** — plate, outline, paper, colour blocks (amber, orange, blue, green, sky).
- **States** — rest; interactive: hover (lifts up-left, shadow falls lower-right), active, focus-visible.
- **Interaction** — Lift takes 220ms with the eject curve.
- **Accessibility** — If interactive, render as a link or button and keep one focus stop.
- **Usage** — Not every group needs a card: prefer rules and whitespace. Colour blocks are for emphasis, one or two per view.

### Avatar
Round portrait or initials with a keyline.

- **Anatomy** — Circle, keyline, image or initials, optional status LED.
- **Variants & sizes** — sm 24, md 36, lg 56 · five tones.
- **States** — Static.
- **Interaction** — None.
- **Accessibility** — Image alt is the name; initials carry aria-label.
- **Usage** — Group with .md-avatar-group (overlap 10px).

### Image
Framed picture with a nose corner, optional duotone treatment and mono caption.

- **Anatomy** — Frame (keyline, nose corner), image or placeholder, caption.
- **Variants & sizes** — natural, duotone · any ratio.
- **States** — loaded, placeholder.
- **Interaction** — None.
- **Accessibility** — alt is required for meaningful images.
- **Usage** — Photography should be sunlit and high-key. Duotone is for editorial moments, not thumbnails.

### Table
Ruled data table: mono caps header on a 2px rule, hairline rows.

- **Anatomy** — Header row (mono caps, 2px rule), body rows (hairlines), numeric cells right-aligned in mono.
- **Variants & sizes** — default, dense.
- **States** — row rest, hover, selected (amber tint).
- **Interaction** — Row tint eases in 140ms.
- **Accessibility** — Native table semantics with th scope="col"; wrap scrolls horizontally on small screens.
- **Usage** — Comparable records only. No zebra stripes, no vertical rules.

### List
Hairline-ruled list with optional leading index numerals.

- **Anatomy** — Row: index, title, meta (right, mono), description.
- **Variants & sizes** — plain, ordered.
- **States** — rest; linked rows: hover, focus-visible.
- **Interaction** — Linked rows tint on hover.
- **Accessibility** — ul/ol semantics; linked rows are anchors.
- **Usage** — Sequences, agendas, settings groups. Use Table when columns need comparing.

### Divider
Rule between sections: hairline, strong, horizon or labelled.

- **Anatomy** — A single rule; horizon adds a 96×4 amber lead; labeled centres a mono caption.
- **Variants & sizes** — hair, strong (2px), horizon, labeled, vertical.
- **States** — Static.
- **Interaction** — None.
- **Accessibility** — hr semantics; labeled uses role="separator".
- **Usage** — Strong rules open sections, hairlines separate rows, horizon marks a chapter start.

### EmptyState
Sun rising over a horizon line, with a title, a sentence and one action.

- **Anatomy** — Half sun on a horizon rule, title, text, action.
- **Variants & sizes** — One.
- **States** — Static; the sun rises once on mount.
- **Interaction** — Sun rises 48px in 640ms with overshoot.
- **Accessibility** — Illustration is decorative; title is a heading.
- **Usage** — Say what will appear and how to start. One action only.

## Overlays

### Dialog
Paper sheet centred over the page. modal (default) blocks the page with a scrim; non-modal leaves it usable.

- **Anatomy** — Scrim, paper sheet with 48px nose, eyebrow, title, close, body, footer.
- **Variants & sizes** — Modal (scrim, blocking) and Dialog (no scrim) · width 520 max.
- **States** — closed, opening, open, closing.
- **Interaction** — Sheet ejects up 16px in 360ms; scrim fades in 220ms. Esc and scrim click close.
- **Accessibility** — role="dialog", aria-modal, aria-labelledby; focus moves in on open and returns on close.
- **Usage** — Decisions that must be made now. Long forms belong in a Drawer or page.

### Drawer
Paper panel that slides in from the edge like a disc tray, for side tasks that keep page context.

- **Anatomy** — Scrim, full-height paper panel (400 max), header, scrolling body, footer.
- **Variants & sizes** — right, left.
- **States** — closed, opening, open.
- **Interaction** — Tray slides in over 360ms with a small overshoot. Esc and scrim click close.
- **Accessibility** — role="dialog" aria-modal; focus moves in and returns.
- **Usage** — Detail views, filters, multi-field edits. On phones it covers 92% width.

### Dropdown
A button that opens a Menu of actions beneath it.

- **Anatomy** — Trigger Button with caret, Menu sheet anchored below.
- **Variants & sizes** — start, end alignment; any Button variant.
- **States** — closed, open.
- **Interaction** — Menu ejects from its top-left corner in 220ms. Closes on select, outside click and Esc.
- **Accessibility** — Trigger has aria-haspopup="menu" and aria-expanded.
- **Usage** — 3 to 8 related actions. Fewer: show Buttons.

### Popover
Resin sheet anchored to a trigger, for short supporting content or a few controls.

- **Anatomy** — Trigger, resin sheet (320 max) anchored below.
- **Variants & sizes** — start, end alignment.
- **States** — closed, open.
- **Interaction** — Ejects in 220ms; closes on outside click and Esc.
- **Accessibility** — Sheet is role="dialog" (non-modal); trigger wrapper has aria-expanded.
- **Usage** — Explanations, small forms, pickers. For names of controls use Tooltip.
