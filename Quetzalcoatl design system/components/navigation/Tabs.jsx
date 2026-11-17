import React from 'react';
export function Tabs({ items = [], value, onChange, className = '' }) {
  const onKey = (e) => {
    const i = items.findIndex((t) => t.id === value); const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return; const n = items[(i + d + items.length) % items.length]; if (n && onChange) onChange(n.id);
  };
  return (
    <div className={'md-tabs ' + className} role="tablist" onKeyDown={onKey}>
      {items.map((t) => <button key={t.id} className="md-tab" role="tab" aria-selected={t.id === value} tabIndex={t.id === value ? 0 : -1} disabled={t.disabled} onClick={() => onChange && onChange(t.id)}>{t.label}</button>)}
    </div>
  );
}
