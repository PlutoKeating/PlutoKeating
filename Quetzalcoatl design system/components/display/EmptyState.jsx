import React from 'react';
export function EmptyState({ title, children, action, className = '' }) {
  return <div className={'md-empty ' + className}><div className="md-empty__sun" aria-hidden="true" /><h3 className="md-empty__title">{title}</h3>{children ? <p className="md-empty__text">{children}</p> : null}{action}</div>;
}
