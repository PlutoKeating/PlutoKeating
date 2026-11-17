Framed picture with a nose corner, optional duotone treatment and mono caption.

```jsx
<Image src="hangar.jpg" alt="Hangar at dawn" caption="FIG. 02 — HANGAR, 06:10" treatment="duotone" />
```

## Props
- `src`: `string` — Omit to show the striped placeholder.
- `alt`: `string`
- `caption`: `string`
- `treatment`: `'natural'|'duotone'` — duotone multiplies a greyscale image over amber.
- `ratio`: `string` — CSS aspect-ratio. Default "4 / 3".
- `placeholder`: `string` — Text shown when src is missing.

## Specification
- **Anatomy** — Frame (keyline, nose corner), image or placeholder, caption.
- **Variants & sizes** — natural, duotone · any ratio.
- **States** — loaded, placeholder.
- **Interaction** — None.
- **Accessibility** — alt is required for meaningful images.
- **Usage** — Photography should be sunlit and high-key. Duotone is for editorial moments, not thumbnails.
