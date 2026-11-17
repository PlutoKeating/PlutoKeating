Capsule key for the main actions of a view; presses down 2px like a hardware key.

```jsx
<Button icon="rocket-launch" onClick={launch}>Launch</Button>
```

## Props
- `variant`: `'primary'|'accent'|'secondary'|'ghost'|'danger'` — Visual weight. Default primary (amber).
- `size`: `'sm'|'md'|'lg'|'xl'` — Control height 28/36/44/56.
- `icon`: `string` — Phosphor icon name shown before the label.
- `iconEnd`: `string` — Phosphor icon name shown after the label.
- `loading`: `boolean` — Shows the LED chase and blocks input.
- `block`: `boolean` — Fill the container width.
- `disabled`: `boolean`
- `children`: `React.ReactNode` — Label.

## Specification
- **Anatomy** — Capsule container, keyline, optional leading/trailing icon, label.
- **Variants & sizes** — primary, accent, secondary, ghost, danger · sm 28, md 36, lg 44, xl 56.
- **States** — rest, hover (lighter fill), active (2px travel, shadow collapses), focus-visible (sky ring), disabled (40%), loading (LED chase).
- **Interaction** — Travel takes 80ms; colour 140ms. No scale, no glow.
- **Accessibility** — Native button. Loading sets aria-busy. Use lg or larger on touch for a 44px target.
- **Usage** — One primary per view. Accent for a second strong action, secondary for the rest, ghost inside dense toolbars.
