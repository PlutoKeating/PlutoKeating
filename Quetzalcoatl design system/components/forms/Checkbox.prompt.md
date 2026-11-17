Square tick box for independent on/off choices in a list.

```jsx
<Checkbox label="Window seat" defaultChecked />
```

## Props
- `label`: `React.ReactNode` — Text beside the control.
- `checked`: `boolean`
- `defaultChecked`: `boolean`
- `onChange`: `(e: React.ChangeEvent<HTMLInputElement>) => void`
- `disabled`: `boolean`
- `indeterminate`: `boolean` — Mixed state for parent rows.

## Specification
- **Anatomy** — 18px square well, tick, label.
- **Variants & sizes** — One size.
- **States** — unchecked, hover, checked (amber + ink tick), indeterminate, focus-visible, disabled.
- **Interaction** — Tick scales in with the eject curve (140ms).
- **Accessibility** — Native checkbox; whole label is the hit area (28px min height).
- **Usage** — Use for multi-select. A single immediate setting is a Switch.
