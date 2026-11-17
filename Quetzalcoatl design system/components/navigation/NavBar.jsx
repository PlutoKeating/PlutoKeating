import React from 'react';
export function NavBar({ brand, items = [], value, onChange, actions, className = '' }) {
  return (
    <nav className={'md-nav ' + className} aria-label="Primary">
      <span className="md-nav__brand">{brand}</span>
      <div className="md-nav__links">
        {items.map((it) => <a key={it.id} className="md-nav__link" href={it.href || '#'} aria-current={it.id === value ? 'page' : undefined} onClick={(e) => { if (onChange) { e.preventDefault(); onChange(it.id); } }}>{it.label}</a>)}
      </div>
      {actions ? <div className="md-nav__actions">{actions}</div> : null}
    </nav>
  );
}
