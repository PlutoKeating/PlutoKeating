Resin sheet anchored to a trigger, for short supporting content or a few controls.

```jsx
<Popover trigger={<Button variant="secondary">Legend</Button>}>Amber marks the sunlit side of the route.</Popover>
```

## Props
- `trigger`: `React.ReactNode` — Element that toggles the popover.
- `children`: `React.ReactNode` — Content.
- `align`: `'start'|'end'`
- `defaultOpen`: `boolean`

## Specification
- **Anatomy** — Trigger, resin sheet (320 max) anchored below.
- **Variants & sizes** — start, end alignment.
- **States** — closed, open.
- **Interaction** — Ejects in 220ms; closes on outside click and Esc.
- **Accessibility** — Sheet is role="dialog" (non-modal); trigger wrapper has aria-expanded.
- **Usage** — Explanations, small forms, pickers. For names of controls use Tooltip.
