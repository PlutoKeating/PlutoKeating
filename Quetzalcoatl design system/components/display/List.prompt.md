Hairline-ruled list with optional leading index numerals.

```jsx
<List ordered items={[{ title: "Pre-flight check", meta: "06:10" }]} />
```

## Props
- `items`: `Array<{ title: React.ReactNode; meta?: React.ReactNode; description?: React.ReactNode; href?: string }>`
- `ordered`: `boolean` — Shows 01, 02… in mono.

## Specification
- **Anatomy** — Row: index, title, meta (right, mono), description.
- **Variants & sizes** — plain, ordered.
- **States** — rest; linked rows: hover, focus-visible.
- **Interaction** — Linked rows tint on hover.
- **Accessibility** — ul/ol semantics; linked rows are anchors.
- **Usage** — Sequences, agendas, settings groups. Use Table when columns need comparing.
