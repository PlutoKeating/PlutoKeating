Paper sheet centred over the page. modal (default) blocks the page with a scrim; non-modal leaves it usable.

```jsx
<Dialog open={open} onClose={close} title="Cancel this flight?" footer={<><Button variant="ghost" onClick={close}>Keep</Button><Button variant="danger">Cancel flight</Button></>}>Seats are released immediately.</Dialog>
```

## Props
- `open`: `boolean`
- `onClose`: `() => void` — Called on Esc, scrim click and close button.
- `title`: `string`
- `eyebrow`: `string` — Mono caps line above the title.
- `children`: `React.ReactNode` — Body.
- `footer`: `React.ReactNode` — Buttons, right-aligned; primary last.
- `modal`: `boolean` — Default true. false removes the scrim (plain Dialog).

## Specification
- **Anatomy** — Scrim, paper sheet with 48px nose, eyebrow, title, close, body, footer.
- **Variants & sizes** — Modal (scrim, blocking) and Dialog (no scrim) · width 520 max.
- **States** — closed, opening, open, closing.
- **Interaction** — Sheet ejects up 16px in 360ms; scrim fades in 220ms. Esc and scrim click close.
- **Accessibility** — role="dialog", aria-modal, aria-labelledby; focus moves in on open and returns on close.
- **Usage** — Decisions that must be made now. Long forms belong in a Drawer or page.
