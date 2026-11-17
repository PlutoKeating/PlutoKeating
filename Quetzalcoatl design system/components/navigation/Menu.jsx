import React from 'react';
export function Menu({ items = [], onSelect, className = '' }) {
  return (
    <div className={'md-sheet md-menu ' + className} role="menu">
      {items.map((it, i) => it.separator ? <div key={i} className="md-menu__sep" role="separator" /> : (
        <button key={it.id || i} className={'md-menu__item' + (it.danger ? ' md-menu__item--danger' : '')} role="menuitem" aria-disabled={it.disabled || undefined} onClick={() => onSelect && onSelect(it.id)}>
          {it.icon ? <i className={'ph ph-' + it.icon} aria-hidden="true" /> : null}<span>{it.label}</span>{it.shortcut ? <span className="md-menu__shortcut">{it.shortcut}</span> : null}
        </button>
      ))}
    </div>
  );
}
