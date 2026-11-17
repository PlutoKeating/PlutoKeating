Sun rising over a horizon line, with a title, a sentence and one action.

```jsx
<EmptyState title="No routes yet" action={<Button icon="plus">Plan a route</Button>}>Your saved routes will appear here.</EmptyState>
```

## Props
- `title`: `string`
- `children`: `React.ReactNode` — One sentence of guidance.
- `action`: `React.ReactNode` — A single Button.

## Specification
- **Anatomy** — Half sun on a horizon rule, title, text, action.
- **Variants & sizes** — One.
- **States** — Static; the sun rises once on mount.
- **Interaction** — Sun rises 48px in 640ms with overshoot.
- **Accessibility** — Illustration is decorative; title is a heading.
- **Usage** — Say what will appear and how to start. One action only.
