import React from 'react';
export function Card({ variant = 'plate', interactive, children, className = '', ...rest }) {
  const cls = ['md-card', variant !== 'plate' && 'md-card--' + variant, interactive && 'md-card--interactive', className].filter(Boolean).join(' ');
  return <div className={cls} tabIndex={interactive ? 0 : undefined} {...rest}>{children}</div>;
}
