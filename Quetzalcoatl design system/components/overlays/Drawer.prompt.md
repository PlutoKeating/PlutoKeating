Paper panel that slides in from the edge like a disc tray, for side tasks that keep page context.

```jsx
<Drawer open={open} onClose={close} title="Passenger details">…</Drawer>
```

## Props
- `open`: `boolean`
- `onClose`: `() => void`
- `title`: `string`
- `eyebrow`: `string`
- `side`: `'right'|'left'`
- `children`: `React.ReactNode`
- `footer`: `React.ReactNode`

## Specification
- **Anatomy** — Scrim, full-height paper panel (400 max), header, scrolling body, footer.
- **Variants & sizes** — right, left.
- **States** — closed, opening, open.
- **Interaction** — Tray slides in over 360ms with a small overshoot. Esc and scrim click close.
- **Accessibility** — role="dialog" aria-modal; focus moves in and returns.
- **Usage** — Detail views, filters, multi-field edits. On phones it covers 92% width.
