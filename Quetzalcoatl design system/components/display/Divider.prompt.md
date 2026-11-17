Rule between sections: hairline, strong, horizon or labelled.

```jsx
<Divider variant="horizon" />
```

## Props
- `variant`: `'hair'|'strong'|'horizon'|'labeled'|'vertical'` — horizon is a hairline with a 96px amber lead.
- `children`: `React.ReactNode` — Label for the labeled variant.

## Specification
- **Anatomy** — A single rule; horizon adds a 96×4 amber lead; labeled centres a mono caption.
- **Variants & sizes** — hair, strong (2px), horizon, labeled, vertical.
- **States** — Static.
- **Interaction** — None.
- **Accessibility** — hr semantics; labeled uses role="separator".
- **Usage** — Strong rules open sections, hairlines separate rows, horizon marks a chapter start.
