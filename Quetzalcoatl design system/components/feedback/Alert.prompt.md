Inline message that stays in the page flow, marked by a solid icon tile.

```jsx
<Alert tone="warning" title="Fuel reserve below plan">Recalculate before departure.</Alert>
```

## Props
- `tone`: `'info'|'success'|'warning'|'danger'`
- `title`: `string`
- `children`: `React.ReactNode` — Message.
- `onClose`: `() => void` — Shows a dismiss button.

## Specification
- **Anatomy** — Icon tile (solid state colour), title, message, optional dismiss.
- **Variants & sizes** — info, success, warning, danger.
- **States** — Static; dismissible.
- **Interaction** — None on entry; it belongs to the page.
- **Accessibility** — role="alert" for danger/warning, role="status" otherwise. Icon + title carry the meaning, not colour.
- **Usage** — Conditions tied to the content below it. Transient confirmations are Toasts.
