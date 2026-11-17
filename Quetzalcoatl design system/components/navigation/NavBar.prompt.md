Top navigation bar: wordmark, primary links, trailing actions.

```jsx
<NavBar brand="AURORA" items={[{ id: "routes", label: "Routes" }]} value="routes" />
```

## Props
- `brand`: `React.ReactNode` — Wordmark or product name.
- `items`: `Array<{ id: string; label: string; href?: string }>` — Primary links.
- `value`: `string` — Active item id.
- `onChange`: `(id: string) => void`
- `actions`: `React.ReactNode` — Trailing controls.

## Specification
- **Anatomy** — Wordmark (display, expanded), link row, actions; sits on a 2px rule.
- **Variants & sizes** — One variant; wraps below 768px.
- **States** — link rest, hover (bar draws in from left), current (4px amber bar), focus-visible.
- **Interaction** — The bar draws in over 220ms from the left edge.
- **Accessibility** — nav landmark with aria-label; current link gets aria-current="page".
- **Usage** — Up to 6 destinations. Deeper structure goes to Tabs or Breadcrumb.
