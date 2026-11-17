import React from 'react';
export function List({ items = [], ordered, className = '' }) {
  const Tag = ordered ? 'ol' : 'ul';
  const inner = (it) => <React.Fragment><span className="md-list__title">{it.title}</span>{it.meta ? <span className="md-list__meta">{it.meta}</span> : null}{it.description ? <span className="md-list__desc">{it.description}</span> : null}</React.Fragment>;
  return <Tag className={'md-list' + (ordered ? ' md-list--ordered' : '') + ' ' + className}>{items.map((it, i) => it.href ? <li key={i} style={{ display: 'contents' }}><a className="md-list__item" href={it.href}>{inner(it)}</a></li> : <li key={i} className="md-list__item">{inner(it)}</li>)}</Tag>;
}
