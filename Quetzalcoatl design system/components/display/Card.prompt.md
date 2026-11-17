A plate with one rounded "nose" corner that groups related content.

```jsx
<Card variant="amber"><h3 className="md-h3">Departures</h3></Card>
```

## Props
- `variant`: `'plate'|'outline'|'paper'|'amber'|'orange'|'blue'|'green'|'sky'` — Surface.
- `interactive`: `boolean` — Lifts on hover; use when the whole card is a link.
- `children`: `React.ReactNode`

## Specification
- **Anatomy** — Plate with 2px corners and a 28px top-right nose; free content.
- **Variants & sizes** — plate, outline, paper, colour blocks (amber, orange, blue, green, sky).
- **States** — rest; interactive: hover (lifts up-left, shadow falls lower-right), active, focus-visible.
- **Interaction** — Lift takes 220ms with the eject curve.
- **Accessibility** — If interactive, render as a link or button and keep one focus stop.
- **Usage** — Not every group needs a card: prefer rules and whitespace. Colour blocks are for emphasis, one or two per view.
