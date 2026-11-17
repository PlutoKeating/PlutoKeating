Segmented bar that fills in steps, like an early download meter.

```jsx
<Progress value={62} label="Uploading flight plan" />
```

## Props
- `value`: `number` — 0 to 100. Omit for indeterminate.
- `tone`: `'primary'|'success'`
- `size`: `'sm'|'md'`
- `label`: `string` — Accessible name.

## Specification
- **Anatomy** — Sunken track, stepped fill, 8px segment mask.
- **Variants & sizes** — determinate, indeterminate · sm 6, md 12.
- **States** — in progress, complete (success tone).
- **Interaction** — Fill advances in discrete steps; indeterminate block chases across in 14 steps.
- **Accessibility** — role="progressbar" with aria-valuenow; give it a label.
- **Usage** — Use for waits over 1s with known or unknown length. Under 1s, show nothing.
