Numeric page stepper set in expanded numerals.

```jsx
<Pagination page={3} count={12} onChange={setPage} />
```

## Props
- `page`: `number` — Current page (1-based).
- `count`: `number` — Total pages.
- `onChange`: `(page: number) => void`

## Specification
- **Anatomy** — Previous, page numerals with gaps, next.
- **Variants & sizes** — One size (32).
- **States** — rest, hover, current (amber disc with keyline), disabled ends.
- **Interaction** — Instant.
- **Accessibility** — nav aria-label="Pagination"; current has aria-current="page"; arrows are labelled.
- **Usage** — Use when total is known. For feeds prefer a "Load more" Button.
