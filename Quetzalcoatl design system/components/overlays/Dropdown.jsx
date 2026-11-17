import React from 'react';
export function Dropdown({ label, items = [], onSelect, variant = 'secondary', align = 'start' }) {
  const [open, setOpen] = React.useState(false); const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return; const off = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', off); return () => document.removeEventListener('mousedown', off);
  }, [open]);
  return (
    <span ref={ref} className={'md-dropdown' + (align === 'end' ? ' md-dropdown--end' : '')} onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
      <button className={'md-btn md-btn--' + variant} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}><span>{label}</span><i className="ph ph-caret-down" aria-hidden="true" /></button>
      {open ? (
        <div className="md-sheet md-menu" role="menu">
          {items.map((it, i) => it.separator ? <div key={i} className="md-menu__sep" role="separator" /> : (
            <button key={it.id || i} className={'md-menu__item' + (it.danger ? ' md-menu__item--danger' : '')} role="menuitem" aria-disabled={it.disabled || undefined} onClick={() => { setOpen(false); if (onSelect) onSelect(it.id); }}>
              {it.icon ? <i className={'ph ph-' + it.icon} aria-hidden="true" /> : null}<span>{it.label}</span>{it.shortcut ? <span className="md-menu__shortcut">{it.shortcut}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </span>
  );
}
