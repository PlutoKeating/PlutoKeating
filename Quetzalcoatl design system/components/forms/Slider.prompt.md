Range control with an anodized thumb and amber fill.

```jsx
<Slider label="Altitude" value={alt} onChange={(e) => setAlt(+e.target.value)} />
```

## Props
- `value`: `number` — Current value.
- `min`: `number` — Default 0.
- `max`: `number` — Default 100.
- `step`: `number`
- `onChange`: `(e: React.ChangeEvent<HTMLInputElement>) => void`
- `label`: `string` — Accessible name.
- `disabled`: `boolean`

## Specification
- **Anatomy** — 6px track, amber fill, 20px anodized thumb.
- **Variants & sizes** — One size.
- **States** — rest, active (thumb grows 12%), focus-visible, disabled.
- **Interaction** — Fill follows the thumb with no easing; value is live.
- **Accessibility** — Native range input; arrow keys step. Provide label.
- **Usage** — For approximate values. Pair with a numeric readout when precision matters.
