Native select in the same well as Input, with a caret.

```jsx
<Select label="Cabin" options={["Economy", "Business", "Supersonic"]} />
```

## Props
- `label`: `string` — Mono uppercase label above the control.
- `hint`: `string` — Helper text below.
- `error`: `string` — Error message; replaces hint and marks the field invalid.
- `options`: `Array<string | { value: string; label: string }>` — Options to list.
- `value`: `string`
- `onChange`: `(e: React.ChangeEvent<HTMLSelectElement>) => void`
- `disabled`: `boolean`

## Specification
- **Anatomy** — Label, well, caret icon, native option list.
- **Variants & sizes** — One size (36).
- **States** — rest, hover, focus, disabled, error.
- **Interaction** — Uses the platform picker, so it works with touch and keyboard for free.
- **Accessibility** — Native select semantics.
- **Usage** — For 5+ mutually exclusive options. For actions use Dropdown; for 2 to 4 options use Radio.
