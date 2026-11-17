A button that opens a Menu of actions beneath it.

```jsx
<Dropdown label="Export" items={[{ id: "pdf", label: "PDF" }, { id: "csv", label: "CSV" }]} onSelect={exportAs} />
```

## Props
- `label`: `string` — Button label.
- `items`: `Array<{ id?: string; label?: string; icon?: string; shortcut?: string; danger?: boolean; disabled?: boolean; separator?: boolean }>` — Menu rows.
- `onSelect`: `(id: string) => void`
- `variant`: `'primary'|'accent'|'secondary'|'ghost'` — Button variant. Default secondary.
- `align`: `'start'|'end'`

## Specification
- **Anatomy** — Trigger Button with caret, Menu sheet anchored below.
- **Variants & sizes** — start, end alignment; any Button variant.
- **States** — closed, open.
- **Interaction** — Menu ejects from its top-left corner in 220ms. Closes on select, outside click and Esc.
- **Accessibility** — Trigger has aria-haspopup="menu" and aria-expanded.
- **Usage** — 3 to 8 related actions. Fewer: show Buttons.
