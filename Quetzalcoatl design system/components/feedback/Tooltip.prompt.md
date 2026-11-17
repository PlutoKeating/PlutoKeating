Short mono caption that names a control on hover or focus.

```jsx
<Tooltip text="Eject tray"><IconButton icon="eject" label="Eject" /></Tooltip>
```

## Props
- `text`: `string` — Caption.
- `children`: `React.ReactNode` — Trigger element.

## Specification
- **Anatomy** — Trigger wrapper, resin caption above it.
- **Variants & sizes** — One size.
- **States** — hidden, visible (hover or focus-within).
- **Interaction** — Rises 4px and fades in over 140ms; no delay on focus.
- **Accessibility** — role="tooltip", linked with aria-describedby; never the only source of essential info.
- **Usage** — Names for icon-only controls. No interactive content inside; use Popover for that.
