Sliding toggle with an anodized thumb for settings that apply immediately.

```jsx
<Switch label="Autopilot" checked={on} onChange={(e) => setOn(e.target.checked)} />
```

## Props
- `label`: `React.ReactNode` — Text beside the control.
- `checked`: `boolean`
- `defaultChecked`: `boolean`
- `onChange`: `(e: React.ChangeEvent<HTMLInputElement>) => void`
- `disabled`: `boolean`

## Specification
- **Anatomy** — 42×24 pill track (well), anodized thumb, label.
- **Variants & sizes** — One size.
- **States** — off, on (amber track), focus-visible, disabled.
- **Interaction** — Thumb travels 18px in 220ms with a slight overshoot.
- **Accessibility** — Native checkbox with role="switch".
- **Usage** — Only for instant effects. If a Save button follows, use Checkbox.
