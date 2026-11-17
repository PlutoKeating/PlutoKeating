Single-line text field set in a sunken well.

```jsx
<Input label="Call sign" placeholder="e.g. Aurora" hint="Shown on your boarding pass." />
```

## Props
- `label`: `string` — Mono uppercase label above the control.
- `hint`: `string` — Helper text below.
- `error`: `string` — Error message; replaces hint and marks the field invalid.
- `size`: `'sm'|'md'|'lg'`
- `value`: `string`
- `onChange`: `(e: React.ChangeEvent<HTMLInputElement>) => void`
- `placeholder`: `string`
- `disabled`: `boolean`

## Specification
- **Anatomy** — Label (mono caps), well with small nose corner, hint or error line.
- **Variants & sizes** — sm 28, md 36, lg 44.
- **States** — rest, hover (strong border), focus (sky ring + border), filled, disabled, error (2px red border + message).
- **Interaction** — Border colour eases over 140ms; no floating labels.
- **Accessibility** — Label is bound with htmlFor; error sets aria-invalid and aria-describedby.
- **Usage** — Always show a label. Placeholder is an example, never the label.
