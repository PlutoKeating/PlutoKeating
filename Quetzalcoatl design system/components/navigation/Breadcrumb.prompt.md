Mono path trail showing where the page sits.

```jsx
<Breadcrumb items={[{ label: "Fleet", href: "/fleet" }, { label: "SST-204" }]} />
```

## Props
- `items`: `Array<{ label: string; href?: string }>` — Last item is the current page.

## Specification
- **Anatomy** — Ordered list of links separated by slashes; last item is plain text.
- **Variants & sizes** — One size (12px mono).
- **States** — link rest, hover (underline + highlight), current.
- **Interaction** — None beyond link hover.
- **Accessibility** — nav aria-label="Breadcrumb"; current item has aria-current="page".
- **Usage** — Only when hierarchy is 3+ levels deep.
