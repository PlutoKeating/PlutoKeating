Round selector for one choice out of a small set.

```jsx
<Radio name="speed" value="mach2" label="Mach 2" />
```

## Props
- `label`: `React.ReactNode` — Text beside the control.
- `checked`: `boolean`
- `defaultChecked`: `boolean`
- `onChange`: `(e: React.ChangeEvent<HTMLInputElement>) => void`
- `disabled`: `boolean`
- `name`: `string` — Group name.
- `value`: `string`

## Specification
- **Anatomy** — 18px circle well, dot, label.
- **Variants & sizes** — One size.
- **States** — unchecked, hover, checked, focus-visible, disabled.
- **Interaction** — Dot scales in with the eject curve.
- **Accessibility** — Native radio; group with fieldset + legend; arrow keys move selection.
- **Usage** — 2 to 4 options, all visible. More than that: Select.
