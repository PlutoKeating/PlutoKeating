Folder tabs that switch between sibling views.

```jsx
<Tabs items={[{ id: "spec", label: "Specification" }, { id: "log", label: "Flight log" }]} value={tab} onChange={setTab} />
```

## Props
- `items`: `Array<{ id: string; label: string; disabled?: boolean }>`
- `value`: `string` — Selected tab id.
- `onChange`: `(id: string) => void`

## Specification
- **Anatomy** — Row of folder tabs standing on a 2px rule; selected tab is filled with the rule colour.
- **Variants & sizes** — One size (36).
- **States** — rest, hover (lifts 2px), selected, focus-visible, disabled.
- **Interaction** — Left/Right arrows move selection; panel swaps instantly.
- **Accessibility** — role="tablist"/"tab" with aria-selected and roving tabindex.
- **Usage** — 2 to 6 peer views. Never nest tabs.
