Multi-line text field; resizes vertically.

```jsx
<Textarea label="Flight notes" rows={4} />
```

## Props
- `label`: `string` — Mono uppercase label above the control.
- `hint`: `string` — Helper text below.
- `error`: `string` — Error message; replaces hint and marks the field invalid.
- `rows`: `number`
- `value`: `string`
- `onChange`: `(e: React.ChangeEvent<HTMLTextAreaElement>) => void`
- `disabled`: `boolean`

## Specification
- **Anatomy** — Label, well, hint or error line.
- **Variants & sizes** — One size; height set by rows (min 96px).
- **States** — rest, hover, focus, disabled, error.
- **Interaction** — Vertical resize handle only.
- **Accessibility** — Same labelling as Input.
- **Usage** — Use when more than one sentence is expected.
