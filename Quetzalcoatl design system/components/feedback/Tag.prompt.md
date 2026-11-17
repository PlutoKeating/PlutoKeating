Square-cornered label for categories and filters; can be selected or removed.

```jsx
<Tag onRemove={clear}>Transatlantic</Tag>
```

## Props
- `variant`: `'outline'|'solid'`
- `selected`: `boolean` — Amber fill for active filters.
- `onRemove`: `() => void` — Shows a remove button.
- `children`: `React.ReactNode`

## Specification
- **Anatomy** — Rectangle (2px corners), label, optional remove button.
- **Variants & sizes** — outline, solid · one size (26).
- **States** — rest, selected, remove hover.
- **Interaction** — Remove fades the tag out in 140ms (consumer-driven).
- **Accessibility** — Remove button is labelled "Remove <tag>".
- **Usage** — Categories, filters, metadata. Square corners separate it from Badge and Button.
