Placeholder block shown while content loads; a sunbeam sweeps across it.

```jsx
<Skeleton width="60%" />
```

## Props
- `width`: `number | string`
- `height`: `number | string`
- `shape`: `'line'|'block'|'circle'`

## Specification
- **Anatomy** — Tinted block with a moving light band.
- **Variants & sizes** — line (14px), block (nose corner), circle.
- **States** — loading.
- **Interaction** — Light band crosses in 1.8s; disabled under reduced motion.
- **Accessibility** — aria-hidden; the container should carry aria-busy.
- **Usage** — Mirror the final layout. Do not use for waits under 300ms.
