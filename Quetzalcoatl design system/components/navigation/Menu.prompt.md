Floating resin sheet listing actions.

```jsx
<Menu items={[{ id: "dup", label: "Duplicate", icon: "copy", shortcut: "⌘D" }]} onSelect={run} />
```

## Props
- `items`: `Array<{ id?: string; label?: string; icon?: string; shortcut?: string; danger?: boolean; disabled?: boolean; separator?: boolean }>` — Rows; use { separator: true } for a rule.
- `onSelect`: `(id: string) => void`

## Specification
- **Anatomy** — Resin sheet, 32px rows: icon, label, shortcut; separators.
- **Variants & sizes** — One size.
- **States** — row rest, hover/focus (amber fill), disabled, danger (red on hover).
- **Interaction** — Appears with the eject curve in 220ms.
- **Accessibility** — role="menu"/"menuitem"; arrow keys move focus, Esc closes (handled by Dropdown).
- **Usage** — Actions only. For choosing a value use Select.
