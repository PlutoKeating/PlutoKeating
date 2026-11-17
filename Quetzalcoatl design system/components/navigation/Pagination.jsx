import React from 'react';
export function Pagination({ page = 1, count = 1, onChange, className = '' }) {
  const set = new Set([1, count, page - 1, page, page + 1]); const pages = [...set].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);
  const go = (p) => onChange && onChange(p); const out = [];
  pages.forEach((p, i) => { if (i && p - pages[i - 1] > 1) out.push(<span key={'g' + p} className="md-page md-page--gap">…</span>); out.push(<button key={p} className="md-page" aria-current={p === page ? 'page' : undefined} onClick={() => go(p)}>{p}</button>); });
  return (
    <nav className={'md-pagination ' + className} aria-label="Pagination">
      <button className="md-page" aria-label="Previous page" disabled={page <= 1} onClick={() => go(page - 1)}><i className="ph ph-caret-left" aria-hidden="true" /></button>
      {out}
      <button className="md-page" aria-label="Next page" disabled={page >= count} onClick={() => go(page + 1)}><i className="ph ph-caret-right" aria-hidden="true" /></button>
    </nav>
  );
}
