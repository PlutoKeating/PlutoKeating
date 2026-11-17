Round key holding a single icon; use for compact, well-known actions.

```jsx
<IconButton icon="x" label="Close" variant="ghost" />
```

## Props
- `icon`: `string` — Phosphor icon name.
- `label`: `string` — Accessible name (required).
- `variant`: `'neutral'|'primary'|'chrome'|'ghost'` — chrome uses the anodized material.
- `size`: `'sm'|'md'|'lg'`
- `disabled`: `boolean`

## Specification
- **Anatomy** — Circle, keyline, centred icon.
- **Variants & sizes** — neutral (ivory), primary (amber), chrome (anodized), ghost · sm 28, md 36, lg 44.
- **States** — rest, hover, active (2px travel), focus-visible, disabled.
- **Interaction** — Same key travel as Button.
- **Accessibility** — aria-label is required; pair with Tooltip when the icon is not universal.
- **Usage** — Chrome is reserved for hardware-like controls (transport, close on media).
