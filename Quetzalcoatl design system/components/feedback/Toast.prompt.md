Transient resin sheet confirming something that just happened.

```jsx
<div className="md-toast-region"><Toast title="Route saved">LHR → JFK, 3h 28m.</Toast></div>
```

## Props
- `tone`: `'success'|'info'|'warning'|'danger'` — LED colour.
- `title`: `string`
- `children`: `React.ReactNode`
- `onClose`: `() => void`
- `timer`: `boolean` — Show the 5s drain bar. Default true.

## Specification
- **Anatomy** — Resin sheet, LED, title, text, dismiss, drain bar.
- **Variants & sizes** — success, info, warning, danger.
- **States** — entering, resting, draining, dismissed.
- **Interaction** — Ejects up from the corner in 360ms; the bar drains over 5s; hover should pause (consumer).
- **Accessibility** — Region is aria-live="polite"; danger toasts use role="alert". Never put the only copy of important info in a toast.
- **Usage** — Confirmations and background results. Stack at most three in .md-toast-region.
