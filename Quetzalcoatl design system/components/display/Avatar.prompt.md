Round portrait or initials with a keyline.

```jsx
<Avatar name="Mae Jemison" tone="amber" online />
```

## Props
- `name`: `string` — Used for initials and alt text.
- `src`: `string` — Image URL.
- `size`: `'sm'|'md'|'lg'` — 24/36/56.
- `tone`: `'sky'|'amber'|'orange'|'green'|'silver'` — Background for initials.
- `online`: `boolean` — Shows the green status LED.

## Specification
- **Anatomy** — Circle, keyline, image or initials, optional status LED.
- **Variants & sizes** — sm 24, md 36, lg 56 · five tones.
- **States** — Static.
- **Interaction** — None.
- **Accessibility** — Image alt is the name; initials carry aria-label.
- **Usage** — Group with .md-avatar-group (overlap 10px).
