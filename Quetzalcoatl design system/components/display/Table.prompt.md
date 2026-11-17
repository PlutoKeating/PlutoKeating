Ruled data table: mono caps header on a 2px rule, hairline rows.

```jsx
<Table columns={[{ key: "route", label: "Route" }, { key: "time", label: "Time", numeric: true }]} rows={rows} />
```

## Props
- `columns`: `Array<{ key: string; label: string; numeric?: boolean }>`
- `rows`: `Array<Record<string, React.ReactNode> & { id?: string }>`
- `selectedId`: `string` — Highlights a row.
- `dense`: `boolean`
- `onRowClick`: `(row: any) => void`

## Specification
- **Anatomy** — Header row (mono caps, 2px rule), body rows (hairlines), numeric cells right-aligned in mono.
- **Variants & sizes** — default, dense.
- **States** — row rest, hover, selected (amber tint).
- **Interaction** — Row tint eases in 140ms.
- **Accessibility** — Native table semantics with th scope="col"; wrap scrolls horizontally on small screens.
- **Usage** — Comparable records only. No zebra stripes, no vertical rules.
