Small pill that reports status or a count.

```jsx
<Badge tone="success">On schedule</Badge>
```

## Props
- `tone`: `'neutral'|'success'|'warning'|'danger'|'info'|'count'` — count is the solid orange counter without LED.
- `children`: `React.ReactNode`

## Specification
- **Anatomy** — Pill, LED dot, mono caps label.
- **Variants & sizes** — neutral, success, warning, danger, info, count · one size (22).
- **States** — Static.
- **Interaction** — None; it is not pressable.
- **Accessibility** — Tone is always paired with text; never colour alone.
- **Usage** — Status and counts. For user-applied labels use Tag.
